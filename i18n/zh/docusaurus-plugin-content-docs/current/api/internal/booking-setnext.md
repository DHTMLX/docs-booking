---
sidebar_label: api.setNext()
title: setNext() 方法
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 setNext 方法。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# api.setNext()

### 描述 {#description}

@short: 将自定义处理程序添加到 widget Event Bus 链的末尾

### 用法 {#usage}

~~~jsx {}
api.setNext(next: any): void;
~~~

### 参数 {#parameters}

- `next` - （必填）要加入 **Event Bus** 顺序的操作

### 示例 {#example}

以下示例演示如何使用 `api.setNext()` 方法将自定义类集成到 Event Bus 顺序中：

~~~jsx {}
const widget = new booking.Booking("#root", { data: [] });
const server = "https://some-backend-url";

// Assume you have a custom server service class named someServerService
const someServerService = new ServerDataService(server);

fetch(server + "/data").then((res) => res.json()).then((data) => {
    widget.setConfig({data});
});
// Integrate someServerService into the Event Bus order of the widget
widget.api.setNext(someServerService);
~~~

**相关文章**：[加载数据](guides/loading-data.md)
