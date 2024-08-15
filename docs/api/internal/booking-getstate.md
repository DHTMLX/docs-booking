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
	cards,
    cardShape,
    filteredCards,
    filterShape,
    filterData,
    formShape,
	... TODO
}
~~~  

### Example

~~~jsx {7-11}
// create Booking
const booking = new booking.Booking("#root", {
	cards,
	cardShape
});

// get the State of Kanban
const state = booking.api.getState();
console.log(state.cards); // output the cards data
console.log(state.cardShape); // output the card configuration
console.log(state.formShape); // output the editor configuration
//...
~~~

**Related articles:**
