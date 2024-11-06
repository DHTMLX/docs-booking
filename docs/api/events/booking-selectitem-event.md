---
sidebar_label: select-item
title: select-item Event
description: You can learn about the select-item event in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# select-item

### Description

@short: Fires when an item is selected

### Usage

~~~jsx {}
"select-item": ({
    id: string|number
}) => void;
~~~

### Parameters

The callback of the **select-item** event can take an object with the following parameters:

- `id` - (required) the id of an item

### Example

~~~jsx {7-10}
// create Booking
const booking = new booking.Booking("#root", {
    data, 
    // other configuration parameters
});

// output the id of the selected item
booking.api.on("select-item", (ev) => {
    console.log(ev.id);
});
~~~
