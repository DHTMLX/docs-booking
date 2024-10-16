---
sidebar_label: slotSize
title: slotSize
description: You can learn about the slotSize in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# slotSize

### Description

@short: Optional. Defines the duration of a booking slot for all cards

:::note
This value will be applied in case the size value is not set for the `size` or `slotSize` parameter inside the [`data`](/api/config/booking-data) property.
:::

### Usage

~~~jsx {}
slotSize?: number;
~~~

### Parameters

- `number` - the duration of a booking slot in minutes; the default value is 60 minutes

### Example

~~~jsx {}
const slotSize = 45;

new booking.Booking("#root", {
	slotSize,
	// other parameters
});
~~~

The snippet below shows how to set duration and [gap](/api/config/booking-slotgap) for all slots:

<iframe src="https://snippet.dhtmlx.com/pw8xsl1p?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
