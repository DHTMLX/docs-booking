---
sidebar_label: API overview
title: API Overview
description: You can have an API overview of JavaScript Booking in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# API overview

## Booking constructor

~~~jsx {}
new booking.Booking("#root", {
    // initial configuration parameters
});
~~~

**Parameters**:

- an HTML container (the ID of the HTML container)
- an object of the configuration parameters ([check here](#booking-properties))

## Booking methods

| Name                                               | Description                                               |
| -------------------------------------------------- | --------------------------------------------------------- |
| [serialize()](/api/methods/booking-serialize-method/)  | @getshort(../methods/booking-serialize-method.md)         |
| [setConfig()](/api/methods/booking-setconfig-method/)  | @getshort(../methods/booking-setconfig-method.md)         |
| [setConfirmHandler()](/api/methods/booking-setconfirmhandler-method/) | @getshort(../methods/booking-setconfirmhandler-method.md) |
| [setLocale()](/api/methods/booking-setlocale-method/)  | @getshort(../methods/booking-setlocale-method.md)         |

## Booking internal API

### Event Bus methods

| Name                                     | Description                                     |
| ---------------------------------------- | ----------------------------------------------- |
| [api.detach()](/api/internal/booking-detach/)    | @getshort(../internal/booking-detach.md)            |
| [api.exec()](/api/internal/booking-exec/)      | @getshort(../internal/booking-exec.md)              |
| [api.intercept()](/api/internal/booking-intercept/) | @getshort(../internal/booking-intercept.md)         |
| [api.on()](/api/internal/booking-on/)        | @getshort(../internal/booking-on.md)                |
| [api.setNext()](/api/internal/booking-setnext/)   | @getshort(../internal/booking-setnext.md)           |

### State methods

| Name                                            | Description                                            |
| ----------------------------------------------- | ------------------------------------------------------ |
| [api.getReactiveState()](/api/internal/booking-getreactivestate/) | @getshort(../internal/booking-getreactivestate.md) |
| [api.getState()](/api/internal/booking-getstate/)         | @getshort(../internal/booking-getstate.md)         |

## Booking events

| Name                                      | Description                                      |
| ----------------------------------------- | ------------------------------------------------ |
| [confirm-slot](/api/events/booking-confirmslot-event/)  | @getshort(../events/booking-confirmslot-event.md)  |
| [filter-data](/api/events/booking-filterdata-event/)  | @getshort(../events/booking-filterdata-event.md)    |
| [select-item](/api/events/booking-selectitem-event/)  | @getshort(../events/booking-selectitem-event.md)    |
| [select-item-date](/api/events/booking-selectitemdate-event/)  | @getshort(../events/booking-selectitemdate-event.md) |
| [select-slot](/api/events/booking-selectslot-event/)   | @getshort(../events/booking-selectslot-event.md)   |

## Booking properties

| Name                                  | Description                                        |
| ------------------------------------- | -------------------------------------------------- |
| [data](/api/config/booking-data/)         | @getshort(../config/booking-data.md)               |
| [end](/api/config/booking-end/)          | @getshort(../config/booking-end.md)                |
| [cardShape](/api/config/booking-cardshape/)    | @getshort(../config/booking-cardshape.md)          |
| [cardTemplate](/api/config/booking-cardtemplate/) | @getshort(../config/booking-cardtemplate.md)       |
| [filterShape](/api/config/booking-filtershape/)  | @getshort(../config/booking-filtershape.md)        |
| [formShape](/api/config/booking-formshape/)    | @getshort(../config/booking-formshape.md)          |
| [infoShape](/api/config/booking-infoshape/)    | @getshort(../config/booking-infoshape.md)          |
| [infoTemplate](/api/config/booking-infotemplate/) | @getshort(../config/booking-infotemplate.md)       |
| [locale](/api/config/booking-locale/)       | @getshort(../config/booking-locale.md)             |
| [renderType](/api/config/booking-rendertype/)   | @getshort(../config/booking-rendertype.md)         |
| [slotGap](/api/config/booking-slotgap/)      | @getshort(../config/booking-slotgap.md)            |
| [slotSize](/api/config/booking-slotsize/)     | @getshort(../config/booking-slotsize.md)           |
| [start](/api/config/booking-start/)        | @getshort(../config/booking-start.md)              |
