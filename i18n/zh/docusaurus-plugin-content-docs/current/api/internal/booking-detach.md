---
sidebar_label: api.detach()
title: detach() 方法
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 detach 方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费评估版本。
---

# api.detach()

### 描述 {#description}

@short: 用于移除/解绑事件处理器

### 用法 {#usage}

~~~jsx {}
api.detach(tag: number | string ): void;
~~~

### 参数 {#parameters}

- `tag` - （必填）操作标签的名称

### 示例 {#example}

在以下示例中，我们向 [`api.on()`](api/internal/booking-on.md) 处理器添加了一个包含 `tag` 属性的对象，然后使用 `api.detach()` 方法停止记录 [`select-slot`](api/events/booking-selectslot-event.md) 事件。

~~~jsx {6-20}
const widget = new booking.Booking("#root", {
    data,
    //其他配置参数
});

// 添加处理器
if (widget.api) {
    widget.api.on(
        "select-slot",
        ({ id }) => {
            console.log("Selected: " + id);
        },
        { tag: "track" }
    );
}

// 解绑处理器
function stop() {
    widget.api.detach("track");
}

const button = document.createElement("button");

button.addEventListener("click", stop);
button.textContent = "Stop logging";

document.body.appendChild(button);
~~~
