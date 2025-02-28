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
| [](../methods/booking-serialize-method.md)         | @getshort(../methods/booking-serialize-method.md)         |
| [](../methods/booking-setconfig-method.md)         | @getshort(../methods/booking-setconfig-method.md)         |
| [](../methods/booking-setconfirmhandler-method.md) | @getshort(../methods/booking-setconfirmhandler-method.md) |
| [](../methods/booking-setlocale-method.md)         | @getshort(../methods/booking-setlocale-method.md)         |

## Booking internal API

### Event Bus methods

| Name                                     | Description                                     |
| ---------------------------------------- | ----------------------------------------------- |
| [](../internal/booking-detach.md)    | @getshort(../internal/booking-detach.md)            |
| [](../internal/booking-exec.md)      | @getshort(../internal/booking-exec.md)              |
| [](../internal/booking-intercept.md) | @getshort(../internal/booking-intercept.md)         |
| [](../internal/booking-on.md)        | @getshort(../internal/booking-on.md)                |
| [](../internal/booking-setnext.md)   | @getshort(../internal/booking-setnext.md)           |

### State methods

| Name                                            | Description                                            |
| ----------------------------------------------- | ------------------------------------------------------ |
| [](../internal/booking-getreactivestate.md) | @getshort(../internal/booking-getreactivestate.md) |
| [](../internal/booking-getstate.md)         | @getshort(../internal/booking-getstate.md)         |

## Booking events

| Name                                      | Description                                      |
| ----------------------------------------- | ------------------------------------------------ |
| [](../events/booking-confirmslot-event.md)  | @getshort(../events/booking-confirmslot-event.md)  |
| [](../events/booking-filterdata-event.md)  | @getshort(../events/booking-filterdata-event.md)    |
| [](../events/booking-selectitem-event.md)  | @getshort(../events/booking-selectitem-event.md)    |
| [](../events/booking-selectitemdate-event.md)  | @getshort(../events/booking-selectitemdate-event.md) |
| [](../events/booking-selectslot-event.md)   | @getshort(../events/booking-selectslot-event.md)   |

## Booking properties

| Name                                  | Description                                        |
| ------------------------------------- | -------------------------------------------------- |
| [](../config/booking-data.md)         | @getshort(../config/booking-data.md)               |
| [](../config/booking-end.md)          | @getshort(../config/booking-end.md)                |
| [](../config/booking-cardshape.md)    | @getshort(../config/booking-cardshape.md)          |
| [](../config/booking-cardtemplate.md) | @getshort(../config/booking-cardtemplate.md)       |
| [](../config/booking-filtershape.md)  | @getshort(../config/booking-filtershape.md)        |
| [](../config/booking-formshape.md)    | @getshort(../config/booking-formshape.md)          |
| [](../config/booking-infoshape.md)    | @getshort(../config/booking-infoshape.md)          |
| [](../config/booking-infotemplate.md) | @getshort(../config/booking-infotemplate.md)       |
| [](../config/booking-locale.md)       | @getshort(../config/booking-locale.md)             |
| [](../config/booking-rendertype.md)   | @getshort(../config/booking-rendertype.md)         |
| [](../config/booking-slotgap.md)      | @getshort(../config/booking-slotgap.md)            |
| [](../config/booking-slotsize.md)     | @getshort(../config/booking-slotsize.md)           |
| [](../config/booking-start.md)        | @getshort(../config/booking-start.md)              |
