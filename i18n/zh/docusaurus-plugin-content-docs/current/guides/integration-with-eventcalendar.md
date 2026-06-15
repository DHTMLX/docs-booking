---
sidebar_label: 与 Event Calendar 的集成
title: 与 DHTMLX Event Calendar 的集成
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解与 DHTMLX Event Calendar 集成的相关内容。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载免费 30 天评估版本的 DHTMLX Booking。
---

# 与 DHTMLX Event Calendar 的集成 {#integration-with-dhtmlx-event-calendar}

本指南介绍如何将 DHTMLX Booking 组件与 [DHTMLX Event Calendar](https://docs.dhtmlx.com/eventcalendar/) 进行集成。该集成在服务端将 Event Calendar 的事件转换为 Booking 的时间槽。

## 了解核心概念 {#understand-the-main-concepts}

集成的核心在于将 Event Calendar 的事件转换为 Booking 的时间槽。在开始之前，请注意以下几点。

**Event Calendar 事件与 Booking 时间槽。** Event Calendar 负责管理事件，包括单次事件和重复事件。Booking 则根据这些事件生成可用的时间槽。[下方示例](#example)通过在服务端转换 JSON 数据，从医生的日程安排中生成预约时间槽。

**重复事件的限制。** Booking 仅支持每周重复的事件，在 Event Calendar 中定义为 `FREQ=WEEKLY;INTERVAL=1`。Event Calendar 支持任意重复模式，因此请在 Event Calendar 表单中隐藏其他重复选项。

**时区处理。** Booking 以本地时区解释时间戳。如果您使用全局时间戳，请在发送给 Booking 之前将其转换为本地时区，并在保存之前转换回 UTC。有关转换说明，请参阅[将 UTC 数据转换为本地时区](guides/saving-reservations.md#convert-utc-data-to-the-local-timezone)。

**Booking 时间槽策略。** 选择以下两种方式之一来构建日程安排：

- [`slots`](api/config/booking-data.md) 和 [`usedSlots`](api/config/booking-data.md) — 构建日程安排并排除已预约的时间槽（本文介绍此策略）
- [`availableSlots`](api/config/booking-data.md) — 显式列出可预约的时间槽，适用于无重复事件的场景

## 示例 {#example}

以下示例通过将医生的日程安排转换为预约时间槽，实现 Booking 与 Event Calendar 的集成。该集成使用四个数据端点：

- `/events` — Event Calendar 数据（医生日程安排），包含重复事件和单次事件；作为 Booking 时间槽的数据源
- `/units` — 服务端根据 `/events` 数据生成的最终 Booking 时间槽；参见[后端示例](https://github.com/DHTMLX/event-calendar-booking-go)
- `/calendars` — 医生的日历；向 Event Calendar 和 Booking 组件提供医生信息
- `/reservations` — 辅助集合，在时间轴视图中展示 `usedSlots`；保存来自 Booking 表单的已预约时间槽

事件到时间槽的转换是集成的核心。[下一节](#convert-events-to-booking-slots)描述了具体的转换规则。

<iframe src="https://snippet.dhtmlx.com/c5eu8pdk?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="800"></iframe>

## 将事件转换为 Booking 时间槽 {#convert-events-to-booking-slots}

以下规则介绍如何使用 JSON 数据（在服务端转换）从医生的日程安排中生成预约时间槽。所有示例均以 2025-03-13 至 2027-03-13 的下一阶段日程为基准。

### 规则 1：从单次事件创建时间槽 {#rule-1-create-a-slot-from-a-single-event}

对于每个单次事件，将其开始时间和结束时间转换为 Booking 时间槽。在 `slots` 数组中添加一条记录，并将事件日期包含在 `dates` 数组中。

以下代码片段展示了一个单次 Event Calendar 事件：

~~~json
{
  "type": 1, // type 为日历 id
  "start_date": "2025-03-18T02:00:00Z", // 假设日期为 UTC 时间
  "end_date": "2025-03-18T06:00:00Z"
}
~~~

以下代码片段展示了转换后的 Booking 时间槽：

~~~json
{
   "id": 1,
   "slotSize": 20,
   "slotGap": 5,
   "slots": [
     {
       "from": "02:00",
       "to": "06:00",
       "dates": [
         1742256000000 // 2025-03-18 00:00:00（时间戳）
       ]
     }
   ]
}
~~~

### 规则 2：转换重复事件 {#rule-2-convert-a-recurring-event}

将重复事件映射为每周重复模式。Event Calendar 中重复事件的开始和结束日期必须与 Booking 的 [`start`](api/config/booking-start.md) 和 [`end`](api/config/booking-end.md) 日期相同。否则，需要为重复事件开始前和结束后的日期创建占位记录（参见[规则 7](#rule-7-handle-events-that-start-after-the-booking-start-date)）。

以下代码片段展示了一个每周在工作日（周一至周五）重复的 Event Calendar 事件：

~~~json
{
  "type": 1,
  "start_date": "2025-03-13T09:00:00Z",
  "end_date": "2025-03-13T17:00:00Z",
  "recurring": true,
  "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;UNTIL=2027-03-13T23:59:59",
  "STDATE": "2025-03-13T09:00:00Z",
  "DTEND": "2027-03-13T00:00:00Z"
}
~~~

Booking 将每周日程表示为一条规则，每个工作日的开始和结束时间相同。

以下代码片段展示了转换后的 Booking 时间槽：

~~~json
{
   "id": 1,
   "slotSize": 20,
   "slotGap": 5,
   "slots": [
     {
       "from": "09:00",
       "to": "17:00",
       "days": [1, 2, 3, 4, 5] // 周一至周五
     }
   ]
}
~~~

### 规则 3：拆分跨天事件 {#rule-3-split-an-event-that-spans-multiple-days}

Booking 在单天内生成时间槽。如果一个事件跨越两天（例如，从晚上 8 点开始，到凌晨 4 点结束），则需将其拆分为两个时间槽，每天一个。

例如，一位医生从周六晚上开始、持续到周日早晨的班次，需拆分为两条规则：一条对应周六，一条对应周日。

以下代码片段展示了跨天的 Event Calendar 事件：

~~~json
{
  "type": 2,
  "start_date": "2025-03-13T20:00:00Z",
  "end_date": "2025-03-14T04:00:00Z",
  "recurring": true,
  "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SA;UNTIL=2027-03-13T23:59:59",
  "STDATE": "2025-03-13T20:00:00Z",
  "DTEND": "2027-03-13T00:00:00Z"
}
~~~

以下代码片段展示了转换后的两个 Booking 时间槽，每天一个：

~~~json
{
   "id": 2,
   "slotSize": 45,
   "slotGap": 5,
   "slots": [
     {
       "from": "20:00",
       "to": "24:10",
       "days": [6] // 周六
     },
     {
       "from": "00:10",
       "to": "04:00",
       "days": [0] // 周日
     }
   ]
}
~~~

### 规则 4：在重复日程中添加单次事件 {#rule-4-add-a-single-event-to-a-recurring-schedule}

当单次事件对重复日程进行扩展时，需同时为两者生成时间槽。将单次事件的日期添加到重复规则的 `dates` 数组中。

本示例组合了两个 Event Calendar 事件：

- 重复事件 — 医生在工作日上午 9:00 至下午 5:00 的可用时间
- 单次事件 — 3 月 18 日和 19 日凌晨 2:00 至 6:00 的额外可用时间

以下代码片段展示了两个 Event Calendar 事件：

~~~json
[
  // 重复事件
  {
    "type": 1,
    "start_date": "2025-03-13T09:00:00Z",
    "end_date": "2025-03-13T17:00:00Z",
    "recurring": true,
    "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;UNTIL=2027-03-13T23:59:59",
    "STDATE": "2025-03-13T09:00:00Z",
    "DTEND": "2027-03-13T00:00:00Z"
  },
  // 单次事件
  {
    "type": 1,
    "start_date": "2025-03-18T02:00:00Z",
    "end_date": "2025-03-18T06:00:00Z"
  },
  {
    "type": 1,
    "start_date": "2025-03-19T02:00:00Z",
    "end_date": "2025-03-19T06:00:00Z"
  }
]
~~~

Booking 将重复事件和单次事件合并为一条规则。单次事件的日期（3 月 18 日和 19 日）具有更高优先级，并加入重复规则的 `dates` 数组。有关优先级顺序，请参阅[定义时间槽规则](guides/configuration.md#define-slot-rules)。

以下代码片段展示了合并后的 Booking 时间槽：

~~~json
{
   "id": 1,
   "slotSize": 20,
   "slotGap": 20,
   "slots": [
     {
       "from": "02:00",
       "to": "06:00",
       "dates": [
         1742256000000, // 2025-03-18 00:00:00
         1742342400000  // 2025-03-19 00:00:00
       ]
     },
     {
       "from": "09:00",
       "to": "17:00",
       "days": [1, 2, 3, 4, 5],
       "dates": [
         1742256000000, // 2025-03-18 00:00:00
         1742342400000  // 2025-03-19 00:00:00
       ]
     }
   ]
}
~~~

### 规则 5：修改重复事件的单个实例 {#rule-5-modify-a-single-instance-of-a-recurring-event}

当重复事件的某个实例发生变更（例如，某天的时间发生偏移）时，生成一个包含更新时间的新时间槽。将该日期添加到 `dates` 数组中，它将覆盖该日期对应的 `days` 数组规则。

以下代码片段展示了重复事件及其修改后的实例：

~~~json
[
  {
    "type": 1,
    "start_date": "2025-03-13T09:00:00Z",
    "end_date": "2025-03-13T17:00:00Z",
    "recurring": true,
    "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;UNTIL=2027-03-13T23:59:59",
    "STDATE": "2025-03-13T09:00:00Z",
    "DTEND": "2027-03-13T00:00:00Z"
  },
  {
    "type": 1,
    "start_date": "2025-03-14T03:00:00Z",
    "end_date": "2025-03-14T11:00:00Z",
    "recurring": false,
    "recurringEventId": 1,
    "originalStartTime": "2025-03-14T09:00:00Z"
  },
]
~~~

以下代码片段展示了重复规则以及针对修改日期的覆盖规则：

~~~json
{
   "id": 1,
   "slotSize": 20,
   "slotGap": 5,
   "slots": [
     {
       "from": "09:00",
       "to": "17:00",
       "days": [1, 2, 3, 4, 5]
     },
     {
       "from": "03:00",
       "to": "11:00",
       "dates": [
         1741910400000 // 2025-03-14 03:00:00（已修改）
       ]
     }
   ]
}
~~~

### 规则 6：删除重复事件的单个实例 {#rule-6-delete-a-single-instance-of-a-recurring-event}

当从重复事件中移除某个单次实例时，需在 Booking 规则中反映该变更。为被删除的日期创建一条时间间隔为空的规则，并使用 `dates` 属性（其优先级高于 `days`）。

以下代码片段展示了重复事件及其被取消的实例：

~~~json
[
  {
    "type": 5,
    "start_date": "2025-03-14T09:00:00Z",
    "end_date": "2025-03-14T17:00:00Z",
    "recurring": true,
    "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=TH,FR,SA,SU;UNTIL=2027-03-13T23:59:59",
    "STDATE": "2025-03-14T09:00:00Z",
    "DTEND": "2027-03-13T00:00:00Z"
  },
  {
    "type": 5,
    "recurring": false,
    "recurringEventId": 15,
    "originalStartTime": "2025-03-23T09:00:00Z",
    "status": "cancelled"
  }
]
~~~

以下代码片段展示了重复规则以及用于移除被取消日期的空时间间隔：

~~~json
{
    "id": 5,
    "slotSize":60,
    "slotGap":10,
    "slots":[
        {
            "from": "09:00",
            "to": "17:00",
            "days": [4, 5, 6, 0] // 周四至周日
        },
        {
            "from": "00:00",
            "to": "00:00",
            "dates": [
                1742688000000 // 2025-03-23 00:00:00（已删除的实例）
            ]
        }
    ]
}
~~~

### 规则 7：处理在 Booking 开始日期之后才开始的事件 {#rule-7-handle-events-that-start-after-the-booking-start-date}

如果某个重复事件的开始日期晚于 Booking 的开始日期（默认为今天，在这些示例中为 2025-03-13），则需为该事件开始前的日期创建时间间隔为空的规则，以将这些日期从重复序列中排除。

以下代码片段展示了一个在 Booking 开始日期四天后才开始的重复事件：

~~~json
{
  "type": 5,
  "start_date": "2025-03-17T09:00:00Z",
  "end_date": "2025-03-17T17:00:00Z",
  "recurring": true,
  "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SU,MO,TU,WE,TH,FR,SA;UNTIL=2027-03-13T23:59:59",
  "STDATE": "2025-03-17T09:00:00Z",
  "DTEND": "2027-03-13T00:00:00Z"
}
~~~

以下代码片段展示了重复规则以及事件开始前四天对应的空时间间隔：

~~~json
{
    "id": 5,
    "slotSize":60,
    "slotGap":10,
    "slots": [
        { "from": "09:00", "to": "17:00", "days": [0, 1, 2, 3, 4, 5, 6] },
        { "from": "00:00", "to": "00:00", "dates": [
            1741820400000,  // 2025 年 3 月 13 日
            1741906800000,  // 2025 年 3 月 14 日
            1741993200000,  // 2025 年 3 月 15 日
            1742079600000   // 2025 年 3 月 16 日
        ]}
    ]
}
~~~
