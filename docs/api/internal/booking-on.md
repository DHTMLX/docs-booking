---
sidebar_label: api.on()
title: on() Method
description: You can learn about the on method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# api.on()

### Description

@short: Allows attaching a handler to the inner events

### Usage

~~~jsx {}
api.on(
    event: string,
    handler: function,
    config?: { tag?: number | string }
): void;
~~~

### Parameters

- `event` - (required) an event to be fired
- `handler` - (required) a handler to be attached (the handler arguments will depend on the event to be fired)
- `config` - (optional) an object with extra settings for the handler:
  - `tag` - (optional) a tag that identifies the handler so it can be removed later via the [`api.detach()`](api/internal/booking-detach.md) method

:::info
The full list of the Booking internal events can be found [**here**](api/overview/booking-events-overview.md).
Use the `api.on()` method if you want to listen to the actions without modifying them. To make changes to the actions, apply the [`api.intercept()`](api/internal/booking-intercept.md) method.
:::

### Example

~~~jsx {7-10}
// create Booking
const widget = new booking.Booking("#root", {
    data,
    // other configuration parameters
});

// output the selected slot id and time
widget.api.on("select-slot", (obj) => {
    console.log("The selected slot", obj.id, "and time", obj.time);
});
~~~
