---
sidebar_label: Working with server
title:  Working with server
description: You can learn about working with server in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Work with the server

## Load data

Use the native `fetch` method to request data from the server:

~~~jsx {}
const booking = new booking.Booking("#booking", {data: []});
const server = "https://some-backend-url";

fetch(server + "/data").then((res) => res.json()).then((data) => { 
    booking.setConfig({data});
});
~~~

## Save slot reservations

Use the [`setConfirmHandler()`](/api/methods/booking-setconfirmhandler-method) method to handle slot reservations. The following code snippet fetches data, updates the widget configuration, and sends a POST request when a user confirms a slot:

~~~jsx {}
// handle slot reservation logic
const handleSlotReservation = (event) => {
    const { confirm, slot, data } = event;

    // build the info object
    const info = {
        item: slot.id,
        start: slot.time[0],
        data
    };

    // send reservation data to the server
    fetch("/server/url", {
        method: "POST",
        body: JSON.stringify(info),
    // handle the server response
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

// fetch data from the server
fetch("/server/url")
    .then((res) => res.json())        
    .then((items) => {
        // update Booking with fetched data
        booking.setConfig({ data: items });
        // set the reservation handler
        booking.setConfirmHandler(handleSlotReservation);
    });
~~~

## Work with UTC data

The widget uses the local timezone. If your data is in UTC, convert it to the local timezone before loading.

The example below uses two helper functions to handle this conversion:

- `g2l` converts a UTC timestamp to the local timezone. Use it during data loading to convert `usedSlots` and `slots` timestamps from UTC to local time.
- `l2g` converts a local timestamp back to UTC. Use it when saving a reservation to convert the local time from `slot.time[0]` to UTC before sending it to the server.

The following code snippet converts UTC timestamps to local time during data loading, and back to UTC when sending a reservation:

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

The snippet below loads data from a server and handles slot reservations:

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related articles**:

- [`confirmSlot`](/api/events/booking-confirmslot-event) — fires when a user confirms a booking slot
- [`setConfig()`](/api/methods/booking-setconfig-method) — updates Booking configuration at runtime
- [`setConfirmHandler()`](/api/methods/booking-setconfirmhandler-method) — sets a custom handler for booking confirmation
