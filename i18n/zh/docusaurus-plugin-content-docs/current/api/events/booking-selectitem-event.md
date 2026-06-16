---
sidebar_label: select-item
title: select-item 事件
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 select-item 事件。浏览开发者指南和 API 参考，尝试代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# select-item

### 描述 {#description}

@short: 当选中某个条目时触发

### 用法 {#usage}

~~~jsx {}
"select-item": ({
    id: string|number
}) => void;
~~~

### 参数 {#parameters}

`select-item` 事件的回调函数可接收一个包含以下参数的对象：

- `id` - （必填）条目的 id

### 示例 {#example}

~~~jsx {7-10}
// 创建 Booking
const widget = new booking.Booking("#root", {
    data,
    // 其他配置参数
});

// 输出所选条目的 id
widget.api.on("select-item", (ev) => {
    console.log(ev.id);
});
~~~
