---
sidebar_label: Обзор АПИ
title: Обзор АПИ
description: Вы можете ознакомиться с обзором АПИ JavaScript Booking в документации библиотеки DHTMLX JavaScript Booking. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# Обзор АПИ {#api-overview}

## Конструктор Booking {#booking-constructor}

~~~jsx {}
new booking.Booking("#root", {
    // начальные параметры конфигурации
});
~~~

**Параметры**:

- HTML-контейнер или его ID-селектор (`HTMLElement | string`)
- объект параметров конфигурации ([смотрите здесь](#booking-properties))

## Методы Booking {#booking-methods}

| Название                                               | Описание                                               |
| -------------------------------------------------- | --------------------------------------------------------- |
| [](api/methods/booking-serialize-method.md)         | @getshort(../methods/booking-serialize-method.md)         |
| [](api/methods/booking-setconfig-method.md)         | @getshort(../methods/booking-setconfig-method.md)         |
| [](api/methods/booking-setconfirmhandler-method.md) | @getshort(../methods/booking-setconfirmhandler-method.md) |
| [](api/methods/booking-setlocale-method.md)         | @getshort(../methods/booking-setlocale-method.md)         |

## Внутреннее АПИ Booking {#booking-internal-api}

### Методы Event Bus {#event-bus-methods}

| Название                                     | Описание                                     |
| ---------------------------------------- | ----------------------------------------------- |
| [](api/internal/booking-detach.md)    | @getshort(../internal/booking-detach.md)            |
| [](api/internal/booking-exec.md)      | @getshort(../internal/booking-exec.md)              |
| [](api/internal/booking-intercept.md) | @getshort(../internal/booking-intercept.md)         |
| [](api/internal/booking-on.md)        | @getshort(../internal/booking-on.md)                |
| [](api/internal/booking-setnext.md)   | @getshort(../internal/booking-setnext.md)           |

### Методы состояния {#state-methods}

| Название                                            | Описание                                            |
| ----------------------------------------------- | ------------------------------------------------------ |
| [](api/internal/booking-getreactivestate.md) | @getshort(../internal/booking-getreactivestate.md) |
| [](api/internal/booking-getstate.md)         | @getshort(../internal/booking-getstate.md)         |

## События Booking {#booking-events}

| Название                                      | Описание                                      |
| ----------------------------------------- | ------------------------------------------------ |
| [](api/events/booking-confirmslot-event.md)  | @getshort(../events/booking-confirmslot-event.md)  |
| [](api/events/booking-filterdata-event.md)  | @getshort(../events/booking-filterdata-event.md)    |
| [](api/events/booking-selectitem-event.md)  | @getshort(../events/booking-selectitem-event.md)    |
| [](api/events/booking-selectitemdate-event.md)  | @getshort(../events/booking-selectitemdate-event.md) |
| [](api/events/booking-selectslot-event.md)   | @getshort(../events/booking-selectslot-event.md)   |

## Свойства Booking {#booking-properties}

| Название                                  | Описание                                        |
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
