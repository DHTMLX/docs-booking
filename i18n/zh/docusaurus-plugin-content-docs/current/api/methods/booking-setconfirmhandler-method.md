---
sidebar_label: setConfirmHandler()
title: setConfirmHandler() 方法
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 setConfirmHandler() 方法。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# setConfirmHandler()

### 描述 {#description}

@short: 注册一个用于 confirm-slot 事件的处理函数

### 用法 {#usage}

~~~jsx
setConfirmHandler(confirmHandler: (ev) => any): void;
~~~

### 参数 {#parameters}

该方法接受 `confirmHandler` 函数，该函数将在确认预订时段时被调用。此函数接受与 [`confirm-slot`](api/events/booking-confirmslot-event.md) 事件相同的对象。

### 示例 {#example}

~~~jsx {}
const { data } = getData();
const widget = new booking.Booking("#root", {
    data
});

widget.setConfirmHandler((ev) => {
    console.log("Booking info:", ev);
});
~~~

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**相关文章**：[将预约信息保存到服务器](guides/saving-reservations.md)
