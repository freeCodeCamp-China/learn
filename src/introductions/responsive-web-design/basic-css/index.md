---
title: Introduction to Basic CSS
block: Basic CSS
superBlock: Responsive Web Design
---
## Introduction to Basic CSS

CSS 的全称是 Cascading Style Sheet（层叠样式表），它主要用来控制网页的样式。

注意，CSS 的选择器区分大小写，因此要谨慎使用大写。

CSS 早已被所有主流浏览器采用，它允许你轻松控制以下样式：

* 颜色 color
* 背景 background
* 字体 font
* 位置 position
* 显示 display
* 边框 border
* 内边距 padding
* 外边距 margin
* 行高 line-height
* 装饰 text-decoration
* 过渡 transtion
* 变化 transform
* 动画 animation

使用 CSS 样式主要有三种方式：
* 内联样式--你可以直接在 HTML 元素里使用`style`属性。
* 内部样式--你可以在`style`标签里面声明样式规则。
* 外部样式--你可以创建一个`.css`文件，然后在文件中编写样式规则，最后在文档中引用该文件。

尽管前两个方式也有人使用，但大部分开发人员更喜欢外部样式表，因为它可以将样式与元素分开，这提高了代码的可读性和重用性。

CSS 背后的思想是，通过选择器来定位 DOM（文档对象模型）的元素，然后将各种样式规则应用在元素上，从而改变元素在页面上的显示方式。

在本章中，你会看到我们是如何一步步将 CSS 样式应用到猫咪相册中，从而让相册变得丰富多彩起来。

