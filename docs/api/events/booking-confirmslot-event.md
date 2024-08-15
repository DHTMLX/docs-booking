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
    slot:{
        id:string|number, //item id
        time: [ number, number ], //timestamp, length in minutes
    };
    data:{
        [key]: any, //fields described in formShape
    };
    confirm:{
        promise:Promise,
        done: (value:any) => void,
        error: (error: Error) => void,
    }
}) => void;
~~~

### Parameters

The callback of the **confirm-slot** event can take an object with the following parameters:

- `slot` - (required) an object with the next slot parameters:
  - `id` - (required) the ID of a card for which the booking of a slot is confirmed
  - `time` - (required)
- `data` - (required) an abject with the booking screen form fields with the following parameters for each field:
   - `key` - (required) the form field ID. By default, three fields are added: *name*, *email*, *description*
   - `startTime` - (required) the start time of a slot in milliseconds
- `confirm` - (required) an object with the next parameters:
 - `promise` -  promise with the confirmation status ?
 - `done` -
 - `error` - 

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
