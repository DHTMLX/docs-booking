---
sidebar_label: Styling
title: Styling
description: You can learn about Styling in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Styling

## Default style

tbd


## Built-in theme

The widget provides the next built-in themes: /// 

You can apply the theme via adding the corresponding *CSS* classes to the widget container:

~~~html {}
<!-- Booking container -->
<div id="root" class="wx-material-theme"></div>
~~~

or just include the theme on the page from the skins folder:

~~~html {}
<link type="stylesheet" href="path/to/booking/skins/material.css"/>
~~~

## Customize built-in theme

The example below demonstrates how to customize the **Material** theme that is applied to Booking:

~~~html
<style>
    .wx-material-theme {
        color-scheme: dark;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-icon-color-hover: rgba(255, 255, 255, 0.2);
        --wx-background: #949393;
        --wx-booking-background: #c0bbbb;
        --wx-background-alt: #a5a3a3;
        --wx-booking-content-background: #a3a1a1;
        --wx-border: 1px solid #818080;
        --wx-border-medium: 1px solid #9e9e9e;
        --wx-input-background: #d6d3d3;
    }
</style>
~~~

## Custom styles

To customize the appearance of Booking to your project needs, you need to apply the corresponding CSS variables. 

~~~html
<div id="root" class="demo"></div>
<style>
    .demo {
        --wx-background: #c4c7e0;
        --wx-color-font: rgba(12, 12, 116, 0.9);
        --wx-color-secondary-font: rgba(34, 33, 33, 0.904);
        --wx-icon-color: rgba(149, 179, 223, 0.7);
        --wx-booking-primary-hover: #194e9e;
        --wx-booking-border-color: 1px solid #818080;
        --wx-border: 1px dashed #818080;
        
    }
</style>
~~~

The next example shows how to change the background color for cards:

~~~html
<style>
.demo {
    .wx-booking .wx-list > .wx-card,
    .wx-booking .wx-slot-dates > .wx-date-item {
        background-color: #e8f3f7;
    }

    .wx-booking .wx-slot-dates > .wx-date-item.selected {
        background-color: #bfdde7;
    }
}
</style>
~~~

## Example

In this snippet you can see how to apply a custom style to Booking: 

<iframe src="https://snippet.dhtmlx.com/" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 