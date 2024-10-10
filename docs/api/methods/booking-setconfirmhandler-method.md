---
sidebar_label: setConfirmHandler()
title: setConfirmHandler() Method
description: You can learn about the setConfirmHandler() method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# setConfirmHandler()

### Description

@short: Allows setting the handler for confirming slots

### Usage

~~~jsx
setConfirmHandler(confirmHandler: (ev) => any): void;
~~~

### Parameters

The method takes the `confirmHandler` function that will be called when confirming a slot for booking. The function takes the same object as in the callback of the [`confirm-slot`](/api/events/booking-confirmslot-event) event.

### Example

~~~jsx {}
const { data } = getData();
const widget = new booking.Booking("#root", {
	data,
});

widget.setConfirmHandler((ev) => {
	const confirm  = ev.confirm;
	console.log("Booking info:", ev);
	setTimeout(() => {
		Math.random() < 0.5 ? confirm.error() : confirm.done();
	}, 1000);
});
~~~

