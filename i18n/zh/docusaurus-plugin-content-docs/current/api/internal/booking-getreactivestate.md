---
sidebar_label: api.getReactiveState()
title: getReactiveState() 方法
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 getReactiveState 方法。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费评估版本。
---

# api.getReactiveState()

### 描述 {#description}

@short: 获取包含 Booking 响应式属性的对象

### 用法 {#usage}

~~~jsx {}
api.getReactiveState(): object;
~~~

### 返回值 {#returns}

该方法返回一个对象，其中每个字段都是一个响应式可写存储（`IPublicWritable`），包裹着对应的状态值。通过 `.subscribe(callback)` 订阅存储以响应其变化。底层值如下：

~~~jsx {}
{
    data: [], // 卡片对象数组
    cardShape: {}, // 卡片设置对象
    filteredData: [], // 过滤后的数据数组
    filterShape: {}, // 过滤器设置对象
    filterValues: {}, // 过滤器值对象（文本、日期、时间）
    formShape: [], // Booking 编辑器对话框设置对象数组
    infoShape: {}, // Booking 编辑器左侧设置对象
    selectedItem: {}, // 单个数据项
    selectedSlot: {}, // 包含时间段 id 和时间的对象（[时间戳, 时长（分钟）]）
    slotGap: number, // 时间段间隔（分钟）
    slotSize: number, // 时间段大小（分钟）
    start: Date, // 显示范围的开始日期
    end: Date, // 显示范围的结束日期
    renderType: "default" | "lazy" // 卡片渲染模式
}
~~~

### 示例 {#example}

~~~jsx {7-9,11-14}
// 创建 Booking
const widget = new booking.Booking("#root", {
    data,
    //other properties
});

// 获取 Booking 的响应式状态并输出到控制台
const state = widget.api.getReactiveState();
console.log(state);

// 订阅卡片变化并输出卡片数组
state.data.subscribe((data) => {
    console.log(data);
});
~~~
