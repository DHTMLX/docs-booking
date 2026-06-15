---
sidebar_label: setConfirmHandler()
title: setConfirmHandler() Method
description: You can learn about the setConfirmHandler() method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# setConfirmHandler()

### Description

@short: Registers a handler for the confirm-slot event

### Usage

~~~jsx
setConfirmHandler(confirmHandler: (ev) => any): void;
~~~

### Parameters

The method takes the `confirmHandler` function that will be called when confirming a slot for booking. The function takes the object as in the [`confirm-slot`](api/events/booking-confirmslot-event.md) event.

### Example

~~~jsx {}
const { data } = getData();
const widget = new booking.Booking("#root", {
    data
});

widget.setConfirmHandler((ev) => {
    console.log("Booking info:", ev);
});
~~~

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related articles**: [Saving slots reservations to the server](guides/saving-reservations.md)
