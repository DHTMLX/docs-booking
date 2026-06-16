---
sidebar_label: 与 Scheduler 集成
title: 与 DHTMLX Scheduler 集成
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解与 DHTMLX Scheduler 的集成方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费评估版本。
---

# 与 DHTMLX Scheduler 集成 {#integration-with-dhtmlx-scheduler}

本指南介绍如何将 DHTMLX Booking 组件与 [DHTMLX Scheduler](https://docs.dhtmlx.com/scheduler/) 集成。该集成在服务器端将 Scheduler 事件转换为 Booking 时间槽。

## 了解核心概念 {#understand-the-main-concepts}

集成的核心在于将 Scheduler 事件转换为 Booking 时间槽。开始之前，请注意以下几点。

**Scheduler 事件与 Booking 时间槽。** Scheduler 处理事件，包括单次事件和循环事件。Booking 根据这些事件生成可用时间槽。[下方示例](#example) 通过在服务器端转换 JSON 数据，从医生的日程中生成预约时间槽。

**循环事件的限制。** Booking 仅支持每周循环事件，即 Scheduler 中定义为 `INTERVAL=1;FREQ=WEEKLY` 的事件。Scheduler 支持任意循环模式，因此请在 Scheduler 配置中限制其他循环选项。

**时区处理。** Booking 以本地时区解析时间戳。如果使用全局时间戳，请在发送给 Booking 之前将其转换为本地时区，并在保存前转换回 UTC。有关转换说明，请参阅[将 UTC 数据转换为本地时区](guides/saving-reservations.md#convert-utc-data-to-the-local-timezone)。

**Booking 时间槽策略。** 选择以下两种方式之一来构建日程：

- [`slots`](api/config/booking-data.md) 和 [`usedSlots`](api/config/booking-data.md) — 构建日程并排除已预约的时间槽（本文介绍此策略）
- [`availableSlots`](api/config/booking-data.md) — 显式列出可预约的时间槽，适用于无循环的事件

## 示例 {#example}

下方示例通过将医生日程转换为预约时间槽来实现 Booking 与 Scheduler 的集成。该集成使用四个数据端点：

- `/doctors/worktime` — Scheduler 数据（医生日程），包含循环事件和单次事件，是 Booking 时间槽的数据来源
- `/units` — 在服务器端根据 `worktime` 数据生成的最终 Booking 时间槽；参见[后端示例](https://github.com/DHTMLX/scheduler-booking-go)
- `/doctors/reservations` — 辅助集合，用于在时间轴视图中展示 `usedSlots`；保存来自 Booking 表单的已预约时间槽
- `/doctors` — 所有医生的姓名和 ID；同时为 Scheduler 和 Booking 组件提供医生信息

事件到时间槽的转换是集成的核心。[下一节](#convert-scheduler-events-to-booking-slots) 描述具体的转换规则。

<iframe src="https://snippet.dhtmlx.com/d5zbq3g3?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="800"></iframe>

## 将 Scheduler 事件转换为 Booking 时间槽 {#convert-scheduler-events-to-booking-slots}

以下规则介绍如何使用 JSON 数据从医生日程生成预约时间槽，转换在服务器端完成。所有示例均以 2025-03-13 至 2027-03-13 的下一周期日程为例。

### 规则 1：从单次事件创建时间槽 {#rule-1-create-a-slot-from-a-single-event}

对于每个单次事件，将开始时间和结束时间转换为 Booking 时间槽。在 `slots` 数组中添加一条记录，并在 `dates` 数组中包含事件日期。

以下代码片段展示一个单次 Scheduler 事件：

~~~json
{
   "doctor_id": 1,
   "start_date": "2025-03-18 02:00:00",
   "end_date": "2025-03-18 06:00:00"
}
~~~

以下代码片段展示转换后的 Booking 时间槽：

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

### 规则 2：转换循环事件 {#rule-2-convert-a-recurring-event}

将循环事件映射为每周模式。Scheduler 中循环事件的开始日期和结束日期必须与 Booking 的 [`start`](api/config/booking-start.md) 和 [`end`](api/config/booking-end.md) 日期一致。否则，需要为循环事件开始之前和之后的日期创建占位符（参见[规则 7](#rule-7-handle-events-that-start-after-the-booking-start-date)）。

以下代码片段展示一个每周工作日（周一至周五）重复的循环 Scheduler 事件：

~~~json
{
   "doctor_id": 1,
   "start_date": "2025-03-13 09:00:00",
   "end_date": "2027-03-13 00:00:00",
   "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
   "duration": 28800
}
~~~

Booking 将每周日程表示为单条规则，每个工作日的开始时间和结束时间相同。

以下代码片段展示转换后的 Booking 时间槽：

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

Booking 在单天内生成时间槽。如果一个事件跨越两天（例如从晚上 8 点开始，到凌晨 4 点结束），需将其拆分为两个时间槽，每天各一个。

例如，一位医生从周六晚上开始、持续到周日早上的班次，需拆分为两条规则：一条对应周六，一条对应周日。

以下代码片段展示跨天的 Scheduler 事件：

~~~json
{
   "doctor_id": 2,
   "start_date": "2025-03-13 20:00:00",
   "end_date": "2027-03-13 00:00:00",
   "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=SA",
   "duration": 28800
}
~~~

以下代码片段展示转换后的两个 Booking 时间槽，每天各一个：

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

### 规则 4：向循环日程添加单次事件 {#rule-4-add-a-single-event-to-a-recurring-schedule}

当单次事件扩展了循环日程时，需同时为两者生成时间槽。将单次事件的日期添加到循环规则的 `dates` 数组中。

本示例合并了两个 Scheduler 事件：

- 循环事件 — 医生在工作日上午 9 点至下午 5 点的可用时间
- 单次事件 — 3 月 18 日和 19 日凌晨 2 点至 6 点的额外可用时间

以下代码片段展示两个 Scheduler 事件：

~~~json
[
    // 循环事件
   {
     "doctor_id": 1,
     "start_date": "2025-03-13 09:00:00",
     "end_date": "2027-03-13 00:00:00",
     "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
     "duration": 28800
   },

   // 单次事件
   {
     "doctor_id": 1,
     "start_date": "2025-03-18 02:00:00",
     "end_date": "2025-03-18 06:00:00"
   },
   {
     "doctor_id": 1,
     "start_date": "2025-03-19 02:00:00",
     "end_date": "2025-03-19 06:00:00"
   }
]
~~~

Booking 将循环事件和单次事件合并为一条规则。单次事件的日期（3 月 18 日和 19 日）具有更高优先级，并加入循环规则的 `dates` 数组。有关优先级顺序，请参阅[定义时间槽规则](guides/configuration.md#define-slot-rules)。

以下代码片段展示合并后的 Booking 时间槽：

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

### 规则 5：修改循环事件的单个实例 {#rule-5-modify-a-single-instance-of-a-recurring-event}

当循环事件的某个实例发生变更（例如某天的时间调整）时，生成一个包含更新时间的新时间槽。将该日期添加到 `dates` 数组，它将覆盖该日期对应的 `days` 数组。

以下代码片段展示循环事件及其修改后的实例：

~~~json
[
   {
     "doctor_id": 1,
     "start_date": "2025-03-13 09:00:00",
     "end_date": "2027-03-13 00:00:00",
     "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
     "duration": 28800
   },
   {
     "doctor_id": 1,
     "start_date": "2025-03-14 03:00:00",
     "end_date": "2025-03-14 11:00:00",
     "recurring_event_id": "1",
     "original_start": "2025-03-14 09:00"
   }
]
~~~

以下代码片段展示循环规则以及针对修改日期的覆盖规则：

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

### 规则 6：删除循环事件的单个实例 {#rule-6-delete-a-single-instance-of-a-recurring-event}

当删除循环事件的某个实例时，需在 Booking 规则中体现该删除操作。为被删除的日期创建一条时间间隔为空的规则，并使用 `dates` 属性——其优先级高于 `days`。

以下代码片段展示循环事件及其已删除的实例：

~~~json
[
   {
     "doctor_id": 5,
     "start_date": "2025-03-14 09:00:00",
     "end_date": "2027-03-13 00:00:00",
     "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=TH,FR,SA,SU",
     "duration": 28800
   },
   {
     "doctor_id": 5,
     "start_date": "2025-03-23 09:00:00",
     "end_date": "2025-03-23 17:00:00",
     "recurring_event_id": "15",
     "original_start": "2025-03-23 09:00",
     "deleted": true
   }
]
~~~

以下代码片段展示循环规则以及用于移除已删除日期的空时间间隔：

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

如果循环事件的开始日期晚于 Booking 的开始日期（默认为今天，本示例中为 2025-03-13），则需为事件开始之前的日期创建空时间间隔规则，以从循环中移除这些日期。

以下代码片段展示一个在 Booking 开始日期四天后才开始的循环事件：

~~~json
{
    "doctor_id": 5,
    "start_date": "2025-03-17 09:00:00",
    "end_date": "2027-03-13 00:00:00",
    "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA",
    "duration": 28800
}
~~~

以下代码片段展示循环规则以及事件开始前四天的空时间间隔：

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
