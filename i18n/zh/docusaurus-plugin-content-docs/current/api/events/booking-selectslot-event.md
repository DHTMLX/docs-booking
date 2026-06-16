---
sidebar_label: select-slot
title: select-slot 事件
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 select-slot 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 免费 30 天试用版。
---

# select-slot

### 描述 {#description}

@short: 选择时间段时触发

### 用法 {#usage}

~~~jsx {}
"select-slot": ({
    id: string | number,
    time:[ number, number ]
}) => void;
~~~

### 参数 {#parameters}

`select-slot` 事件的回调函数可接收一个包含以下参数的对象：

- `id` - （必填）所选时间段所属卡片的 ID
- `time` - （必填）一个数组，包含时间段的开始时间（毫秒）和时间段时长（分钟）（开始时间以毫秒为单位，表示本地挂钟时间）

### 示例 {#example}

~~~jsx {7-10}
// 创建 Booking
const widget = new booking.Booking("#root", {
    data,
    // 其他配置参数
});

// 输出所选时间段的 id
widget.api.on("select-slot", (obj) => {
    console.log(obj.id);
});
~~~
