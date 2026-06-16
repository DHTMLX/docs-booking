---
sidebar_label: slotGap
title: slotGap
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 slotGap 的相关内容。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# slotGap

### 描述 {#description}

@short: 可选。为所有卡片定义预约时间槽之间的间隔

:::note
仅当 [`data`](api/config/booking-data.md) 属性中的 `gap` 或 `slotGap` 参数未设置间隔值时，该值才会生效。
:::

### 用法 {#usage}

~~~jsx {}
slotGap?: number;
~~~

### 参数 {#parameters}

- `number` - （可选）时间槽之间的间隔，单位为分钟；默认值为 0

### 示例 {#example}

~~~jsx {}
const slotGap = 10;

new booking.Booking("#root", {
    slotGap,
    // 其他参数
});
~~~

以下代码片段展示了如何为所有时间槽设置[时长](api/config/booking-slotsize.md)和间隔：

<iframe src="https://snippet.dhtmlx.com/pw8xsl1p?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
