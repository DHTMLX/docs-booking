---
sidebar_label: filter-data
title: filter-data 事件
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 filter-data 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费试用版本。
---

# filter-data

### 描述 {#description}

@short: 当过滤器被应用时触发

### 用法 {#usage}

~~~jsx {}
"filter-data": ({
    text: string,
    date:{
        start: Date | null,
        end: Date | null
    },
    time:[{
        from: number | string,
        to: number | string,
        label?: string
    }]
 }) => void;
~~~

### 参数 {#parameters}

`filter-data` 事件的回调函数可接收一个包含以下参数的对象：

- `text` - （可选）搜索字段中的文本
- `date` - （可选）包含时间段开始和结束日期的对象：
    - `start` - 时间段开始日期（`Date | null`）
    - `end` - 时间段结束日期（`Date | null`）
- `time` - （可选）包含时间段时间选项的对象数组。每个对象可指定以下参数：
    - `from` - （必填）时间段的开始时间；可以是 0 到 24 之间的数字（表示小时，例如 9 表示 9:00，8.5 表示 8:30），或格式为 "h:m" 的字符串（例如 "8:30"）
    - `to` - （必填）时间段的结束时间；可以是 0 到 24 之间的数字（表示小时，例如 9 表示 9:00，8.5 表示 8:30），或格式为 "h:m" 的字符串（例如 "8:30"）
    - `label` - （可选）时间范围的占位文本

### 示例 {#example}

以下示例演示如何在初始化时使用 [`api.exec()`](api/internal/booking-exec.md) 方法应用过滤器：

~~~jsx {6-18}
// 创建 Booking
const widget = new booking.Booking("#root", {
    data,
    // 其他配置参数
});
widget.api.exec("filter-data", {
    text: "Allergist",
    date: {
        start: new Date,
        end: new Date(2025, 4, 10)
    },
    time: [
        {
            from: 12,
            to: 20
        }
    ]
});
~~~
