---
sidebar_label: 加载数据
title: 加载数据
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解如何将数据加载到 Booking 中。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费评估版本。
---

# 加载数据

Booking widget 通过配置对象接受一个数据数组：

- [`data`](api/config/booking-data.md) — 包含时间段规则的卡片对象数组

:::tip
对于大型数据集，请通过 [`renderType`](api/config/booking-rendertype.md) 属性启用懒渲染，使 widget 仅渲染可见的卡片。
:::

## 准备示例数据集 {#prepare-a-sample-dataset}

将卡片数据保存在独立文件中，以便在页面和测试之间共享该数据集。每个卡片对象包含标识字段、显示字段以及定义可用规则的 `slots` 数组。

以下代码片段在 *data.js* 模块中定义了三个卡片对象。辅助函数 `getDate(addDays, hours, minutes)` 返回相对于今天某个日期的时间戳（例如，`getDate(0, 12)` 表示今天本地时间的 12:00）：

~~~jsx title="data.js"
// 返回"今天 + addDays"在指定 hours:minutes（本地时间）的时间戳
function getDate(addDays, hours = 0, minutes = 0) {
    const date = new Date();
    date.setDate(date.getDate() + addDays);
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
}

const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "$35",
        review: {
            stars: 4,
            count: 120
        },
        slots: [
            {
                from: 9, to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10, to: 18,
                days: [6, 0]
            }
        ]
    },
    {
        id: "5c9b64ad-1830-4e5b-a5f9-8acea10706df",
        title: "James Anderson",
        category: "Allergist",
        subtitle: "3 years of experience",
        details: "UCLA Medical Center\n57 Westwood Plaza",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/11.jpg",
        price: "$30",
        review: {
            stars: 4,
            count: 64
        },
        slotSize: 45,
        slotGap: 10,
        slots: [
            {
                from: "9:15", to: 17,
                days: [1, 2, 3, 4, 5]
            }
        ]
    },
    {
        id: "9b037564-77be-429f-b719-eebbe499027a",
        title: "Emma Johnson",
        category: "Cardiologist",
        subtitle: "2 years of experience",
        details: "Stanford Health Care\n1468 Madison Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/03.jpg",
        price: "$25",
        review: {
            stars: 5,
            count: 10
        },
        slots: [
            {
                from: 14, to: 17,
                size: 30, gap: 10
            },
            {
                from: 12, to: 19,
                size: 50, gap: 20,
                days: [2], dates: [getDate(0)]
            },
            {
                from: "18:30", to: 20,
                size: 20, gap: 20,
                days: [3, 4, 5]
            },
        ],
        usedSlots: [getDate(0, 12), getDate(0, 18)]
    }
];
~~~

## 从本地文件加载数据 {#load-data-from-a-local-file}

通过辅助函数将数据集暴露出来，从独立的 JavaScript 文件中加载卡片数据。

以下代码片段定义了 `getData()`，该函数同时返回 `data` 和 `cardShape` 配置：

~~~jsx {}
function getData() {
    return {
        data,
        cardShape
    };
}

const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "$35",
        review: {
            stars: 4,
            count: 120
        },
        slots: [
            {
                from: 9, to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10, to: 18,
                days: [6, 0]
            }
        ]
    },
    // 其他卡片
];

const cardShape = {
    preview: true,
    review: true,
    category: true,
    title: true,
    subtitle: true,
    price: true,
    details: true
};
~~~

在 Booking 源文件之后，在页面上引入数据文件。

以下代码片段将 *data.js* 模块引入 *index.html*：

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>
<link rel="stylesheet" href="./dist/booking.css">

<script src="./common/data.js"></script>
~~~

将 `getData()` 返回的数据集传递给 Booking 构造函数。

以下代码片段使用已加载的数据创建一个 Booking 实例：

~~~jsx {}
const { data } = getData();
const widget = new booking.Booking("#root", { data });
~~~

## 初始化后更新数据 {#update-data-after-initialization}

如需在 Booking 初始化后替换数据集，请使用新的 `data` 数组调用 [`setConfig()`](api/methods/booking-setconfig-method.md) 方法。该方法会使用合并后的配置重新初始化 widget。

以下代码片段从服务器获取最新数据集并将其应用到现有的 Booking 实例：

~~~jsx {}
fetch("/api/cards")
    .then(res => res.json())
    .then(data => {
        widget.setConfig({ data });
    });
~~~

有关服务器端预约持久化的内容，请参阅[将预约保存到服务器](guides/saving-reservations.md)指南。

---

**相关文章**：

- [`confirm-slot`](api/events/booking-confirmslot-event.md) — 处理时间段预约确认
- [`setConfig()`](api/methods/booking-setconfig-method.md) — 初始化后更新 widget 配置
- [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) — 定义时间段确认处理程序
- [`renderType`](api/config/booking-rendertype.md) — 切换默认渲染与懒渲染
- [将预约保存到服务器](guides/saving-reservations.md) — 在服务器端持久化预约数据
