---
sidebar_label: serialize()
title: serialize() Method
description: You can learn about the serialize() method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# serialize()

### Description

@short: Serializes Booking data into a JSON array

### Usage

~~~jsx
serialize(): object[];
~~~

### Returns

Returns [data](api/config/booking-data.md) array.

### Example

~~~jsx {}
// create Booking
const widget = new booking.Booking("#root", {
    data,
    // configuration parameters
});

console.log(widget.serialize());
~~~
