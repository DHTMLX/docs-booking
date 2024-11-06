---
sidebar_label: infoShape
title: infoShape
description: You can learn about the infoShape config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# infoShape

### Description

@short: Optional. An object with settings for managing information displayed on the left side of the Booking dialog

### Usage

~~~jsx {}
infoShape?: {
    preview?: boolean,
    category?: boolean,
    title?: boolean,
    price?: boolean,
    details?: boolean
};
~~~

### Parameters

An object has the following parameters:

- `preview` - (optional) shows/hides a preview image in the information block (left side) of the Booking dialog
- `category` - (optional) shows/hides a category name on the left side of the Booking dialog (for example, a specialist's job)
- `title` - (optional) shows/hides a title in the information block of the Booking dialog (e.g., a specialist's name)
- `price` - (optional) shows/hides price in the information block of the Booking dialog
- `details` - (optional) shows/hides details in the information block of the Booking dialog

### Default config

~~~jsx {}
const defaultInfoShape = {
    preview: true,
    category: true,
    title: true,
    price: true,
    details: true
};
~~~

### Example

~~~jsx {}
const infoShape = {
    preview: false,
    price: false
};

new booking.Booking("#root", {
    data,
    infoShape,
    // other parameters
});
~~~

The snippet below shows how to configure what to display on the left side of the Booking dialog:

<iframe src="https://snippet.dhtmlx.com/pd6wp1xc?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
