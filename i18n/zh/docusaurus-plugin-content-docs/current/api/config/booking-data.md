---
sidebar_label: data
title: data
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 cards 配置项的相关内容。浏览开发指南和 API 参考文档，查看代码示例和在线演示，并下载 DHTMLX Booking 30 天免费评估版本。
---

# data

### 描述 {#description}

@short: 可选。包含卡片数据的对象数组

### 用法 {#usage}

~~~jsx {}
data: [
    {
        id: string | number,
        title: string,
        category?: string,
        subtitle?: string,
        details?: string,
        preview?: string, // 图片链接
        price?: string,
        review?: {
            stars: number,
            count: number
        },
        slots?: [
            {
                from: number | string, // 小时，取值范围 0 到 24
                to: number | string, // 小时，取值范围 0 到 24
                size?: number, // 时间槽时长，单位为分钟
                gap?: number, // 时间槽之间的间隔，单位为分钟
                days?: array, // 可应用该规则的星期几，取值范围 0 到 6
                dates?: array, // 可应用该规则的确切日期，时间戳
            }
        ],
        availableSlots?: [number, number][], // 每个时间槽：[时间戳, 时间槽时长（分钟）]
        usedSlots?: number[], // 时间戳
        slotSize?: number, // 分钟
        slotGap?: number // 分钟
    }
];
~~~

### 参数 {#parameters}

每个卡片对象可以指定以下参数：

- `id` - （必填）卡片的 ID
- `title` - （必填）卡片的标题（例如专家姓名）
- `category` - （可选）卡片的类别名称（例如专家的职位）
- `subtitle` - （可选）卡片的副标题
- `details` - （可选）卡片的其他详细信息
- `preview` - （可选）卡片预览图，即卡片图片的链接地址
- `price` - （可选）服务价格
- `review` - （可选）评分信息，包含以下参数：
  - `stars` - （可选）评分星数（满分五星）
  - `count` - （可选）评价数量
- `slots` - （可选）定义时间槽规则的对象数组（需提供 `slots` 或 `availableSlots` 之一，才能显示可预约时间）；每个时间槽对象包含以下参数：
  - `from` - （必填）时间槽开始时间，以小时为单位，取值范围 0 到 24
  - `to` - （必填）时间槽结束时间，以小时为单位，取值范围 0 到 24
  - `size` - （可选）单个时间槽的时长，单位为分钟
  - `gap` - （可选）时间槽之间的间隔，单位为分钟；默认值为 0
  - `days` - （可选）时间槽可供预约的星期几；可选值为 0 到 6，其中 0 表示周日，6 表示周六；若未指定 `days`，则默认应用于所有日期；若指定了 `days`，则为这些天定义的时间槽参数（`to`、`from`、`size`、`gap`）将生效
  - `dates` - （可选）以毫秒为单位的时间戳数组，表示时间槽可供预约的确切日期；这些指定日期将应用对应的时间槽参数（`to`、`from`、`size`、`gap`）（时间戳以毫秒为单位，应表示本地挂钟时间）

:::note
为特定星期几指定的时间槽参数将覆盖为所有日期定义的通用参数。
为特定日期指定的时间槽参数将覆盖为特定星期几及所有日期定义的参数。
如果多个时间槽对象针对同一天且 `size` 或 `gap` 不同，则其时间范围（`from`–`to`）不得重叠。范围重叠将导致组件跳过该天的所有时间槽。
:::

- `availableSlots` - （可选）可用时间槽数组；每个时间槽为 `[timestamp, duration]` 形式的数组，其中时间戳以毫秒为单位（表示本地挂钟时间），时长为时间槽的分钟数；若在此处指定了可用时间槽，则 `slots` 数组中的所有时间槽将被忽略（即变为不可用）
- `usedSlots` - （可选）已预约时间槽的时间戳数组，以毫秒为单位（时间戳以毫秒为单位，应表示本地挂钟时间）
- `slotSize` - （可选）时间槽的时长，单位为分钟；若 `slots` 对象内未设置其他值，该值将应用于此卡片的所有时间槽；默认值为 *60* 分钟
- `slotGap` - （可选）当前卡片所有时间槽之间的间隔，单位为分钟；若 `slots` 对象内未指定其他值，则应用此值；默认值为 0

### 示例 {#example}

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Debra Weeks",
        category: "Allergist",
        subtitle: "7 years of experience",
        details:
                "Silverstone Medical Center (Vanderbilt Avenue 13, Chestnut, New Zealand)",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                //适用于所有日期的通用时间槽规则，以下 days 和 dates 中指定的日期除外
                from: 14,
                to: 17,
                size: 30,
                gap: 10
            },
            {
                //该规则应用于星期二和星期五（days 2 和 5），
                //以下时间槽对象中指定的那个星期五除外
                from: 12,
                to: 17,
                size: 50,
                gap: 20,
                days: [2, 5]
            },
            {
                //该规则应用于星期三和星期四（days 3 和 4）以及确切日期
                from: 18,
                to: 20,
                size: 45,
                gap: 20,
                days: [3, 4],
                dates: [ 1683234000000 ] // 确切的即将到来的日期（2023 年 5 月 5 日，星期五）
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // 其他参数
});
~~~

**相关文章**：[定义时间槽规则](guides/configuration.md#define-slot-rules)
