# 个人博客内容自定义说明

本文档说明如何修改博客中的固定文案、个人资料、联系方式、文章内容和网站基础信息。

网站中的文字主要分为以下几类：

1. 中英文固定文案
2. 联系方式
3. 语言切换按钮
4. 页脚署名
5. 网站名称与浏览器信息
6. Markdown 文章内容
7. HTML 默认英文副本

## 1. 中英文固定文案

中英文固定文案主要在 [`script/main.js`](../script/main.js) 顶部的 `translations` 中修改：

- `en`：英文内容
- `zh`：中文内容

例如，“大家好，这里是细雨”由两个字段组成：

```js
greeting: "大家好，这里是",
siteName: "细雨",
```

### 可自定义字段

| 页面区域 | 对应字段 |
| --- | --- |
| Hello, this is / 大家好，这里是 | `greeting` |
| RAN LU / 细雨 | `siteName` |
| ^_+ Amor Fati (:≡ / 爱与正义与勇气 | `taglinePrefix`、`taglinePrimary`、`taglineSuffix` |
| About Me / 关于我 | `aboutPrimary`、`aboutSecondary` |
| Blog / 博客 | `blog` |
| Archive / 合辑 | `archive` |
| 个人名称 | `profileName` |
| 职业介绍 | `role` |
| Humanist / 人文主义者 | `valuesPrimary` |
| idealist / 理想主义者 | `valuesSecondary` |
| 北京等所在地 | `locationPrimary`、`locationRest` |
| Love / 喜欢 | `love` |
| 动画、骑行、食物、旅行、小狗、艺术哲学 | `loveAnimation` 至 `loveArt` |
| Specialize in / 专注于 | `specialize` |
| Maya、Blender、Unreal Engine、Premiere、Resolve | `skillMaya` 至 `skillResolve` |
| Contact Me / 联系我 | `contactPrimary`、`contactSecondary` |
| 文章页返回按钮 | `back` |
| 没有文章时的提示 | `blogEmpty` |
| 没有分类文章时的提示 | `archiveEmpty` |
| 文章加载提示 | `loading` |
| 文章加载失败提示 | `articleError`、`openArticle` |
| 分页辅助文字 | `goToPage` |

修改个人资料时，建议同时修改 `en` 和 `zh` 中对应的字段，以保持两种语言内容一致。

`aboutAria`、`portraitAlt`、`articlesAria` 等字段是无障碍辅助文字，通常不会直接显示在页面上。如果姓名或页面含义发生变化，建议同步修改。

## 2. 联系方式

电话、微信、邮箱和 GitHub 地址位于 [`_includes/sidebar.html`](../_includes/sidebar.html)：

```html
<p>☎: +86 159-1085-4142️</p>
<p>👁️‍🗨️ : aiaptx4869</p>
<p>📫: <a href="mailto:rlu.ranlu@gmail.com">rlu.ranlu@gmail.com</a></p>
<p>🖥️: <a href="https://github.com/rluranlu-cyber">https://github.com/rluranlu-cyber</a></p>
```

修改邮箱时，需要同时修改：

- `href="mailto:邮箱地址"`
- 标签中显示的邮箱地址

修改 GitHub 地址时，也需要同时修改链接的 `href` 和页面上显示的文字。

这些联系方式目前中英文共用，不会随 `Zh/En` 切换。

## 3. `Zh/En` 语言切换按钮

页面上可见的 `Zh/En` 字样位于 [`_includes/view-tabs.html`](../_includes/view-tabs.html)。

通常不建议修改，因为它用于提示用户切换语言。

按钮的无障碍说明位于 [`script/main.js`](../script/main.js)：

```js
toggleAria: "切换为中文"
```

```js
toggleAria: "Switch to English"
```

## 4. 页脚署名

页脚内容位于 [`_includes/site-footer.html`](../_includes/site-footer.html)：

```html
<p>© {{ site.time | date: "%Y" }} Ran Lu</p>
```

年份由 Jekyll 自动生成，只需要根据需要修改 `Ran Lu`。

## 5. 网站名称与浏览器信息

网站的基础信息位于 [`_config.yml`](../_config.yml)：

```yaml
title: Ran Lu
description: Personal blog of Ran Lu, 3D Animation Director and AIGC Explorer.
```

- `title`：网站名称，会用于浏览器标签页以及文章页面标题。
- `description`：网站介绍，主要用于搜索引擎和页面元信息。

以下设置与 GitHub Pages 部署有关，除非更换仓库、域名或部署方式，否则不要修改：

```yaml
url: "https://rluranlu-cyber.github.io"
baseurl: "/rluranlu.github.io"
timezone: Asia/Shanghai
permalink: pretty
```

首页浏览器标题还会读取 [`index.html`](../index.html) 顶部的：

```yaml
---
title: Ran Lu
---
```

## 6. 文章标题、摘要、日期、分类和正文

以后每篇文章都放在 `article` 文件夹中，并使用 Markdown 编写。

可复制 [`article/_template/index.md`](../article/_template/index.md) 作为新文章模板：

```markdown
---
title: "文章标题"
date: 2026-09-29
summary: "显示在博客列表中的摘要"
tags:
  - 分类名称
---

在这里使用 Markdown 编写文章正文。
```

各字段对应关系：

| 字段 | 用途 |
| --- | --- |
| `title` | 文章标题、Blog 列表标题和 Archive 中的文章标题 |
| `date` | 文章发布日期 |
| `summary` | Blog 列表中的摘要或 Abstract |
| `tags` | Archive 分类名称，可以填写多个 |
| Front Matter 下方的内容 | 文章正文 |

### 插入文章图片

把图片和文章的 `index.md` 放在同一个文章文件夹中，然后使用相对路径引用：

```markdown
![图片说明](image-01.jpg)
```

文章标题、摘要、tags、图片和正文不会受到 `Zh/En` 切换影响，也不会被网站自动翻译。

## 7. HTML 中的默认英文副本

以下文件还保留了一份页面初次加载时使用的默认英文内容：

- [`_includes/site-header.html`](../_includes/site-header.html)
- [`_includes/sidebar.html`](../_includes/sidebar.html)
- [`_includes/view-tabs.html`](../_includes/view-tabs.html)

页面加载后，JavaScript 会使用 `script/main.js` 中的翻译表覆盖这些内容。因此日常修改以 `script/main.js` 为主。

如果希望 JavaScript 尚未加载时显示的默认文字也保持一致，建议同步修改这些 HTML 文件中的英文副本。

## 8. 头像和背景图片

虽然头像和背景不是文字内容，但也可以自行替换。

### 头像

当前头像文件：

```text
image/Profile_Image_01.png
```

头像路径同时出现在：

- [`_includes/site-header.html`](../_includes/site-header.html)：手机版头像
- [`_includes/sidebar.html`](../_includes/sidebar.html)：桌面版头像

如果直接使用相同文件名覆盖旧头像，则不需要修改代码。

### 背景图片

当前背景文件：

```text
image/Background_Image_01.png
```

背景图片路径设置在 [`css/style.css`](../css/style.css)。如果直接使用相同文件名覆盖旧背景，也不需要修改代码。

## 9. 推荐的修改流程

1. 修改 `script/main.js` 中的中英文固定文案。
2. 如果修改联系方式，同步编辑 `_includes/sidebar.html`。
3. 如果修改网站名称，同步检查 `_config.yml`、`index.html` 和页脚署名。
4. 新文章从 `article/_template/index.md` 复制创建。
5. 检查 Markdown 顶部的 `title`、`date`、`summary` 和 `tags`。
6. 把修改上传到 GitHub，等待 GitHub Pages 自动重新构建网站。

