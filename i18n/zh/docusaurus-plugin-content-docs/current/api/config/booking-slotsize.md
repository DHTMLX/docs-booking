---
sidebar_label: slotSize
title: slotSize
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 slotSize 的相关内容。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# slotSize

### 描述 {#description}

@short: 可选。定义所有卡片的预约时间段时长

:::note
仅当 [`data`](api/config/booking-data.md) 属性中的 `size` 或 `slotSize` 参数未设置 size 值时，此值才会生效。
:::

### 用法 {#usage}

~~~jsx {}
slotSize?: number;
~~~

### 参数 {#parameters}

- `number` - （可选）预约时间段的时长，单位为分钟；默认值为 60 分钟

### 示例 {#example}

~~~jsx {}
const slotSize = 45;

new booking.Booking("#root", {
    slotSize,
    // 其他参数
});
~~~

以下代码片段展示了如何为所有时间段设置时长和[间隔](api/config/booking-slotgap.md)：

<iframe src="https://snippet.dhtmlx.com/pw8xsl1p?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
