---
sidebar_label: slotGap
title: slotGap
description: You can learn about the slotGap in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# slotGap

### Description

@short: Optional. Defines a gap between booking slots for all cards

:::note
The value will be applied in case the gap is not set for the `gap` or `slotGap` parameter inside the [`data`](/api/config/booking-data) property.
:::

### Usage

~~~jsx {}
slotGap?: number;
~~~

### Parameters

- `number` - a gap between slots in minutes; 0 is set by default

### Example

~~~jsx {1-7,10}
const slotGap = 10;

new booking.Booking("#root", {
	slotGap,
	// other parameters
});
~~~

**Related articles:**