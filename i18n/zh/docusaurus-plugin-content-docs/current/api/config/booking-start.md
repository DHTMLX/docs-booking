---
sidebar_label: start
title: start
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 start 日期的相关信息。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# start

### 描述 {#description}

@short: 可选。定义开始显示可用时间段的日期

### 用法 {#usage}

~~~jsx {}
start?: Date;
~~~

### 参数 {#parameters}

- `Date` - （可选）开始显示可用时间段的起始日期；默认值为当前日期。

### 示例 {#example}

~~~jsx {}
new booking.Booking("#root", {
    data,
    start: new Date(2024, 10, 10),
    // 其他参数
});
~~~

以下代码片段展示了如何设置 start 和 [end](api/config/booking-end.md) 日期：

<iframe src="https://snippet.dhtmlx.com/cc28whe7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
