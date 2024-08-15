---
sidebar_label: api.exec()
title: exec Method
description: You can learn about the exec method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# api.exec()

### Description

@short: Allows triggering the inner events

### Usage

~~~jsx {}
api.exec(
	event: string,
	config: object
): void;
~~~

### Parameters

- `event` - (required) an event to be fired
- `config` - (required) the config object with parameters (see the event to be fired)

### Events

:::info
The full list of the Booking internal events can be found [**here**](api/booking-api-overview.md/#booking-events)
:::

### Example

~~~jsx {7-17}
// create Booking
const booking = new booking.Booking("#root", {
	cards,
	cardShape
});

// ...
booking.api.exec("set-filter", {
	filterData: {
		date: {
			start: new Date(),
			end: new Date(2023, 4, 10),
		},
		global: "Allergist",
		time: [],
	},
});
~~~
