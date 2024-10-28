---
sidebar_label: select-item-date
title: select-item-date Event
description: You can learn about the select-item-date event in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# select-item-date

### Description

@short: Fires when an item is selected

### Usage

~~~jsx {}
"select-item-date": ({
  id: string|number,
  date: number
}) => void;
~~~

### Parameters

The callback of the **select-item-date** event can take an object with the following parameters:

- `id` - (required) the id of an item
- `date` - (required) the date (in milliseconds) that was set for the selected item


### Example

~~~jsx {7-10}
// create Booking
const booking = new booking.Booking("#root", {
    data,
    // other configuration parameters
});

// output the date  
booking.api.on("select-item-date", (ev) => {
	console.log(ev.date);
});
~~~
