---
sidebar_label: Initialization
title: Initialization
description: You can learn about the initialization in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Initialization

Follow these steps to add Booking to your page:

1. [Include the Booking source files on a page](#include-source-files).
2. [Create a container for Booking](#create-a-container).
3. [Initialize Booking with a constructor](#initialize-booking).

## Include source files

[Download](https://dhtmlx.com/docs/products/dhtmlxBooking/) and unpack the Booking package into a folder of your project.

Include two source files on your page:

- *booking.js*
- *booking.css*

Set the correct relative paths to the source files:

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>  
<link rel="stylesheet" href="./dist/booking.css">
~~~

## Create a container

Add a container for Booking and give the container an ID, for example `"root"`:

~~~jsx title="index.html"
<div id="root"></div>
~~~

## Initialize Booking

Initialize Booking with the `booking.Booking` constructor. The constructor takes two parameters:

- an HTML container ID
- an object with configuration properties (see [Set configuration properties](#set-configuration-properties))

~~~jsx title="index.html"
// initialize Booking
new booking.Booking("#root", {
    // configuration properties
});
~~~

### Set configuration properties

:::info
See the [full list of configuration properties](api/overview/booking-properties-overview.md).
:::

## Example

The snippet below initializes Booking with sample data and configuration:

<iframe src="https://snippet.dhtmlx.com/6it4ohez?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
