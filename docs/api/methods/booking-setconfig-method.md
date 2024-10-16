---
sidebar_label: setConfig()
title: setConfig() Method
description: You can learn about the setConfig() method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# setConfig()

### Description

@short: Updates the current configuration of the Booking widget

The method is used to update the current configuration of the Booking widget. It's useful when there's a need to update the underlying data set of the widget.

### Usage

~~~jsx
setConfig(config: object): void;
~~~

### Parameters

- `config` - (required) an object of the Booking configuration. See the full list of properties [here](/api/overview/booking-properties-overview)

:::info
The method changes only the parameters you passed. It destroys the current component and initializes a new one.
:::

### Example

~~~jsx {}
// create Booking
const booking = new booking.Booking("#root", {
	data,
    cardShape: {
	    review: false,
	    subtitle: false,
	    details: false,
    };
    filterShape: {
        date: false,
        autoApply: true,
        time: [
            { from: 8, to: 11, label: "Morning" },
            { from: 12, to: 16, label: "Afternoon" },
            { from: 17, to: 20, label: "Evening" },
        ],
    }; 
});

//update configuration parameters
booking.setConfig({
    config: {
        cardShape: {
	        review: true,
	    };
        filterShape: {
            date: true,
            autoApply: false,
            time: [
                { from: 9, to: 11, label: "Morning" },
                { from: 13, to: 17, label: "Afternoon" },
                { from: 18, to: 20, label: "Evening" },
            ],
        }; 
    }
});
~~~

The snippet below demonstrates how to load already filtered data:

<iframe src="https://snippet.dhtmlx.com/f77ytme5?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>