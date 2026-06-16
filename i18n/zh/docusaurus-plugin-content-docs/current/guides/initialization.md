---
sidebar_label: 初始化
title: 初始化
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解有关初始化的内容。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# 初始化 {#initialization}

本指南将引导您在页面上创建一个 Booking 实例。请按照以下步骤启动该组件：

1. [引入 Booking 源文件](#include-source-files)。
2. [创建容器](#create-a-container)。
3. [使用构造函数初始化 Booking](#initialize-booking)。

## 引入源文件 {#include-source-files}

Booking 组件以两个文件的形式提供，需加载到页面中。

[下载安装包](https://dhtmlx.com/docs/products/dhtmlxBooking/) 并将其解压到项目文件夹中。将以下文件添加到页面：

- *booking.js* — Booking 源代码
- *booking.css* — Booking 样式表

请确保源文件的相对路径正确。

以下代码片段从 *dist/* 文件夹中引入 Booking 文件：

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>
<link rel="stylesheet" href="./dist/booking.css">
~~~

## 创建容器 {#create-a-container}

添加一个用于承载 Booking 组件的 HTML 元素，并为其指定一个 ID，例如 *root*。

以下代码片段创建了一个 ID 为 *root* 的容器：

~~~jsx title="index.html"
<div id="root"></div>
~~~

## 初始化 Booking {#initialize-booking}

使用两个参数调用 `booking.Booking` 构造函数：

- container — 承载组件的 HTML 容器的选择器或 ID
- config — 包含配置属性的对象（参见[配置属性](#configuration-properties)）

以下代码片段在 `#root` 容器中初始化 Booking：

~~~jsx title="index.html"
// 创建 Booking
new booking.Booking("#root", {
    // 配置属性
});
~~~

### 配置属性 {#configuration-properties}

:::info
有关用于配置 Booking 的完整属性列表，请参阅[属性概览](api/overview/booking-properties-overview.md)。
:::

## 示例 {#example}

以下代码片段使用一组初始属性初始化 Booking：

<iframe src="https://snippet.dhtmlx.com/6it4ohez?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
