---
sidebar_label: cardShape
title: cardShape
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 cardShape 配置项。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费评估版本。
---

# cardShape

### 描述 {#description}

@short: 可选。一个对象，用于管理每张卡片左侧显示的信息

### 用法 {#usage}

~~~jsx {}
cardShape?: {
    category?: boolean,
    details?: boolean,
    preview?: boolean,
    price?: boolean,
    review?: boolean,
    subtitle?: boolean,
    title?: boolean
};
~~~

### 参数 {#parameters}

在 `cardShape` 对象中，您可以指定以下参数（字段）：

- `category` - （可选）显示/隐藏类别名称
- `details` - （可选）显示/隐藏详细信息
- `preview` - （可选）显示/隐藏预览图片
- `price` - （可选）显示/隐藏价格
- `review` - （可选）显示/隐藏评分信息
- `subtitle` - （可选）显示/隐藏卡片副标题
- `title` - （可选）显示/隐藏卡片标题

### 默认配置 {#default-config}

~~~jsx {}
const defaultCardShape = {
    category: true,
    details: true,
    preview: true,
    price: true,
    review: true,
    subtitle: true,
    title: true
};
~~~

### 示例 {#example}

~~~jsx {}
const cardShape = {
    review: false,
    subtitle: false,
    price: false
};

new booking.Booking("#root", {
    cardShape,
    // 其他参数
});
~~~

以下代码片段演示了如何配置卡片左侧显示的字段：

<iframe src="https://snippet.dhtmlx.com/6mxd7918?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
您也可以使用 [`cardTemplate`](api/config/booking-cardtemplate.md) 属性配置卡片的外观。如果同时应用了 `cardTemplate` 和 `cardShape`，`cardTemplate` 将覆盖 `cardShape` 的设置。
:::

**相关文章**：

- [定义卡片结构](guides/configuration.md#define-the-structure-of-cards)
- [`cardTemplate`](api/config/booking-cardtemplate.md)
