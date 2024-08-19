---
sidebar_label: api.intercept()
title: intercept Method
description: You can learn about the intercept method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# api.intercept()

### Description

@short: Allows intercepting and preventing the inner events

### Usage

~~~jsx {}
api.intercept(
	event: string,
	callback: function
): void;
~~~

### Parameters

- `event` - (required) an event to be fired
- `callback` - (required) a callback to be performed (the callback arguments will depend on the event to be fired)

:::info
The full list of the Booking internal events you can find [**here**](/api/api_overview/#booking-events).
Use the [`api.on()`](/api/internal/js_booking_on) method if you want to listen to the actions without modifying them. To make changes to the actions, apply the `api.intercept()` method.
:::

### Example

~~~jsx {7-11}
// create Booking
const booking = new booking.Booking("#root", {
	cards,
	cardShape
});

// every time the set-filter event is triggered, the time field will contain only the morning time
booking.api.intercept("set-filter", data => {
	data.filterData.time = [{ start: 9, end: 12 }];
	return data;
});
~~~