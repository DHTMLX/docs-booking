---
sidebar_label: cardShape
title: infoShape
description: You can learn about the infoShape config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# cardShape

### Description

@short: Optional. An object with settings for managing the information block appearance

:::info
This property allows you to manage the appearance of a booking info block.
:::

### Usage

~~~jsx {}
infoShape?: {
	preview?: boolean,
	category?: boolean,
	title?: boolean,
	price?: boolean,
	details?: boolean,
};

### Parameters

An object has the following parameters:

- `preview` - (optional) shows/hides a preview image in info block
- `category` - (optional) shows/hides a category name in info block (e.g., a specialist's job)
- `title` - (optional) shows/hides a title in info block (e.g., a specialist's name)
- `price` - (optional) shows/hides a price information in info block
- `details` - (optional) shows/hides a detail information in info block

All parameters values are set to **true** by default, which means that all fields are displayed. 

### Default config

~~~jsx {}
const defaultInfoShape = {
	...
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
