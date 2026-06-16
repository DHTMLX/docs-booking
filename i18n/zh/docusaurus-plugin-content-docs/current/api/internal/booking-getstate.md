---
sidebar_label: api.getState()
title: getState() 方法
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 getState 方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# api.getState()

### 描述 {#description}

@short: 获取包含 Booking StateStore 属性的对象

### 用法 {#usage}

~~~jsx {}
api.getState(): object;
~~~

### 返回值 {#returns}

该方法返回一个包含以下状态字段的对象：

~~~jsx {}
{
    data: [], // 卡片对象数组
    cardShape: {}, // 卡片设置对象
    filteredData: [], // 过滤后的数据数组
    filterShape: {}, // 过滤器设置对象
    filterValues: {}, // 过滤器值对象（文本、日期、时间）
    formShape: [], // Booking 编辑器对话框设置的对象数组
    infoShape: {}, // Booking 编辑器左侧设置对象
    selectedItem: {}, // 单个数据项
    selectedSlot: {}, // 包含时间槽 id 和时间的对象（[时间戳, 持续时间（分钟）]）
    slotGap: number, // 时间槽间隔（分钟）
    slotSize: number, // 时间槽大小（分钟）
    start: Date, // 显示范围的开始日期
    end: Date, // 显示范围的结束日期
    renderType: "default" | "lazy" // 卡片渲染模式
}
~~~

### 示例 {#example}

~~~jsx {7-11}
// 创建 Booking
const widget = new booking.Booking("#root", {
    data,
    cardShape
});

// 获取 Booking 的状态并输出到控制台
const state = widget.api.getState();
console.log(state);
~~~
