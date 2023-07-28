---
sidebar_label: set-filter
title: set-filter Event
description: You can learn about the set-filter event in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# set-filter

### Description

@short: Fires when filtering cards

### Usage

~~~jsx {}
"set-filter": ({
    global?: string,
    date?: string,
    time?: [
		{
			from?: number,
			to?: number,
		}, {...}
	],
 }) => void;
~~~

### Parameters

The callback of the **set-filter** event can take an object with the following parameters:

- `global` - (optional) the text in the search field
- `date` - (optional) the slot date
- `time` - (optional) an array of objects containing time options for a slot. For each object, you can specify the following parameters:
  - `from` - (optional) the start time
  - `to` - (optional) the end time

### Example

~~~jsx {7-10}
// create Booking
const booking = new booking.Booking("#root", {
	cards,
	cardShape
});

// ...
booking.api.on("set-filter", (obj) => {
	console.log(obj.time);
});
~~~

**Related articles:** TODO
