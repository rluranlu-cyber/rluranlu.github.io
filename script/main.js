(() => {
  "use strict";

  const listPanel = document.querySelector("[data-article-list-panel]");
  const list = document.querySelector("[data-article-list]");
  const detailView = document.querySelector("[data-article-detail]");
  const pagination = document.querySelector("[data-pagination]");

  if (!listPanel || !list || !detailView || !pagination) {
    return;
  }

  const items = Array.from(list.querySelectorAll("[data-article-item]"));
  const pageSize = Number.parseInt(list.dataset.pageSize || "6", 10);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const homeUrl = new URL(document.body.dataset.homeUrl || "/", window.location.origin);
  const listDocumentTitle = document.title;
  let currentPage = readPageFromUrl();

  function clampPage(page) {
    return Math.min(Math.max(page, 1), pageCount);
  }

  function readPageFromUrl() {
    const value = Number.parseInt(new URL(window.location.href).searchParams.get("page") || "1", 10);
    return clampPage(Number.isFinite(value) ? value : 1);
  }

  function listUrl(page) {
    const url = new URL(homeUrl.href);
    if (page > 1) {
      url.searchParams.set("page", String(page));
    }
    return `${url.pathname}${url.search}${url.hash}`;
  }

  function visiblePageNumbers(activePage) {
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    const numbers = new Set([1, pageCount, activePage - 1, activePage, activePage + 1]);
    return Array.from(numbers)
      .filter((page) => page >= 1 && page <= pageCount)
      .sort((a, b) => a - b);
  }

  function renderPagination() {
    pagination.replaceChildren();

    if (pageCount <= 1) {
      pagination.hidden = true;
      return;
    }

    pagination.hidden = false;
    const numbers = visiblePageNumbers(currentPage);

    numbers.forEach((page, index) => {
      if (index > 0 && page - numbers[index - 1] > 1) {
        const ellipsis = document.createElement("span");
        ellipsis.className = "pagination-ellipsis";
        ellipsis.textContent = "…";
        pagination.append(ellipsis);
      }

      const button = document.createElement("button");
      button.type = "button";
      button.textContent = String(page);
      button.setAttribute("aria-label", `Go to article page ${page}`);
      if (page === currentPage) {
        button.setAttribute("aria-current", "page");
      }
      button.addEventListener("click", () => showPage(page, true));
      pagination.append(button);
    });
  }

  function showPage(page, updateHistory) {
    currentPage = clampPage(page);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const visibleItems = [];

    items.forEach((item, index) => {
      const visible = index >= start && index < end;
      item.hidden = !visible;
      item.classList.remove("is-page-last");
      if (visible) {
        visibleItems.push(item);
      }
    });

    visibleItems.at(-1)?.classList.add("is-page-last");
    renderPagination();

    if (updateHistory) {
      window.history.pushState({ view: "list", page: currentPage }, "", listUrl(currentPage));
    }
  }

  function rewriteRelativeUrls(root, articleUrl) {
    root.querySelectorAll("[src], [href]").forEach((element) => {
      const attribute = element.hasAttribute("src") ? "src" : "href";
      const value = element.getAttribute(attribute);
      if (!value || value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:")) {
        return;
      }

      try {
        const absolute = new URL(value, articleUrl);
        if (absolute.origin === window.location.origin) {
          element.setAttribute(attribute, absolute.href);
        }
      } catch (_error) {
        // Keep author-provided values that are not valid URLs unchanged.
      }
    });
  }

  function bindReturnLink(root) {
    const returnLink = root.querySelector("[data-return-to-list]");
    if (!returnLink) {
      return;
    }

    returnLink.addEventListener("click", (event) => {
      event.preventDefault();
      if (window.history.state?.view === "article") {
        window.history.back();
      } else {
        showList(currentPage, true);
      }
    });
  }

  async function openArticle(url, updateHistory) {
    listPanel.hidden = true;
    pagination.hidden = true;
    detailView.hidden = false;
    detailView.innerHTML = '<section class="glass-card articles-panel article-document-panel"><p class="article-loading">Loading article…</p></section>';

    try {
      const response = await fetch(url, { headers: { Accept: "text/html" } });
      if (!response.ok) {
        throw new Error(`Article request failed with status ${response.status}`);
      }

      const html = await response.text();
      const documentFragment = new DOMParser().parseFromString(html, "text/html");
      const article = documentFragment.querySelector("[data-article-document]");
      if (!article) {
        throw new Error("The article template was not found in the response.");
      }

      rewriteRelativeUrls(article, response.url);
      const panel = document.createElement("section");
      panel.className = "glass-card articles-panel article-document-panel";
      panel.append(article);
      detailView.replaceChildren(panel);
      bindReturnLink(detailView);
      document.title = documentFragment.title || listDocumentTitle;

      if (updateHistory) {
        window.history.pushState(
          { view: "article", url: response.url, page: currentPage },
          "",
          new URL(response.url).pathname
        );
      }

      detailView.querySelector("h1")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const fallbackUrl = new URL(url, window.location.href).href;
      detailView.innerHTML = `
        <section class="glass-card articles-panel article-document-panel">
          <p class="article-error">The article could not be loaded here. <a href="${fallbackUrl}">Open the article page</a>.</p>
        </section>`;
      console.error(error);
    }
  }

  function showList(page, replaceHistory) {
    detailView.hidden = true;
    detailView.replaceChildren();
    listPanel.hidden = false;
    document.title = listDocumentTitle;
    showPage(page, false);

    if (replaceHistory) {
      window.history.replaceState({ view: "list", page: currentPage }, "", listUrl(currentPage));
    }
  }

  list.addEventListener("click", (event) => {
    const link = event.target.closest("[data-article-link]");
    const isNonPrimaryClick = typeof event.button === "number" && event.button !== 0;
    if (!link || event.defaultPrevented || isNonPrimaryClick || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    openArticle(link.href, true);
  });

  window.addEventListener("popstate", (event) => {
    if (event.state?.view === "article" && event.state.url) {
      currentPage = clampPage(event.state.page || 1);
      openArticle(event.state.url, false);
      return;
    }

    showList(event.state?.page || readPageFromUrl(), false);
  });

  showPage(currentPage, false);
  window.history.replaceState({ view: "list", page: currentPage }, "", listUrl(currentPage));
})();
