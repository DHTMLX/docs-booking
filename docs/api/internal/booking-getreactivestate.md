---
sidebar_label: api.getReactiveState()
title: getReactiveState() Method
description: You can learn about the getReactiveState method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# api.getReactiveState()

### Description

@short: Gets an object with the reactive properties of Booking

### Usage

~~~jsx {}
api.getReactiveState(): object;
~~~

### Returns

The method returns an object where each field is a reactive writable store (`IPublicWritable`) that wraps the corresponding state value. Subscribe to a store with `.subscribe(callback)` to react to its changes. The underlying values are:

~~~jsx {}
{    
    data: [], // an array of cards objects
    cardShape: {}, // an object with settings for cards
    filteredData: [], // filtered data array
    filterShape: {}, // an object with filter settings
    filterValues: {}, // an object with filter values (text, date, time)
    formShape: [], // an array of objects with settings for the Booking editor dialog
    infoShape: {}, // an object with settings for the left side of the Booking editor
    selectedItem: {}, // single data item
    selectedSlot: {}, // an object with slot id and time ([timestamp, duration in minutes])
    slotGap: number, // slots gap in minutes
    slotSize: number, // slot size in minutes
    start: Date, // start date of the displayed range
    end: Date, // end date of the displayed range
    renderType: "default" | "lazy" // cards rendering mode
}
~~~

### Example

~~~jsx {7-9,11-14}
// create Booking
const widget = new booking.Booking("#root", {
    data,
    //other properties
});

// get the Reactive State of Booking and output it to console
const state = widget.api.getReactiveState();
console.log(state);

// subscribe on the cards changes and output the array of cards
state.data.subscribe((data) => {
    console.log(data);
});
~~~
