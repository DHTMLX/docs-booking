---
sidebar_label: confirm-slot
title: confirm-slot 事件
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 confirm-slot 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费评估版本。
---

# confirm-slot

### 描述 {#description}

@short: 在确认预订时段时触发

### 用法 {#usage}

~~~jsx {}
"confirm-slot": ({
    slot:{
        id:string|number,
        time: [ number, number ]
    },
    data:{
        [key]: string
    },
    confirm:{
        promise:Promise,
        done: (value:any) => void,
        error: (error: Error) => void
    }
}) => void;
~~~

### 参数 {#parameters}

`confirm-slot` 事件的回调函数可以接收一个包含以下参数的对象：

- `slot` - （必填）包含以下时段参数的对象：
    - `id` - （必填）已确认预订的卡片 ID
    - `time` - （必填）一个数组，包含时段开始时间（毫秒）和时段持续时间（分钟）（开始时间以毫秒为单位，表示本地挂钟时间）
- `data` - （必填）包含预订表单字段的对象，每个字段具有以下参数：
    - `key` - （必填）表单字段 ID（来自 [`formShape`](api/config/booking-formshape.md)）。默认情况下，添加三个字段：*name*、*email*、*description*
- `confirm` - （必填）包含以下参数的对象：
    - `promise` - （必填）表示确认状态的 Promise。这是一个 JavaScript Promise 对象，代表确认时段预订的异步操作。Promise 将根据预订流程的结果被解析或拒绝。您可以为此 Promise 附加 `.then` 和 `.catch` 处理器，以处理预订成功或失败的情况。
    - `done` - （必填）预订成功确认时应调用的回调函数。调用此函数将解析 Promise，表示预订成功。您可以在收到服务器的肯定响应后调用此函数。
    - `error` - （必填）预订失败时应调用的回调函数。调用此函数将拒绝 Promise，表示预订失败。您可以在收到服务器的否定响应后调用此函数。

### 示例 {#example}

~~~jsx {7-10}
// 创建 Booking
const widget = new booking.Booking("#root", {
    data,
    // 其他配置参数
});

widget.api.on("confirm-slot", (obj) => {
    console.log("已确认预订的时段 ID：", obj.slot.id);
});
~~~

**相关文章**：[`setConfirmHandler`](api/methods/booking-setconfirmhandler-method.md) 方法
