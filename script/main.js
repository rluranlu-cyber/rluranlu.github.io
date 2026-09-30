(() => {
  "use strict";

  const homeUrl = new URL(document.body.dataset.homeUrl || "/", window.location.origin);
  const pageKind = document.body.dataset.pageKind || "home";
  const tabs = Array.from(document.querySelectorAll("[data-view-tab]"));

  function homeViewUrl(view, page = 1) {
    const url = new URL(homeUrl.href);
    if (view === "archive") {
      url.searchParams.set("view", "archive");
      if (page > 1) {
        url.searchParams.set("archivePage", String(page));
      }
    } else if (page > 1) {
      url.searchParams.set("page", String(page));
    }
    return `${url.pathname}${url.search}`;
  }

  function setActiveTab(view) {
    const activeView = view === "archive" ? "archive" : "blog";
    tabs.forEach((tab) => {
      const active = tab.dataset.viewTab === activeView;
      tab.classList.toggle("is-active", active);
      if (active) {
        tab.setAttribute("aria-current", "page");
      } else {
        tab.removeAttribute("aria-current");
      }
    });
  }

  if (pageKind === "article") {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const view = tab.dataset.viewTab === "archive" ? "archive" : "blog";
        window.location.assign(homeViewUrl(view));
      });
    });
    return;
  }

  const blogPanel = document.querySelector("[data-blog-panel]");
  const articleList = document.querySelector("[data-article-list]");
  const blogPagination = document.querySelector("[data-blog-pagination]");
  const archivePanel = document.querySelector("[data-archive-panel]");
  const archiveSource = document.querySelector("[data-archive-source]");
  const archiveList = document.querySelector("[data-archive-list]");
  const archiveEmpty = document.querySelector("[data-archive-empty]");
  const archivePagination = document.querySelector("[data-archive-pagination]");
  const detailView = document.querySelector("[data-article-detail]");
  const contentColumn = document.querySelector(".content-column");

  if (!blogPanel || !blogPagination || !archivePanel || !archiveList || !archivePagination || !detailView || !contentColumn) {
    return;
  }

  const articleItems = articleList ? Array.from(articleList.querySelectorAll("[data-article-item]")) : [];
  const blogPageSize = Number.parseInt(articleList?.dataset.pageSize || "6", 10);
  const blogPageCount = Math.max(1, Math.ceil(articleItems.length / blogPageSize));
  const archivePageSize = Number.parseInt(archiveList.dataset.pageSize || "6", 10);
  const listDocumentTitle = document.title;
  const initialUrl = new URL(window.location.href);
  let currentView = initialUrl.searchParams.get("view") === "archive" ? "archive" : "blog";
  let blogPage = clampPage(readPage(initialUrl, "page"), blogPageCount);
  let archivePage = Math.max(1, readPage(initialUrl, "archivePage"));
  let articleReturnView = currentView;

  function readPage(url, parameter) {
    const parsed = Number.parseInt(url.searchParams.get(parameter) || "1", 10);
    return Number.isFinite(parsed) ? parsed : 1;
  }

  function clampPage(page, pageCount) {
    return Math.min(Math.max(page, 1), pageCount);
  }

  function visiblePageNumbers(activePage, pageCount) {
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    const numbers = new Set([1, pageCount, activePage - 1, activePage, activePage + 1]);
    return Array.from(numbers)
      .filter((page) => page >= 1 && page <= pageCount)
      .sort((a, b) => a - b);
  }

  function renderPagination(element, activePage, pageCount, onSelect) {
    element.replaceChildren();
    if (pageCount <= 1) {
      element.hidden = true;
      return;
    }

    element.hidden = false;
    const numbers = visiblePageNumbers(activePage, pageCount);
    numbers.forEach((page, index) => {
      if (index > 0 && page - numbers[index - 1] > 1) {
        const ellipsis = document.createElement("span");
        ellipsis.className = "pagination-ellipsis";
        ellipsis.textContent = "…";
        element.append(ellipsis);
      }

      const button = document.createElement("button");
      button.type = "button";
      button.textContent = String(page);
      button.setAttribute("aria-label", `Go to page ${page}`);
      if (page === activePage) {
        button.setAttribute("aria-current", "page");
      }
      button.addEventListener("click", () => onSelect(page));
      element.append(button);
    });
  }

  function renderBlogPage(page) {
    blogPage = clampPage(page, blogPageCount);
    const start = (blogPage - 1) * blogPageSize;
    const end = start + blogPageSize;
    const visibleItems = [];

    articleItems.forEach((item, index) => {
      const visible = index >= start && index < end;
      item.hidden = !visible;
      item.classList.remove("is-page-last");
      if (visible) {
        visibleItems.push(item);
      }
    });

    visibleItems.at(-1)?.classList.add("is-page-last");
    renderPagination(blogPagination, blogPage, blogPageCount, (nextPage) => {
      renderBlogPage(nextPage);
      updateHistory("blog", true);
      window.scrollTo({ top: 525, behavior: "smooth" });
    });
  }

  function buildArchiveGroups() {
    const groupsByTag = new Map();
    const entries = Array.from(archiveSource?.querySelectorAll("[data-archive-entry]") || []);

    entries.forEach((entry) => {
      const tag = entry.dataset.tag?.trim();
      if (!tag) {
        return;
      }
      if (!groupsByTag.has(tag)) {
        groupsByTag.set(tag, []);
      }
      groupsByTag.get(tag).push({ title: entry.textContent.trim(), href: entry.href });
    });

    archiveList.replaceChildren();
    groupsByTag.forEach((articles, tag) => {
      const group = document.createElement("section");
      group.className = "archive-group";
      group.dataset.archiveGroup = "";

      const heading = document.createElement("h2");
      heading.className = "archive-tag";
      heading.textContent = tag;

      const titles = document.createElement("div");
      titles.className = "archive-titles";
      articles.forEach((article) => {
        const link = document.createElement("a");
        link.href = article.href;
        link.textContent = article.title;
        link.dataset.articleLink = "";
        titles.append(link);
      });

      group.append(heading, titles);
      archiveList.append(group);
    });

    archiveEmpty.hidden = groupsByTag.size > 0;
    return Array.from(archiveList.querySelectorAll("[data-archive-group]"));
  }

  const archiveGroups = buildArchiveGroups();
  const archivePageCount = Math.max(1, Math.ceil(archiveGroups.length / archivePageSize));
  archivePage = clampPage(archivePage, archivePageCount);

  function renderArchivePage(page) {
    archivePage = clampPage(page, archivePageCount);
    const start = (archivePage - 1) * archivePageSize;
    const end = start + archivePageSize;
    archiveGroups.forEach((group, index) => {
      group.hidden = index < start || index >= end;
    });

    renderPagination(archivePagination, archivePage, archivePageCount, (nextPage) => {
      renderArchivePage(nextPage);
      updateHistory("archive", true);
      window.scrollTo({ top: 525, behavior: "smooth" });
    });
  }

  function updateHistory(view, push) {
    const page = view === "archive" ? archivePage : blogPage;
    const state = { view, blogPage, archivePage };
    const method = push ? "pushState" : "replaceState";
    window.history[method](state, "", homeViewUrl(view, page));
  }

  function showView(view, pushHistory) {
    currentView = view === "archive" ? "archive" : "blog";
    detailView.hidden = true;
    detailView.replaceChildren();
    blogPanel.hidden = currentView !== "blog";
    archivePanel.hidden = currentView !== "archive";
    setActiveTab(currentView);
    document.title = listDocumentTitle;

    if (currentView === "archive") {
      renderArchivePage(archivePage);
    } else {
      renderBlogPage(blogPage);
    }

    if (pushHistory) {
      updateHistory(currentView, true);
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
      showView(articleReturnView, true);
    });
  }

  async function openArticle(url, pushHistory) {
    articleReturnView = currentView === "archive" ? "archive" : "blog";
    blogPanel.hidden = true;
    archivePanel.hidden = true;
    detailView.hidden = false;
    setActiveTab("blog");
    detailView.innerHTML = '<section class="glass-card content-panel article-document-panel"><p class="article-loading">Loading article…</p></section>';

    try {
      const response = await fetch(url, { headers: { Accept: "text/html" } });
      if (!response.ok) {
        throw new Error(`Article request failed with status ${response.status}`);
      }

      const html = await response.text();
      const articleDocument = new DOMParser().parseFromString(html, "text/html");
      const article = articleDocument.querySelector("[data-article-document]");
      if (!article) {
        throw new Error("The article template was not found in the response.");
      }

      rewriteRelativeUrls(article, response.url);
      const panel = document.createElement("section");
      panel.className = "glass-card content-panel article-document-panel";
      panel.append(article);
      detailView.replaceChildren(panel);
      bindReturnLink(detailView);
      document.title = articleDocument.title || listDocumentTitle;

      if (pushHistory) {
        window.history.pushState(
          { view: "article", url: response.url, returnView: articleReturnView, blogPage, archivePage },
          "",
          new URL(response.url).pathname
        );
      }

      detailView.querySelector("h1")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const fallbackUrl = new URL(url, window.location.href).href;
      detailView.innerHTML = `
        <section class="glass-card content-panel article-document-panel">
          <p class="article-error">The article could not be loaded here. <a href="${fallbackUrl}">Open the article page</a>.</p>
        </section>`;
      console.error(error);
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const view = tab.dataset.viewTab === "archive" ? "archive" : "blog";
      if (view === currentView && detailView.hidden) {
        return;
      }
      showView(view, true);
    });
  });

  contentColumn.addEventListener("click", (event) => {
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
      blogPage = clampPage(event.state.blogPage || 1, blogPageCount);
      archivePage = clampPage(event.state.archivePage || 1, archivePageCount);
      currentView = event.state.returnView === "archive" ? "archive" : "blog";
      openArticle(event.state.url, false);
      return;
    }

    blogPage = clampPage(event.state?.blogPage || readPage(new URL(window.location.href), "page"), blogPageCount);
    archivePage = clampPage(event.state?.archivePage || readPage(new URL(window.location.href), "archivePage"), archivePageCount);
    showView(event.state?.view || (new URL(window.location.href).searchParams.get("view") === "archive" ? "archive" : "blog"), false);
  });

  renderBlogPage(blogPage);
  renderArchivePage(archivePage);
  showView(currentView, false);
  updateHistory(currentView, false);
})();
