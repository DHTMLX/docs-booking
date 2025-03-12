---
sidebar_label: renderType
title: renderType
description: You can learn about renderType in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# renderType

### Description

@short: Optional. Defines how cards are rendered

The property helps optimize performance when working with a large number of cards. 

### Usage

~~~jsx {}
renderType?: "default" | "lazy";
~~~

### Parameters

- `default` - renders all cards loaded to the widget (set by default)
- `lazy` - renders only visible cards

### Example

~~~jsx {}
new booking.Booking("#root", {
    data,
    renderType: "lazy",
    // other parameters
});
~~~

The snippet below shows how to handle rendering large data sets: 

<iframe src="https://snippet.dhtmlx.com/fb9a5a3b?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
