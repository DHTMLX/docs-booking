---
sidebar_label: api.getReactiveState()
title: getReactiveState Method
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

The method returns an object with the following parameters:

~~~jsx {}
{
	cards,
	cardShape,
    filteredCards,
    filterShape,
	formShape,
	... TODO
}
~~~  

### Example

~~~jsx {7-8,10-13}
// create Booking
const booking = new booking.Booking("#root", {
	cards,
	cardShape
});

// get the Reactive State of Booking
const state = booking.api.getReactiveState();

// subscribe on the cards changes and output the array of cards
state.cards.subscribe((data) => {
	console.log(data);
});
~~~
