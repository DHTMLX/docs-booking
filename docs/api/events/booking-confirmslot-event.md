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
        id:string|number, 
        time: [ number, number ], 
    };
    data:{
        [key]: any, 
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
  - `time` - (required) an array with the slot start time in milliseconds and the slot duration in minutes
- `data` - (required) an abject with the booking screen form fields with the following parameters for each field:
   - `key` - (required) the form field ID. By default, three fields are added: *name*, *email*, *description*
   - `startTime` - (required) the start time of a slot in milliseconds
- `confirm` - (required) an object with the next parameters:
 - `promise` -  (required) a promise that represents the confirmation status. This is a JavaScript Promise object that represents the asynchronous operation of confirming the slot booking. The promise will be resolved or rejected based on the outcome of the booking process. You can attach `.then` and `.catch` handlers to this promise to handle the success or failure of the booking.
 - `done` - (required) a callback function that should be called when booking is successfully confirmed. Calling this function will resolve the promise, indicating that the booking was successful. You can call this function after receiving a positive response from the server.
 - `error` - (required) a callback function that should be called when booking fails. Calling this function will reject the promise, indicating that the booking was unsuccessful. You can call this function after receiving a negative response from the server.

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
