---
sidebar_label: cardShape
title: infoShape
description: You can learn about the infoShape config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# cardShape

### Description

@short: Optional. An object with settings for managing information displayed on the left side of the Booking editor


### Usage

~~~jsx {}
infoShape?: {
	preview?: boolean,
	category?: boolean,
	title?: boolean,
	price?: boolean,
	details?: boolean,
};
~~~

### Parameters

An object has the following parameters:

- `preview` - (optional) shows/hides a preview image in the information block (left side) of the booking dialog
- `category` - (optional) shows/hides a category name on the left side of the booking dialog (for example, a specialist's job)
- `title` - (optional) shows/hides a title in the information block of the booking dialog (e.g., a specialist's name)
- `price` - (optional) shows/hides  price in the information block of the booking dialog
- `details` - (optional) shows/hides details in the information block of the booking dialog

### Default config

~~~jsx {}
const defaultInfoShape = {
	preview: true,
	category: true,
	title: true,
	price: true,
	details: true,
};
~~~

### Example

~~~jsx {1-7,10}
const infoShape = {
	preview: true,
	category: true,
	title: true,
	price: true,
	details: false,
};

new booking.Booking("#root", {
	infoShape,
	// other parameters
});
~~~

**Related articles:**
