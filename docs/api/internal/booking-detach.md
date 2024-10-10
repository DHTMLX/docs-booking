---
sidebar_label: api.detach()
title: detach Method
description: You can learn about the detach method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# api.detach()

## Description

Allows removing/detaching event handlers

## Usage

~~~jsx {}
api.detach(tag: number | string ): void;
~~~

## Parameters

- `tag` - the name of the action tag

## Example

In the example below we add an object with the **tag** property to the [`api.on()`](/api/internal/booking-on) handler, and then we use the `api.detach()` method to stop logging the [`open-filter`](/api/events/booking-selectslot-event) event.

~~~jsx {6-20}
const widget = new booking.Booking("#root", {
	data,
	//other configuration parameters
});

// add handler
if (booking.api) {
    booking.api.on(
        "select-slot",
        ({ id }) => {
            console.log("Selected: " + id);
        },
        { tag: "track" }
    );
}

// detach handler
function stop() {
    booking.api.detach("track");
}

const button = document.createElement("button");

button.addEventListener("click", stop);
button.textContent = "Stop logging";

document.body.appendChild(button);
~~~