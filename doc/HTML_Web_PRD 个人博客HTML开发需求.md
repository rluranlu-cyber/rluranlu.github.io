# HTML 网页开发需求文档

## 1. 项目基本信息

- 项目名称：HTML 网页开发
- 项目类型：
  - [x] 个人主页
  - [ ] 作品集
  - [ ] 产品展示页
  - [ ] 活动页
  - [x] 博客
  - [ ] 其他：
- 项目负责人：Ran
- 开发方式：
  - [x] 纯 HTML + CSS
  - [ ] HTML + CSS + JavaScript
  - [ ] 其他：
- 部署平台：
  - [x] GitHub Pages
  - [ ] Vercel
  - [ ] Netlify
  - [ ] 自建服务器
  - [ ] 其他：
- 目标上线时间：2026/09/30

---

## 2. 项目目标

### 2.1 网站用途

说明这个网站主要是做什么的。

- 展示个人信息
- 记录生活
- 分享技术
- 提供联系方式

### 2.2 目标用户

- 同行业从业者
- 普通访客
- 朋友

### 2.3 用户进入网站后希望完成的行为

- 快速了解我是谁
- 浏览我的文章
- 查看联系方式

---

## 3. 页面结构

### 3.1 页面数量

- [x] 单页网站
- [ ] 多页网站

### 3.2 页面模块

首页计划包含：

```text
Header
Hero
About
Articles
Contact
Footer
```

实际模块：

- [ ] Header / 导航栏
- [ ] Hero / 首屏
- [ ] About / 自我介绍
- [ ] Articles / 文章
- [ ] Contact / 联系方式
- [ ] Footer / 页脚

---

## 4. 页面内容

### 4.1 Hero 首屏

主标题：

```text
例如：
Hello, I'm Ran.
```

副标题：

```text
例如：
3D Artist / Visual Creator
```

补充描述：

```text
填写内容
```

按钮：

- [ ] View Projects
- [ ] About Me
- [ ] Contact
- [ ] GitHub
- [ ] 其他：

### 4.2 About 自我介绍

标题：

```text
About Me
```

正文：

```text
填写个人简介
```

需要展示：

- [x] 头像
- [x] 职业
- [x] 所在领域
- [x] 兴趣方向
- [x] 工作经历
- [x] 教育经历

### 4.3 Articles 文章

项目数量：

```text
例如：6
```

每个项目包含：

- 项目名称
- 项目封面
- 项目简介
- 使用工具
- 项目年份
- 项目链接

示例：

```text
项目名称：
项目类型：
年份：
使用软件：
简介：
图片：
链接：
```

项目展示方式：

- [ ] 卡片
- [ ] 网格 Grid
- [ ] 横向列表
- [ ] 大图展示
- [ ] Gallery
- [ ] Slider

### 4.4 Contact 联系方式

展示：

- [x] Email
- [x] GitHub
- [ ] LinkedIn
- [ ] ArtStation
- [ ] Behance
- [ ] Instagram
- [ ] 其他：

是否需要联系表单：

- [ ] 是
- [x] 否

---

## 5. 视觉设计

### 5.1 整体风格

关键词：

```text
例如：

Minimal
Clean
Editorial
Warm
```

视觉参考：

```text
参考网站 / 图片 / 截图：
```

---

## 6. 色彩方案

### 背景色

```css
#FFFFFF
```

### 主文字颜色

```css
#222222
```

### 次级文字颜色

```css
#777777
```

### 强调色

```css
#D9D1BB
```

### 链接颜色

```css
#000000
```

### Hover 颜色

```css
#666666
```

---

## 7. 字体

### 英文字体

```text
例如：
Arial
Helvetica
Inter
Roboto
Georgia
```

### 中文字体

```text
例如：
Microsoft YaHei
Noto Sans SC
思源黑体
```

### 字号

```text
H1：
H2：
正文：
小字：
```

---

## 8. Layout 布局

页面最大宽度：

```css
max-width: 1200px;
```

页面左右边距：

```css
padding: 0 40px;
```

内容布局：

- [ ] 单列
- [ ] 双列
- [ ] Grid
- [ ] Flexbox
- [ ] 混合

内容对齐：

- [ ] 左对齐
- [ ] 居中
- [ ] 右对齐

---

## 9. 图片规范

图片目录：

```text
/images
```

图片格式：

- [ ] JPG
- [ ] PNG
- [ ] WebP
- [ ] SVG

项目封面比例：

```text
例如：
16:9
4:3
1:1
```

是否允许图片裁切：

- [ ] 是
- [ ] 否

---

## 10. 导航

导航栏内容：

```text
Home
About
Projects
Contact
```

导航方式：

- [ ] 页面跳转
- [ ] 单页锚点滚动

是否固定顶部：

- [ ] 是
- [ ] 否

例如：

```html
<a href="#about">About</a>
```

---

## 11. 交互

需要的交互：

- [ ] Hover 效果
- [ ] 平滑滚动
- [ ] 图片放大
- [ ] 项目弹窗
- [ ] 菜单展开
- [ ] 图片轮播
- [ ] 页面淡入
- [ ] Scroll Animation
- [ ] 其他：

是否使用 JavaScript：

- [ ] 不使用
- [ ] 少量使用
- [ ] 大量使用

---

## 12. 响应式设计

支持设备：

- [x] Desktop
- [ ] Tablet
- [x] Mobile

主要断点：

```css
Desktop:
> 1200px

Tablet:
768px - 1199px

Mobile:
< 768px
```

移动端需要特别调整：

- 字体大小
- 导航栏
- 图片尺寸
- 页面间距
- Grid 列数

---

## 13. 文件结构

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

## 14. HTML 结构规范

建议使用语义化标签：

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

尽量避免全部依赖无意义的 `div`：

```html
<div>
<div>
<div>
```

---

## 15. CSS 规范

CSS 单独存放：

```text
style.css
```

命名方式：

```css
.hero
.about
.projects
.project-card
.contact
.footer
```

建议优先使用：

```text
Flexbox
Grid
```

避免大量依赖：

```css
position: absolute;
```

---

## 16. SEO 基础信息

网页标题：

```html
<title>Ran | 3D Artist</title>
```

网页描述：

```html
<meta
    name="description"
    content="Personal portfolio of Ran, a 3D artist and visual creator."
>
```

网页语言：

```html
<html lang="zh-CN">
```

---

## 17. 网站图标

是否需要 Favicon：

- [ ] 是
- [ ] 否

文件：

```text
favicon.ico
```

或：

```text
favicon.png
```

---

## 18. 外部链接

所有外部链接：

```text
GitHub：
ArtStation：
LinkedIn：
Email：
其他：
```

是否新窗口打开：

```html
target="_blank"
```

---

## 19. GitHub Pages 部署

仓库名称：

```text
填写仓库名
```

主分支：

```text
main
```

发布目录：

```text
/
```

首页：

```text
index.html
```

最终访问地址：

```text
https://rluranlu-cyber.github.io/repository/
```

---

## 20. 浏览器兼容

至少测试：

- [x] Chrome
- [ ] Edge
- [ ] Safari
- [ ] Firefox

---

## 21. 性能要求

- 图片适当压缩
- 避免上传超大图片
- 尽量减少无必要 JavaScript
- 首屏加载速度优先
- 使用 WebP 时保留兼容性考虑

---

## 22. 开发完成标准

网站完成前检查：

- [ ] 首页正常加载
- [ ] CSS 正常加载
- [ ] 图片全部正常显示
- [ ] 所有链接有效
- [ ] 手机端正常显示
- [ ] Desktop 正常显示
- [ ] 导航正常
- [ ] Hover 正常
- [ ] 无明显排版问题
- [ ] GitHub Pages 正常部署

---

# 最终需求摘要

## 网站目的

```text
填写
```

## 页面结构

```text
填写
```

## 视觉风格

```text
填写
```

## 主色

```text
填写 HEX
```

## 核心内容

```text
填写
```

## 交互需求

```text
填写
```

## 部署方式

```text
GitHub Pages
```
