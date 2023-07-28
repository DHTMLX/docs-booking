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
    cardId: string | number,
    slotTime: {
        from?: Date,
        to?: Date,
    }
 }) => void;
~~~

### Parameters

The callback of the **select-slot** event can take an object with the following parameters:

- `cardId` - (required) the ID of a card a selected slot belongs to
- `slotTime` - (required) an object with the slot time parameters. In this object you can specify the following parameters:
	- `from` - (optional) the slot start date
	- `to` - (optional) the slot end date
  
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
