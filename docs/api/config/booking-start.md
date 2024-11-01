---
sidebar_label: start
title: start
description: You can learn about the start date in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# start

### Description

@short: Optional. Defines the date from which to start showing available slots

### Usage

~~~jsx {}
start?: Date;
~~~

### Parameters

- `Date` - the start date from which to display available slots; the default value is the current date.

### Example

~~~jsx {}
new booking.Booking("#root", {
	data,
	start: new Date(2024, 10, 10),
	// other parameters
});
~~~


The snippet below shows how to set the start date:

<iframe src="https://snippet.dhtmlx.com/cm7871sl?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

