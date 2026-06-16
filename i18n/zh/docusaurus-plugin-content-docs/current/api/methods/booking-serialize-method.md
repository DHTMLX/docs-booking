---
sidebar_label: serialize()
title: serialize() 方法
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 serialize() 方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# serialize()

### 描述 {#description}

@short: 将 Booking 数据序列化为 JSON 数组

### 用法 {#usage}

~~~jsx
serialize(): object[];
~~~

### 返回值 {#returns}

返回 [data](api/config/booking-data.md) 数组。

### 示例 {#example}

~~~jsx {}
// 创建 Booking
const widget = new booking.Booking("#root", {
    data,
    // 配置参数
});

console.log(widget.serialize());
~~~
