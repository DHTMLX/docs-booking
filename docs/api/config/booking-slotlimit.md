---
sidebar_label: slotLimit
title: slotLimit
description: You can learn about the slotLimit in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# slotLimit

### Description

@short: Optional. Defines the next available date until which slots should be searched 

### Usage

~~~jsx {}
slotLimit?: Date;
~~~

### Parameters

- `Date` - the next available date until which slots should be searched in case none are found for 5 days starting from the current date or the start date in the filter

### Example

~~~jsx {}
const slotSize = 45;

new booking.Booking("#root", {
	slotSize,
	// other parameters
});
~~~

**Related articles:**
