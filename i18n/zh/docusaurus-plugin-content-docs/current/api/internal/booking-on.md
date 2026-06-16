---
sidebar_label: api.on()
title: on() 方法
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 on 方法。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# api.on()

### 描述 {#description}

@short: 允许将处理函数绑定到内部事件

### 用法 {#usage}

~~~jsx {}
api.on(
    event: string,
    handler: function,
    config?: { tag?: number | string }
): void;
~~~

### 参数 {#parameters}

- `event` - （必填）要触发的事件
- `handler` - （必填）要绑定的处理函数（处理函数的参数取决于所触发的事件）
- `config` - （可选）包含处理函数额外设置的对象：
  - `tag` - （可选）用于标识处理函数的标签，以便之后通过 [`api.detach()`](api/internal/booking-detach.md) 方法将其移除

:::info
Booking 内部事件的完整列表可在[**此处**](api/overview/booking-events-overview.md)查看。
如果您只想监听操作而不修改它们，请使用 `api.on()` 方法。若要对操作进行修改，请使用 [`api.intercept()`](api/internal/booking-intercept.md) 方法。
:::

### 示例 {#example}

~~~jsx {7-10}
// 创建 Booking
const widget = new booking.Booking("#root", {
    data,
    // 其他配置参数
});

// 输出所选时间段的 id 和时间
widget.api.on("select-slot", (obj) => {
    console.log("The selected slot", obj.id, "and time", obj.time);
});
~~~
