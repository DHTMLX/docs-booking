---
sidebar_label: select-item-date
title: select-item-date 事件
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 select-item-date 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费试用版本。
---

# select-item-date

### 描述 {#description}

@short: 当为某个条目选择日期时触发

### 用法 {#usage}

~~~jsx {}
"select-item-date": ({
    id: string|number,
    date: number
}) => void;
~~~

### 参数 {#parameters}

`select-item-date` 事件的回调函数可接收一个包含以下参数的对象：

- `id` - （必填）条目的 id
- `date` - （必填）为所选条目设置的日期（以毫秒为单位）

### 示例 {#example}

~~~jsx {7-10}
// 创建 Booking
const widget = new booking.Booking("#root", {
    data,
    // 其他配置参数
});

// 输出日期
widget.api.on("select-item-date", (ev) => {
    console.log(ev.date);
});
~~~
