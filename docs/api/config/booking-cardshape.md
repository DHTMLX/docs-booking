---
sidebar_label: cardShape
title: cardShape
description: You can learn about the cardShape config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# cardShape

### Description

@short: Optional. An object with settings for managing information displayed on the left side of cards

### Usage

~~~jsx {}
cardShape?: {
    category?: boolean,
    details?: boolean,
    preview?: boolean,
    price?: boolean,
    review?: boolean,
    subtitle?: boolean,
    title?: boolean
};
~~~

### Parameters

To configure the card appearance, in the **cardShape** object you can specify the following parameters (fields):

- `category` - (optional) shows/hides a card's name
- `details` - (optional) shows/hides details
- `preview` - (optional) shows/hides a preview image
- `price` - (optional) shows/hides price 
- `review` - (optional) shows/hides rating information
- `subtitle` - (optional) shows/hides a card's subtitle
- `title` - (optional) shows/hides a card's title

### Default config

~~~jsx {}
const defaultCardShape = {
	category: true,
	details: true,
	preview: true,
	price: true,
	review: true,
	subtitle: false,
	title: true,
};
~~~

### Example

~~~jsx {1-9,12}
const cardShape = {
	preview: true,
	review: false,
	category: true,
	title: true,
	subtitle: false,
	price: true,
	details: false,
};

new booking.Booking("#root", {
	cardShape,
	// other parameters
});
~~~

**Related articles:**
