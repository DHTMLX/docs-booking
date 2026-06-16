---
sidebar_label: renderType
title: renderType
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 renderType。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# renderType

### 描述 {#description}

@short: 可选。定义卡片的渲染方式

该属性有助于在处理大量卡片时优化性能。

### 用法 {#usage}

~~~jsx {}
renderType?: "default" | "lazy";
~~~

### 参数 {#parameters}

- `default` - 渲染加载到 widget 中的所有卡片（默认设置）
- `lazy` - 仅渲染可见的卡片

### 示例 {#example}

~~~jsx {}
new booking.Booking("#root", {
    data,
    renderType: "lazy",
    // 其他参数
});
~~~

以下代码片段演示了如何处理大型数据集的渲染：

<iframe src="https://snippet.dhtmlx.com/fb9a5a3b?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
