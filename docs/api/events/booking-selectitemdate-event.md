---
sidebar_label: select-item-date
title: select-item-date Event
description: You can learn about the select-item-date event in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# select-item-date

### Description

@short: Fires when ...

### Usage

~~~jsx {}
"select-item-date": ({
  id: string|number,
  date: Date;
}) => void;
~~~

### Parameters

The callback of the **select-item-date** event can take an object with the following parameters:

- `id` - (required) the id of an item
- `date` - (required)


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
