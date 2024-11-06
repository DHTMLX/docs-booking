---
sidebar_label: Initialization
title: Initialization
description: You can learn about the initialization in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Initialization

This guide will give you detailed instructions on how to create Booking on a page to enrich your application with rich features of this tool. Take the following steps to get a ready-to-use component:

1. [Include the Booking source files on a page](#including-source-files).
2. [Create a container for Booking](#creating-container).
3. [Initialize Booking with a constructor](#initializing-booking).

## Including source files

[Download the package](https://dhtmlx.com/docs/products/dhtmlxBooking/) and unpack it into a folder of your project.

To create Booking, you need to include 2 source files on your page:

- *booking.js*
- *booking.css*

Make sure that you set correct relative paths to the source files:

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>  
<link rel="stylesheet" href="./dist/booking.css">
~~~

## Creating container

Add a container for Booking and give it an ID, for example *"root"*:

~~~jsx title="index.html"
<div id="root"></div>
~~~

## Initializing Booking

Initialize Booking using the **booking.Booking** constructor. It takes two parameters:

- an HTML container (the ID of the HTML container)
- an object with configuration properties. [See the full list here](#configuration-properties)

~~~jsx title="index.html"
// create Booking
new booking.Booking("#root", {
    // configuration properties
});
~~~

### Configuration properties

:::info
The full list of properties to configure **Booking** can be found [**here**](api/overview/booking-properties-overview.md).
:::

## Example

In this snippet you can see how to initialize **JavaScript Booking** with initial settings:

<iframe src="https://snippet.dhtmlx.com/6it4ohez?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
