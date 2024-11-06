---
sidebar_label: api.on() 
title: on Method
description: You can learn about the on method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# api.on()

### Description

@short: Allows attaching a handler to the inner events

### Usage

~~~jsx {}
api.on(
    event: string,
    handler: function
): void;
~~~

### Parameters

- `event` - (required) an event to be fired
- `handler` - (required) a handler to be attached (the handler arguments will depend on the event to be fired)

:::info
The full list of the Booking internal events you can find [**here**](/api/overview/booking-events-overview).
Use the `api.on()` method if you want to listen to the actions without modifying them. To make changes to the actions, apply the [`api.intercept()`](/api/internal/booking-intercept) method.
:::

### Example

~~~jsx {7-10}
// create Booking
const booking = new booking.Booking("#root", {
    data,
    // other configuration parameters
});

// output the selected slot id and time
booking.api.on("select-slot", (obj) => {
    console.log("The selected slot", obj.id, "and time", obj.time);
});
~~~
