---
sidebar_label: select-slot
title: select-slot Event
description: You can learn about the select-slot event in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# select-slot

### Description

@short: Fires when selecting a slot

### Usage

~~~jsx {}
"select-slot": ({
    id: string | number,
    time:[ number, number ] //timestamp, length in minutes
 }) => void;
~~~

### Parameters

The callback of the **select-slot** event can take an object with the following parameters:

- `id` - (required) the ID of a card a selected slot belongs to
- `time` - (required) 
  
### Example

~~~jsx {7-10}
// create Booking
const booking = new booking.Booking("#root", {
	cards,
	cardShape
});

// ...
booking.api.on("select-slot", (obj) => {
	console.log(obj.cardId);
});
~~~

**Related articles:** TODO