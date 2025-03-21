---
sidebar_label: cardShape
title: cardShape
description: You can learn about the cardShape config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# cardShape

### Description

@short: Optional. An object with settings for managing information displayed on the left side of each card

### Usage

~~~jsx {}
cardShape?: {
    category?: boolean,
    details?: boolean,
    preview?: boolean,
    price?: boolean,
    review?: boolean,
    subtitle?: boolean,
    title?: boolean
};
~~~

### Parameters

In the **cardShape** object you can specify the following parameters (fields):

- `category` - (optional) shows/hides a card's name
- `details` - (optional) shows/hides details
- `preview` - (optional) shows/hides a preview image
- `price` - (optional) shows/hides price
- `review` - (optional) shows/hides rating information
- `subtitle` - (optional) shows/hides a card's subtitle
- `title` - (optional) shows/hides a card's title

### Default config

~~~jsx {}
const defaultCardShape = {
    category: true,
    details: true,
    preview: true,
    price: true,
    review: true,
    subtitle: false,
    title: true
};
~~~

### Example

~~~jsx {}
const cardShape = {
    review: false,
    subtitle: false,
    price: false
};

new booking.Booking("#root", {
    cardShape,
    // other parameters
});
~~~

The snippet below demonstrates how to configure what fields to display on the left side of cards:

<iframe src="https://snippet.dhtmlx.com/6mxd7918?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
You can also configure the appearance of a card using the [`cardTemplate`](/api/config/booking-cardtemplate) property. If both `cardTemplate` and `cardShape` are applied, `cardTemplate` will override the `cardShape` settings. 
:::

**Related articles:** 

- [Defining the structure of cards](/guides/configuration/#defining-the-structure-of-cards)
- [`cardTemplate`](/api/config/booking-cardtemplate)