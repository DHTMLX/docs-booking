---
sidebar_label: filterShape
title: filterShape
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 filterShape 配置项。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费评估版本。
---

# filterShape

### 描述 {#description}

@short: 可选。用于管理筛选功能的配置对象

### 用法 {#usage}

~~~jsx {}
filterShape: {
    text?: boolean | [{
        id: string,
        label?: string,
        suggest?: boolean
    }],
    date?: boolean,
    time?: boolean | [{
        from: number | string,
        to: number | string,
        label?: string
    }],
    autoApply?: boolean
};
~~~

### 参数 {#parameters}

- `text` - （可选）若为 `true`，则显示文本输入框（默认值）；若为 `false`，则隐藏文本输入框
  - `id` - （必填）用于筛选的卡片字段名称（即 `data` 中的属性，例如 `category` 或 `title`）
  - `suggest` - （可选）若为 `true`，则启用自动补全功能，将显示与用户输入文本匹配的值（来自 [`data`](api/config/booking-data.md) 对象）
  - `label` - （可选）`data` 对象中该属性的标签。请参见下方的[默认配置](#default-config)。
- `date` - （可选）显示或隐藏日期字段；默认值为 `true`（字段显示）
- `time` - （可选）显示或隐藏时间字段。若设置为 `true`，则接受一个包含默认时间段选项的对象数组。每个对象可指定以下参数：
  - `from` - （必填）时间段的开始时间；可以是 0 到 24 之间的数字，表示小时数（例如，9 表示 9:00，8.5 表示 8:30），也可以是 "h:m" 格式的字符串（例如 "8:30"）
  - `to` - （必填）时间段的结束时间；可以是 0 到 24 之间的数字，表示小时数（例如，9 表示 9:00，8.5 表示 8:30），也可以是 "h:m" 格式的字符串（例如 "8:30"）
  - `label` - （可选）时间字段的占位文本
若未设置 `time` 参数，则应用默认值：请参见下方的[默认配置](#default-config)。
- `autoApply` - （可选）若为 `true`，则自动应用搜索条件（无需点击按钮发起搜索）；默认值为 `false`

### 默认配置 {#default-config}

~~~jsx {}
const defaultTimeRanges = [
    { from: 8, to: 12, label: "Morning" },
    { from: 12, to: 17, label: "Afternoon" },
    { from: 17, to: 20, label: "Evening" }
];

const defaultFilterShape = {
    text: [
        { id: "category", label: "speciality", suggest: true },
        { id: "title", label: "specialist", suggest: true },
        { id: "details", label: "location" }
    ],
    date: true,
    time: defaultTimeRanges,
    autoApply: false
};
~~~

### 示例 {#example}

~~~jsx {}
const filterShape = {
    date: false,
    autoApply: true,
    time: [
        { from: 8, to: 11, label: "Morning" },
        { from: 12, to: 18, label: "Afternoon" },
        { from: 18, to: 21, label: "Evening" }
    ]
};

new booking.Booking("#root", {
    data,
    filterShape,
    // other parameters
});
~~~

以下代码片段演示了如何配置筛选器：

<iframe src="https://snippet.dhtmlx.com/b5uj78bs?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
