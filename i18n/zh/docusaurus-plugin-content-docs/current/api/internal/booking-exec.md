---
sidebar_label: api.exec()
title: exec() 方法
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 exec 方法。浏览开发指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费评估版本。
---

# api.exec()

### 描述 {#description}

@short: 允许触发内部事件

该方法为异步方法，返回一个 Promise，解析后得到已处理的事件配置对象。

### 用法 {#usage}

~~~jsx {}
api.exec(
    event: string,
    config: object
): Promise<any>;
~~~

### 参数 {#parameters}

- `event` - （必填）要触发的事件
- `config` - （必填）包含参数的配置对象（参见要触发的事件）

### Events {#events}

:::info
Booking 内部事件的完整列表可在[**此处**](api/overview/booking-events-overview.md)查看。
:::

### 示例 {#example}

以下示例演示如何在初始化时应用筛选器：

~~~jsx {5-19}
const widget = new booking.Booking("#root", {
    data,
    //其他配置参数
});
widget.api.exec("filter-data", {
    text: "Allergist",
    date: {
        start: new Date,
        end: new Date(2025, 2, 12)
    },
    time: [
        {
            from: 12,
            to: 20
        }
    ]
});
~~~
