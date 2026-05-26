---
sidebar_label: Working with server
title:  Working with server
description: You can learn about working with server in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Working with server

The Booking widget integrates with a backend through two main operations: loading cards data from the server and posting slot reservations back to the server. This guide covers both flows and the UTC conversion needed when server data uses a different timezone.

## Load data from the server

Fetch card data with the native `fetch` API (or any equivalent HTTP client) and pass the parsed JSON to the widget through the [`setConfig()`](/api/methods/booking-setconfig-method) method.

The following code snippet initializes an empty Booking instance and loads the dataset once the response arrives:

~~~jsx {}
const booking = new booking.Booking("#booking", { data: [] });
const server = "https://some-backend-url";

fetch(server + "/data")
    .then((res) => res.json())
    .then((data) => {
        booking.setConfig({ data });
    });
~~~

## Save slot reservations to the server

To process slot reservations on the backend, register a confirmation handler with the [`setConfirmHandler()`](/api/methods/booking-setconfirmhandler-method) method.

The handler receives an event object with three fields:

- `slot` — booked slot: `id` (card ID) and `time` (`[timestamp, duration]`)
- `data` — form values keyed by [`formShape`](/api/config/booking-formshape) field IDs (defaults: `name`, `email`, `description`)
- `confirm` — server-response callbacks: `done()` on success, `error()` on failure

The following code snippet posts the reservation to the server and resolves the booking based on the response:

~~~jsx {}
// handle the reservation logic
const handleSlotReservation = (event) => {
    const { confirm, slot, data } = event;

    // build the payload
    const info = {
        item: slot.id,
        start: slot.time[0],
        data
    };

    // post the payload to the server
    fetch("/server/url", {
        method: "POST",
        body: JSON.stringify(info),
    // resolve or reject the booking based on the response
    }).then((response) => {
        if (response.ok) confirm.done();
        else confirm.error();
    });
};

// create Booking
const booking = new booking.Booking("#root", {
    data: [],
    // configuration parameters
});

// fetch the dataset from the server
fetch("/server/url")
    .then((res) => res.json())        
    .then((items) => {
        // load the fetched items into the widget
        booking.setConfig({ data: items });
        // register the reservation handler
        booking.setConfirmHandler(handleSlotReservation);
    });
~~~

:::info
The [`confirm-slot`](/api/events/booking-confirmslot-event) event delivers the same callback shape. Subscribe to the event with `booking.api.on("confirm-slot", handler)` if you need multiple subscribers. Use [`setConfirmHandler()`](/api/methods/booking-setconfirmhandler-method) for a single, replaceable handler.
:::

## Convert UTC data to the local timezone

The widget operates in the local timezone. If the server returns UTC timestamps, convert each timestamp before passing it into the widget, and convert it back to UTC before posting reservations.

The helpers below handle both directions:

- `g2l` — convert a UTC timestamp to the local timezone (apply on incoming `usedSlots` and `slots.dates`)
- `l2g` — convert a local timestamp back to UTC (apply on `slot.time[0]` before sending to the server)

The following code snippet combines both helpers in a complete load-and-reserve flow:

~~~jsx
const serverURL = "https://some-backend-url";

function g2l(v) {
    const utcDate = new Date(v);
    return new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
        utcDate.getUTCHours(),
        utcDate.getUTCMinutes(),
        utcDate.getUTCSeconds(),
        utcDate.getUTCMilliseconds(),
    ).valueOf();
}

function l2g(v) {
    const date = new Date(v);
    return Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
    );
}

const handleSlotReservation = event => {
    const { confirm, slot, data } = event;

    const info = {
        doctor: slot.id,
        date: l2g(slot.time[0]),
        form: {
            name: data.name,
            email: data.email,
            details: data.description,
        },
    };

    fetch( serverURL + "/doctors/reservations", {
        method: "POST",
        body: JSON.stringify(info),
    }).then(response => {
        if (response.ok) confirm.done();
        else confirm.error();
    });
};

// widget initialization
const widget = new booking.Booking("#root", {
    data: [],
});

// data loading
fetch( serverURL + "/units")
    .then(res => res.json())
    .then(units => {
        units.forEach(unit => {
            if (unit.usedSlots) unit.usedSlots = unit.usedSlots.map(g2l);
            if (unit.slots) {
                unit.slots = unit.slots.map(slot => {
                    if (slot.dates) {
                        return {
                            ...slot,
                            dates: slot.dates.map(g2l)
                        };
                    }
                    return slot;
                });
            };
        });
         
        widget.setConfig({ data: units });
        widget.setConfirmHandler(handleSlotReservation);
    });
~~~


## Example

The snippet below demonstrates a full server-side booking flow:

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related articles**:

- [`confirm-slot`](/api/events/booking-confirmslot-event) — event fired when a user confirms a slot
- [`setConfig()`](/api/methods/booking-setconfig-method) — update the widget configuration with fetched data
- [`setConfirmHandler()`](/api/methods/booking-setconfirmhandler-method) — register the slot reservation handler
