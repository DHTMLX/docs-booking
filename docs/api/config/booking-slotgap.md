---
sidebar_label: slotGap
title: slotGap
description: You can learn about the slotGap in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# slotGap

### Description

@short: Optional. Defines a gap between booking slots for all cards

:::note
The value will be applied in case the gap value is not set for the `gap` or `slotGap` parameter inside the [`data`](/api/config/booking-data) property.
:::

### Usage

~~~jsx {}
slotGap?: number;
~~~

### Parameters

- `number` - (optional) a gap between slots in minutes; 0 is set by default

### Example

~~~jsx {}
const slotGap = 10;

new booking.Booking("#root", {
    slotGap,
    // other parameters
});
~~~

The snippet below shows how to set [duration](/api/config/booking-slotsize) and gap for all slots:

<iframe src="https://snippet.dhtmlx.com/pw8xsl1p?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
