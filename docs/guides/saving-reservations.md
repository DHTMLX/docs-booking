---
sidebar_label: Saving slots reservations to server
title:  Saving slots reservations to the server
description: You can learn about  saving slots reservations to server in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

#  Saving slots reservations to the server

About loading data from the server see here: [Loading data](/guides/loading-data#loading-data-1).  


To handle slots reservation, you should apply the [`setConfirmHandler`](/api/methods/booking-setconfirmhandler-method) method. 

~~~jsx
// create a function to handle the logic of reservation
const handleSlotReservation = (event) => {
    const { confirm, slot, data } = event;

    // create the info object 
    const info = {
        item: slot.id,
        start: slot.time[0],
        data,
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
const widget = new booking.Booking("#root", {
        data: [],
        // configuration parameters
});

// fetch available data from the server and convert it to JSON
fetch("/server/url")
        .then((res) => res.json())        
        .then((items) => {
            // update Booking configuration with the fetched items, allowing the widget to display them
            widget.setConfig({ data: items });
            // assign the handleSlotReservation function to be called when a user confirms booking, 
            // link user actions to the reservation logic
            widget.setConfirmHandler(handleSlotReservation);
        });
~~~

## Example

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>


**Related articles**: 
- [confirm-slot](/api/events/booking-confirmslot-event) event
- [setConfig()](/api/methods/booking-setconfig-method) method
- [setConfirmHandler()](/api/methods/booking-setconfirmhandler-method) method