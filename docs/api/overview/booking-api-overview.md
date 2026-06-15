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

- an HTML container or its ID selector (`HTMLElement | string`)
- an object of the configuration parameters ([check here](#booking-properties))

## Booking methods

| Name                                               | Description                                               |
| -------------------------------------------------- | --------------------------------------------------------- |
| [](api/methods/booking-serialize-method.md)         | @getshort(../methods/booking-serialize-method.md)         |
| [](api/methods/booking-setconfig-method.md)         | @getshort(../methods/booking-setconfig-method.md)         |
| [](api/methods/booking-setconfirmhandler-method.md) | @getshort(../methods/booking-setconfirmhandler-method.md) |
| [](api/methods/booking-setlocale-method.md)         | @getshort(../methods/booking-setlocale-method.md)         |

## Booking internal API

### Event Bus methods

| Name                                     | Description                                     |
| ---------------------------------------- | ----------------------------------------------- |
| [](api/internal/booking-detach.md)    | @getshort(../internal/booking-detach.md)            |
| [](api/internal/booking-exec.md)      | @getshort(../internal/booking-exec.md)              |
| [](api/internal/booking-intercept.md) | @getshort(../internal/booking-intercept.md)         |
| [](api/internal/booking-on.md)        | @getshort(../internal/booking-on.md)                |
| [](api/internal/booking-setnext.md)   | @getshort(../internal/booking-setnext.md)           |

### State methods

| Name                                            | Description                                            |
| ----------------------------------------------- | ------------------------------------------------------ |
| [](api/internal/booking-getreactivestate.md) | @getshort(../internal/booking-getreactivestate.md) |
| [](api/internal/booking-getstate.md)         | @getshort(../internal/booking-getstate.md)         |

## Booking events

| Name                                      | Description                                      |
| ----------------------------------------- | ------------------------------------------------ |
| [](api/events/booking-confirmslot-event.md)  | @getshort(../events/booking-confirmslot-event.md)  |
| [](api/events/booking-filterdata-event.md)  | @getshort(../events/booking-filterdata-event.md)    |
| [](api/events/booking-selectitem-event.md)  | @getshort(../events/booking-selectitem-event.md)    |
| [](api/events/booking-selectitemdate-event.md)  | @getshort(../events/booking-selectitemdate-event.md) |
| [](api/events/booking-selectslot-event.md)   | @getshort(../events/booking-selectslot-event.md)   |

## Booking properties

| Name                                  | Description                                        |
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
