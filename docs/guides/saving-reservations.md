---
sidebar_label: Working with server
title:  Working with server
description: You can learn about working with server in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Working with server

## Loading data 

To get server data, you can send the request for data using the native **fetch** method (or any other way):

~~~jsx {}
const booking = new booking.Booking("#booking", {data: []});
const server = "https://some-backend-url";

fetch(server + "/data").then((res) => res.json()).then((data) => { 
    booking.setConfig({data});
});
~~~

## Saving slots reservations to the server

To handle slots reservation, you should apply the [`setConfirmHandler`](../../api/methods/booking-setconfirmhandler-method) method. 

~~~jsx {}
// create a function to handle the logic of reservation
const handleSlotReservation = (event) => {
    const { confirm, slot, data } = event;

    // create the info object 
    const info = {
        item: slot.id,
        start: slot.time[0],
        data
    };

    // send the POST request to the server with the info object in the request body
    fetch("/server/url", {
        method: "POST",
        body: JSON.stringify(info),
    // handle the response
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

// fetch available data from the server and convert it to JSON
fetch("/server/url")
    .then((res) => res.json())        
    .then((items) => {
        // update Booking configuration with the fetched items, allowing the widget to display them
        booking.setConfig({ data: items });
        // assign the handleSlotReservation function to be called when a user confirms booking, 
        // link user actions to the reservation logic
        booking.setConfirmHandler(handleSlotReservation);
    });
~~~

## Working with UTC data

The widget applies a local timezone but if you have UTC data it's necessary to convert data to a local timezone.

For example, if you have UTC timestamps, you can apply the functions provided in the example below to convert them. The **g2l** function converts a UTC timestamp into the local timezone. During the data loading process, this function is used to convert the times in *usedSlots* and *slots* from UTC to the local time. The **l2g** function converts a local time back to UTC. It's applied during slots reservation, namely, the **l2g** function is used to convert the local time (from slot.time[0]) to UTC before sending it to the server.

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

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related articles**:
- [confirm-slot](../../api/events/booking-confirmslot-event) event
- [setConfig()](../../api/methods/booking-setconfig-method) method
- [setConfirmHandler()](../../api/methods/booking-setconfirmhandler-method) method
