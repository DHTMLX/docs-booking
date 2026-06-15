---
sidebar_label: setConfig()
title: setConfig() 方法
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 setConfig() 方法。浏览开发指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# setConfig()

### 描述 {#description}

@short: 更新 Booking widget 的当前配置

该方法用于更新 Booking widget 的当前配置，适用于需要更新 widget 底层数据集的场景。

### 用法 {#usage}

~~~jsx
setConfig(config: object): void;
~~~

### 参数 {#parameters}

- `config` - （必填）Booking 配置对象。完整属性列表请参见[此处](api/overview/booking-properties-overview.md)

:::info
该方法在顶层执行浅合并：您传入的每个属性都会完全替换现有属性——`cardShape` 或 `filterShape` 等嵌套对象不会进行深度合并。若要保留嵌套对象中先前设置的值，需要重新传入完整的对象。该方法随后会销毁当前组件并初始化一个新的组件。
:::

### 示例 {#example}

~~~jsx {}
// 创建 Booking
const widget = new booking.Booking("#root", {
    data,
    cardShape: {
        review: false,
        subtitle: false,
        details: false
    },
    filterShape: {
        date: false,
        autoApply: true,
        time: [
            { from: 8, to: 11, label: "Morning" },
            { from: 12, to: 16, label: "Afternoon" },
            { from: 17, to: 20, label: "Evening" }
        ]
    }
});

// 更新配置参数
widget.setConfig({
    cardShape: {
        review: true
    },
    filterShape: {
        date: true,
        autoApply: false,
        time: [
            { from: 9, to: 11, label: "Morning" },
            { from: 13, to: 17, label: "Afternoon" },
            { from: 18, to: 20, label: "Evening" }
        ]
    }
});
~~~

以下代码片段演示了如何加载已过滤的数据：

<iframe src="https://snippet.dhtmlx.com/f77ytme5?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
