---
sidebar_label: Initialization
title: Initialization
description: You can learn about the initialization in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Initialization

This guide walks you through creating a Booking instance on a page. Take the following steps to get a working component:

1. [Include the Booking source files](#include-source-files).
2. [Create a container](#create-a-container).
3. [Initialize Booking with the constructor](#initialize-booking).

## Include source files

The Booking widget ships as two files that you load on the page.

[Download the package](https://dhtmlx.com/docs/products/dhtmlxBooking/) and unpack it into a folder of your project. Add the following files to your page:

- *booking.js* — Booking source code
- *booking.css* — Booking stylesheet

Set correct relative paths to the source files.

The following code snippet includes the Booking files from a *dist/* folder:

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>
<link rel="stylesheet" href="./dist/booking.css">
~~~

## Create a container

Add an HTML element that hosts the Booking widget and assign it an ID, for example *root*.

The following code snippet creates a container with the ID *root*:

~~~jsx title="index.html"
<div id="root"></div>
~~~

## Initialize Booking

Call the `booking.Booking` constructor with two parameters:

- container — the selector or ID of the HTML container that hosts the widget
- config — an object with configuration properties (see [Configuration properties](#configuration-properties))

The following code snippet initializes Booking inside the `#root` container:

~~~jsx title="index.html"
// create Booking
new booking.Booking("#root", {
    // configuration properties
});
~~~

### Configuration properties

:::info
For the full list of properties used to configure Booking, see the [Properties overview](api/overview/booking-properties-overview.md).
:::

## Example

The snippet below initializes Booking with a set of initial properties:

<iframe src="https://snippet.dhtmlx.com/6it4ohez?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
