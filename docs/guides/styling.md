---
sidebar_label: Styling
title: Styling
description: You can learn about Styling in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Styling

Customize the Booking widget through CSS custom properties. The widget exposes Booking-specific layout tokens under the `--wx-booking-*` namespace and shares generic design tokens (colors, borders, typography) under the `--wx-*` namespace.

## Default style

The Booking widget uses CSS custom properties for layout dimensions and shared theme tokens. Override these variables in your own CSS to customize the appearance.

The following code snippet shows a subset of Booking-specific variables exposed by the widget:

~~~css
.wx-booking {
    --wx-booking-content-min-width: 984px;
    --wx-booking-content-max-width: 1132px;
    --wx-booking-content-padding: 0 74px 28px;
    --wx-booking-slots-width: 602px;
    --wx-booking-slots-padding: 0 30px 0 50px;
    --wx-booking-separator: var(--wx-border);
}
~~~

:::tip Note
Next versions of Booking can bring changes for variable names. Check the names after updating to a newer version and adjust your code to avoid display issues.
:::

## Apply the built-in theme

The widget provides one built-in theme — the Material theme.

Apply the theme by adding the corresponding CSS class to the widget container.

The following code snippet attaches the Material theme to the Booking container:

~~~html {}
<!-- Booking container -->
<div id="root" class="wx-material-theme"></div>
~~~

To load the theme stylesheet from the skins folder, add a link tag on the page.

The following code snippet includes the Material theme stylesheet:

~~~html {}
<link rel="stylesheet" href="path/to/booking/skins/material.css"/>
~~~

## Customize the built-in theme

Override the Material theme variables under the `.wx-material-theme` selector.

The following code snippet recolors the Material theme for a dark layout:

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

## Apply custom styles

To match your project design, scope the CSS variables under a custom class on the Booking container.

The following code snippet defines a custom palette for the `.demo` container:

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

The following code snippet changes the background color of cards and the date items:

~~~html
<style>
    .demo {
        .wx-booking .wx-list > .wx-card,
        .wx-booking .wx-slot-dates > .wx-date-item {
            background-color: #e8f3f7;
        }

        .wx-booking .wx-slot-dates > .wx-date-item.wx-selected {
            background-color: #bfdde7;
        }
    }
</style>
~~~

## Example

The snippet below demonstrates a custom Booking style:

<iframe src="https://snippet.dhtmlx.com/d7w3jtqz?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
