---
sidebar_label: cardShape
title: cardShape
description: You can learn about the cardShape config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# cardShape

### Description

@short: Optional. An object of settings for managing appearance of the information blocks

### Usage

~~~jsx {}
cardShape?: {
    category?: boolean,
    details?: boolean,
    preview?: boolean,
    price?: boolean,
    review?: boolean,
    subtitle?: boolean,
    title?: boolean,
};
~~~

### Parameters

To configure the card appearance, in the **cardShape** object you can specify the following parameters (fields):

- `category` - (optional) shows/hides a booking category name
- `details` - (optional) shows/hides a booking detail information
- `preview` - (optional) shows/hides a booking preview image
- `price` - (optional) shows/hides a booking price
- `review` - (optional) shows/hides a booking rating information
- `subtitle` - (optional) shows/hides a booking subtitle
- `title` - (optional) shows/hides a booking title

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
