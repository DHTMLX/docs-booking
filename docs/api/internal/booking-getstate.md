---
sidebar_label: api.getState()
title: getState Method
description: You can learn about the getState method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# api.getState()

### Description

@short: Gets an object with the StateStore properties of Booking

### Usage

~~~jsx {}
api.getState(): object;
~~~

### Returns

The method returns an object with the following parameters of state:

~~~jsx {}
{	
	data: [], // an array of cards objects
    cardShape: {}, // an object with settings for cards
    filteredData: [], // filtered data array
    filterShape: {}, // an object with filter settings
    filterValues: {}, // an object with filter values (text, data, time)
    formShape: [], // an array of objects with settings for the Booking editor dialog
	infoShape: {}, // an object with settings for the left side of the Booking editor
    selectedItem: {}, // single data item
    selectedSlot: {}, // an object with slot id and timestamp in minutes
    slotGap: number, // slots gap in minutes
    slotSize: number, // slot size in minutes
}
~~~

### Example

~~~jsx {7-11}
// create Booking
const booking = new booking.Booking("#root", {
	data,
	cardShape
});

// get and output the State of Booking to console
const state = booking.api.getState();
console.log(state); 
~~~


