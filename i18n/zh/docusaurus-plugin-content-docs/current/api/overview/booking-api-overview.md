---
sidebar_label: API 概览
title: API 概览
description: 您可以在 DHTMLX JavaScript Booking 库的文档中查阅 JavaScript Booking 的 API 概览。浏览开发者指南和 API 参考，尝试代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# API 概览 {#api-overview}

## Booking 构造函数 {#booking-constructor}

~~~jsx {}
new booking.Booking("#root", {
    // 初始配置参数
});
~~~

**参数**：

- HTML 容器或其 ID 选择器（`HTMLElement | string`）
- 配置参数对象（[查看详情](#booking-properties)）

## Booking 方法 {#booking-methods}

| 名称                                               | 描述                                               |
| -------------------------------------------------- | --------------------------------------------------------- |
| [](api/methods/booking-serialize-method.md)         | @getshort(../methods/booking-serialize-method.md)         |
| [](api/methods/booking-setconfig-method.md)         | @getshort(../methods/booking-setconfig-method.md)         |
| [](api/methods/booking-setconfirmhandler-method.md) | @getshort(../methods/booking-setconfirmhandler-method.md) |
| [](api/methods/booking-setlocale-method.md)         | @getshort(../methods/booking-setlocale-method.md)         |

## Booking 内部 API {#booking-internal-api}

### Event Bus 方法 {#event-bus-methods}

| 名称                                     | 描述                                     |
| ---------------------------------------- | ----------------------------------------------- |
| [](api/internal/booking-detach.md)    | @getshort(../internal/booking-detach.md)            |
| [](api/internal/booking-exec.md)      | @getshort(../internal/booking-exec.md)              |
| [](api/internal/booking-intercept.md) | @getshort(../internal/booking-intercept.md)         |
| [](api/internal/booking-on.md)        | @getshort(../internal/booking-on.md)                |
| [](api/internal/booking-setnext.md)   | @getshort(../internal/booking-setnext.md)           |

### State 方法 {#state-methods}

| 名称                                            | 描述                                            |
| ----------------------------------------------- | ------------------------------------------------------ |
| [](api/internal/booking-getreactivestate.md) | @getshort(../internal/booking-getreactivestate.md) |
| [](api/internal/booking-getstate.md)         | @getshort(../internal/booking-getstate.md)         |

## Booking 事件 {#booking-events}

| 名称                                      | 描述                                      |
| ----------------------------------------- | ------------------------------------------------ |
| [](api/events/booking-confirmslot-event.md)  | @getshort(../events/booking-confirmslot-event.md)  |
| [](api/events/booking-filterdata-event.md)  | @getshort(../events/booking-filterdata-event.md)    |
| [](api/events/booking-selectitem-event.md)  | @getshort(../events/booking-selectitem-event.md)    |
| [](api/events/booking-selectitemdate-event.md)  | @getshort(../events/booking-selectitemdate-event.md) |
| [](api/events/booking-selectslot-event.md)   | @getshort(../events/booking-selectslot-event.md)   |

## Booking 属性 {#booking-properties}

| 名称                                  | 描述                                        |
| ------------------------------------- | -------------------------------------------------- |
| [](api/config/booking-data.md)         | @getshort(../config/booking-data.md)               |
| [](api/config/booking-end.md)          | @getshort(../config/booking-end.md)                |
| [](api/config/booking-cardshape.md)    | @getshort(../config/booking-cardshape.md)          |
| [](api/config/booking-cardtemplate.md) | @getshort(../config/booking-cardtemplate.md)       |
| [](api/config/booking-filtershape.md)  | @getshort(../config/booking-filtershape.md)        |
| [](api/config/booking-formshape.md)    | @getshort(../config/booking-formshape.md)          |
| [](api/config/booking-infoshape.md)    | @getshort(../config/booking-infoshape.md)          |
| [](api/config/booking-infotemplate.md) | @getshort(../config/booking-infotemplate.md)       |
| [](api/config/booking-locale.md)       | @getshort(../config/booking-locale.md)             |
| [](api/config/booking-rendertype.md)   | @getshort(../config/booking-rendertype.md)         |
| [](api/config/booking-slotgap.md)      | @getshort(../config/booking-slotgap.md)            |
| [](api/config/booking-slotsize.md)     | @getshort(../config/booking-slotsize.md)           |
| [](api/config/booking-start.md)        | @getshort(../config/booking-start.md)              |
