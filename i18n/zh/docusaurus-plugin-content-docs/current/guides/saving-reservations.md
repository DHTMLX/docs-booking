---
sidebar_label: 与服务器协同工作
title:  与服务器协同工作
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解如何与服务器协同工作。浏览开发指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# 与服务器协同工作 {#working-with-server}

Booking 组件通过两个主要操作与后端集成：从服务器加载卡片数据，以及将时间段预订信息回传至服务器。本指南涵盖这两个流程，以及在服务器数据使用不同时区时所需的 UTC 转换。

## 从服务器加载数据 {#load-data-from-the-server}

使用原生 `fetch` API（或任何等效的 HTTP 客户端）获取卡片数据，并通过 [`setConfig()`](api/methods/booking-setconfig-method.md) 方法将解析后的 JSON 传入组件。

以下代码片段初始化一个空的 Booking 实例，并在响应返回后加载数据集：

~~~jsx {}
const widget = new booking.Booking("#booking", { data: [] });
const server = "https://some-backend-url";

fetch(server + "/data")
    .then((res) => res.json())
    .then((data) => {
        widget.setConfig({ data });
    });
~~~

## 将时间段预订信息保存至服务器 {#save-slot-reservations-to-the-server}

要在后端处理时间段预订，请使用 [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) 方法注册确认处理函数。

该处理函数接收一个包含三个字段的事件对象：

- `slot` — 已预订的时间段：`id`（卡片 ID）和 `time`（`[timestamp, duration]`）
- `data` — 以 [`formShape`](api/config/booking-formshape.md) 字段 ID 为键的表单值（默认值：`name`、`email`、`description`）
- `confirm` — 服务器响应 callback：成功时调用 `done()`，失败时调用 `error()`

以下代码片段将预订信息发送至服务器，并根据响应结果处理预订状态：

~~~jsx {}
// 处理时间段预订逻辑
const handleSlotReservation = (event) => {
    const { confirm, slot, data } = event;

    // 构建请求体
    const info = {
        item: slot.id,
        start: slot.time[0],
        data
    };

    // 将请求体发送至服务器
    fetch("/server/url", {
        method: "POST",
        body: JSON.stringify(info),
    // 根据响应结果确认或拒绝预订
    }).then((response) => {
        if (response.ok) confirm.done();
        else confirm.error();
    });
};

// 创建 Booking 实例
const widget = new booking.Booking("#root", {
    data: [],
    // 配置参数
});

// 从服务器获取数据集
fetch("/server/url")
    .then((res) => res.json())
    .then((items) => {
        // 将获取的数据加载至组件
        widget.setConfig({ data: items });
        // 注册预订处理函数
        widget.setConfirmHandler(handleSlotReservation);
    });
~~~

:::info
[`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) 方法是一个快捷方式，其内部通过 `widget.api.on("confirm-slot", handler)` 订阅 [`confirm-slot`](api/events/booking-confirmslot-event.md) 事件。两种方式注册的处理函数具有相同的 callback 结构——当需要添加多个订阅者时，可直接调用 `widget.api.on("confirm-slot", handler)`。
:::

## 将 UTC 数据转换为本地时区 {#convert-utc-data-to-the-local-timezone}

组件以本地时区运行。如果服务器返回的是 UTC 时间戳，请在将数据传入组件前进行转换，并在发送预订信息前将其转回 UTC。

以下辅助函数处理两个方向的转换：

- `g2l` — 将 UTC 时间戳转换为本地时区（应用于传入的 `usedSlots` 和 `slots.dates`）
- `l2g` — 将本地时间戳转回 UTC（在发送至服务器前应用于 `slot.time[0]`）

以下代码片段将两个辅助函数整合到一个完整的加载与预订流程中：

~~~jsx
const serverURL = "https://some-backend-url";

function g2l(v) {
    const utcDate = new Date(v);
    return new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
        utcDate.getUTCHours(),
        utcDate.getUTCMinutes(),
        utcDate.getUTCSeconds(),
        utcDate.getUTCMilliseconds(),
    ).valueOf();
}

function l2g(v) {
    const date = new Date(v);
    return Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
    );
}

const handleSlotReservation = event => {
    const { confirm, slot, data } = event;

    const info = {
        doctor: slot.id,
        date: l2g(slot.time[0]),
        form: {
            name: data.name,
            email: data.email,
            details: data.description,
        },
    };

    fetch( serverURL + "/doctors/reservations", {
        method: "POST",
        body: JSON.stringify(info),
    }).then(response => {
        if (response.ok) confirm.done();
        else confirm.error();
    });
};

// 组件初始化
const widget = new booking.Booking("#root", {
    data: [],
});

// 加载数据
fetch( serverURL + "/units")
    .then(res => res.json())
    .then(units => {
        units.forEach(unit => {
            if (unit.usedSlots) unit.usedSlots = unit.usedSlots.map(g2l);
            if (unit.slots) {
                unit.slots = unit.slots.map(slot => {
                    if (slot.dates) {
                        return {
                            ...slot,
                            dates: slot.dates.map(g2l)
                        };
                    }
                    return slot;
                });
            };
        });

        widget.setConfig({ data: units });
        widget.setConfirmHandler(handleSlotReservation);
    });
~~~


## 示例 {#example}

以下代码片段演示了完整的服务器端预订流程：

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**相关文章**：

- [`confirm-slot`](api/events/booking-confirmslot-event.md) — 用户确认时间段时触发的事件
- [`setConfig()`](api/methods/booking-setconfig-method.md) — 使用获取的数据更新组件配置
- [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) — 注册时间段预订处理函数
