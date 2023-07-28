---
sidebar_label: confirm-slot
title: confirm-slot Event
description: You can learn about the confirm-slot event in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# confirm-slot

### Description

@short: Fires when confirming the booking of a slot

### Usage

~~~jsx {}
"confirm-slot": ({
    cardId: string | number,
    data: {
        [key: string]: string,
    },
    startTime: number,
    confirmation: promise,
}) => void;
~~~

### Parameters

The callback of the **confirm-slot** event can take an object with the following parameters:

- `cardId` - (required) the ID of a card for which the booking of a slot is confirmed
- `data` - (required) an abject with the booking screen form fields with the following parameters for each field:
   - `key` - (required) the form field ID. By default, three fields are added: *name*, *email*, *description*
   - `startTime` - (required) the start time of a slot in milliseconds
- `confirmation` - (required) a promise with the confirmation status

### Example

~~~jsx {7-10}
// create Booking
const booking = new booking.Booking("#root", {
	cards,
	cardShape
});

// ...
booking.api.on("confirm-slot", (obj) => {
	console.log(obj.cardId);
});
~~~

**Related articles:** TODO
