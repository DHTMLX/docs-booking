---
sidebar_label: EVENT_TEMPLATE
title: EVENT_TEMPLATE Event
description: You can learn about the EVENT_TEMPLATE event in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# EVENT_TEMPLATE

### Description

@short: fires when ...

### Usage

~~~jsx {}
"EVENT_TEMPLATE": ({
	...
}) => void;
~~~

### Parameters

The callback of the **EVENT_TEMPLATE** event can take an object with the following parameters:

...

:::info
For handling the inner events you can use the [**Event Bus methods**](api/api_overview.md/#event-bus-methods)
:::

### Example

~~~jsx {7-9}
// create Booking
const booking = new booking.Booking("#root", {
	// initial configuration parameters
});

// subscribe on the "EVENT_TEMPLATE" event
booking.api.on("EVENT_TEMPLATE", (obj) => {
	...
});
~~~
