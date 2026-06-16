---
sidebar_label: Booking 概述
title: JavaScript Booking 概述
slug: /
description: 您可以在本文档中了解 DHTMLX JavaScript Booking 库的概述。浏览开发者指南和 API 参考，尝试代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# DHTMLX Booking 概述

## 概述 {#overview}

JavaScript Booking 库是一个现成的组件，专为轻松集成到您的应用程序中而设计。它为终端用户提供了在线预约功能和丰富的筛选选项。该 widget 具有响应式设计，并针对移动设备进行了优化。

## Booking 结构 {#booking-structure}

Booking UI 由两个主要部分组成：筛选区域和带时间段的卡片列表。每张卡片的视图由卡片信息区块和可供预约的时间段组成。

![DHTMLX Booking 小部件，包含筛选区域和带可用时间槽的卡片列表](/img/main.png)

### 卡片列表 {#cards-list}

所有卡片以列表形式显示。列表中每张卡片的左侧显示以下信息项：

- preview：卡片图片
- review：评分信息，包含星级数量（满分五星）和评价数量
- category：卡片的类别名称（例如，专家的职位）
- title：卡片的标题（例如，专家的姓名）
- subtitle：卡片的副标题（例如，经验详情）
- price：服务价格
- details：卡片的其他详情

### 时间段 {#slots}

每张卡片的右侧显示可点击的可预约时间段。时间段从当前日期或筛选中选定的开始日期起，显示未来六天的可用时段（在窄屏幕上显示四天）。

### 单张卡片视图 {#a-single-card-view}

要打开单张卡片的视图，请点击卡片左侧区域。单张卡片对话框显示卡片的标题、日历以及在日历中所选日期的可用时间段。

![DHTMLX Booking 中单张卡片的对话框，包含日历和可用时间槽](/img/single-card.png)

### 预约对话框 {#booking-dialog}

预约对话框允许预约所选卡片的时间段。点击时间段按钮即可打开该对话框。

![用于预约所选时间槽的 DHTMLX Booking 对话框](/img/bookingd.png)

有关预约的操作说明，请参阅[预约操作](#making-an-appointment)。

## 筛选数据 {#filtering-data}

要按不同文本字段、日期和时间筛选卡片，用户需在输入框中填写所需值，然后点击**搜索**按钮。默认情况下，用户可以按类别和标题筛选卡片。以下默认时间范围可用于筛选：

- from: 8，to: 12（上午）
- from: 12，to: 17（下午）
- from: 17，to: 20（傍晚）

可通过 API 配置筛选设置：[配置筛选器](guides/configuration.md#configure-the-filter)

## 预约操作 {#making-an-appointment}

要安排预约，请点击所需卡片的时间段按钮，在**预约**对话框中填写相关字段，然后点击**立即预约**。

您也可以通过单张卡片视图进行预约：

1. 点击卡片的左侧区域。
2. 在打开的单张卡片视图中，选择所需的日期和时间。
3. 在所选时间旁边，点击**确认**。
4. 在弹出的**预约**对话框中，填写相关字段，然后点击**立即预约**。

![DHTMLX Booking 对话框中已填写的预约表单](/img/booking-2.png)

## 下一步 {#whats-next}

现在您可以[开始在页面上创建一个简单的 Booking widget](how-to-start.md)。
