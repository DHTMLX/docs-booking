---
sidebar_label: api.intercept()
title: intercept() 方法
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 intercept 方法。浏览开发者指南和 API 参考，尝试代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# api.intercept()

### 描述 {#description}

@short: 允许拦截并阻止内部事件

### 用法 {#usage}

~~~jsx {}
api.intercept(
    event: string,
    callback: function,
    config?: { tag?: number | string }
): void;
~~~

### 参数 {#parameters}

- `event` - （必填）要触发的事件
- `callback` - （必填）要执行的回调函数（回调参数取决于所触发的事件）
- `config` - （可选）包含回调额外设置的对象：
  - `tag` - （可选）标识回调的标签，以便后续通过 [`api.detach()`](api/internal/booking-detach.md) 方法将其移除

:::info
Booking 内部事件的完整列表可在[**此处**](api/overview/booking-events-overview.md)查看。
如果您只想监听操作而不修改它们，请使用 [`api.on()`](api/internal/booking-on.md) 方法。若要对操作进行修改，请使用 `api.intercept()` 方法。
:::

### 示例 {#example}

~~~jsx {7-11}
// 创建 Booking
const widget = new booking.Booking("#root", {
    data,
    // 其他配置参数
});

// 每次触发 filter-data 事件时，仅显示上午时段的可用时间段
widget.api.intercept("filter-data", data => {
    data.time = [{ from: 9, to: 12 }];
});
~~~
