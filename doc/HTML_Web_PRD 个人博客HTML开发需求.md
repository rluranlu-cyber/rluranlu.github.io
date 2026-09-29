# HTML 网页开发需求文档

## 1. 项目基本信息

### 1.1 项目名称
- HTML 个人博客网页开发
### 1.2 项目简介
- 这是一个偏向个人博客的单页网站，主要展示模块为个人简介（About Me）和后续会陆续发表的用于记录生活和分享技术的文章（Article）。
- 目标用户为同行业从业者和其他普通访客。
- 部署方式为GitHub Pages。目前GitHub Pages已部署好，先阅读文档，不对仓库进行改动。
---

## 2. 页面结构（暂定）

### 2.1 页面数量

单页网站。
要求：用户点击文章不跳转新页面。文章页每页展示6篇文章

### 3.2 页面模块分区

About Me, Article, Header, Contact, Footer

---

## 3. 各模块分区内容

### 3.1 Header 标题

主标题：

```text
Hello, this is Ran Lu.
```

副标题：

```text
Amor Fati
```

### 3.2 About 自我介绍

标题：

```text
About Me
```

正文：

```text
3D Animation Director / AICG Exploerer
```

### 3.3 Articles 文章

文章模块展示文章标题和日期，当用户点击标题时再展示正文。正文需要支持文字和图片。文章结构如下：
```
Article/
│
|── 文章1标题-文章1发表日期/
    ├── 文章1正文
    ├── 文章1图片
|
|── 文章2标题-文章2发表日期/
    ├── 文章2正文
    ├── 文章2图片   
│
|── 文章3标题-文章3发表日期/
    ├── 文章3正文
    ├── 文章3图片
|
|── 文章4标题-文章4发表日期/
    ├── 文章4正文
    ├── 文章4图片   
```

### 3.4 Contact 联系方式

展示：
```
rlu.ranlu@gmail.com
https://github.com/rluranlu-cyber
```


其中，邮箱地址只允许文本复制，GitHub链接用户可点击并跳转至Github主页

---

## 4. 视觉设计

参考Figma文件

---

## 5. GitHub仓库结构

建议：

```text
website/
│
├── index.html
│
├── style.css
│
├── script.js
│
├── README.md
│
└── images/
    ├── profile.jpg
    ├── project01.jpg
    ├── project02.jpg
    └── project03.jpg
```

如果没有 JavaScript：

```text
website/
│
├── index.html
├── style.css
├── README.md
└── images/
```

---

## 6. GitHub Pages 部署

目前仓库已经建好

仓库名称：

```text
rluranlu.github.io
```

主分支：

```text
main
```


首页：

```text
index.html
```

最终访问地址：

```text
[https://rluranlu-cyber.github.io/repository/](https://rluranlu-cyber.github.io/rluranlu.github.io/)
```