---
sidebar_label: infoShape
title: infoShape
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 infoShape 配置项。浏览开发指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# infoShape

### 描述 {#description}

@short: 可选。一个对象，用于配置 Booking 对话框左侧显示的信息内容

### 用法 {#usage}

~~~jsx {}
infoShape?: {
    preview?: boolean,
    category?: boolean,
    title?: boolean,
    price?: boolean,
    details?: boolean
};
~~~

### 参数 {#parameters}

该对象包含以下参数：

- `preview` - （可选）在 Booking 对话框信息块（左侧）中显示或隐藏预览图片
- `category` - （可选）在 Booking 对话框左侧显示或隐藏类别名称（例如，专家的职位）
- `title` - （可选）在 Booking 对话框信息块中显示或隐藏标题（例如，专家的姓名）
- `price` - （可选）在 Booking 对话框信息块中显示或隐藏价格
- `details` - （可选）在 Booking 对话框信息块中显示或隐藏详细信息

### 默认配置 {#default-config}

~~~jsx {}
const defaultInfoShape = {
    preview: true,
    category: true,
    title: true,
    price: true,
    details: true
};
~~~

### 示例 {#example}

~~~jsx {}
const infoShape = {
    preview: false,
    price: false
};

new booking.Booking("#root", {
    data,
    infoShape,
    // 其他参数
});
~~~

以下代码片段展示了如何配置 Booking 对话框左侧显示的内容：

<iframe src="https://snippet.dhtmlx.com/pd6wp1xc?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
您也可以使用 [`infoTemplate`](api/config/booking-infotemplate.md) 属性控制 Booking 对话框信息块中显示的字段。但如果两个属性同时应用，`infoTemplate` 将覆盖 `infoShape` 的设置。
:::

**相关文章**：

- [配置 Booking 对话框](guides/configuration.md#configure-the-booking-dialog)
- [`infoTemplate`](api/config/booking-infotemplate.md)
