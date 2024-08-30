---
sidebar_label: filterShape
title: filterShape
description: You can learn about the filterShape config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# filterShape

### Description

@short: Optional. An object of settings for managing the filter functionality

### Usage

~~~jsx {}
filterShape:{
    text?: boolean | [{
        id:string,
        suggest?:string,
    }],
    date?: boolean,
    time?: boolean | {
        from: number | string,
        to: number | string,
        label: string,
	};
};
~~~

### Parameters

- `text` - (optional) TBD
  - `id` - (required)
  - `suggest` - (required) TBD
- `date` - (optional) shows/hides the date field
- `time` - (optional) shows/hides the time field. If set to **true**, it takes an array of objects with time options for a slot. For each object you can specify the following parameters:
  - `from` - (optional) a start time
  - `to` - (optional) an end time
  - `label` - (optional) a time period label. If the `time` parameters are not set, the default values are applied:
    ~~~jsx {}
    [
        { from: 8, to: 12, label: "Morning" },
        { from: 12, to: 17, label: "Afternoon" },
        { from: 17, to: 20, label: "Evening" },
    ]
    ~~~


### Default config

~~~jsx {}
const defaultFilterShape = {
  text: true,
  date: true,
  time: defaultTimeRanges,
  autoApply: false,
};

const defaultTimeRanges = {
  {from: 8, to: 12, label: "Morning" },
  { from: 12, to: 17, label: "Afternoon" },
  { from: 17, to: 20, label: "Evening" },
};
~~~

### Example

~~~jsx {1-12,15}
const filterShape = {
    global: true,
    date: false,
    time: [
        { from: 8, to: 11, label: "Morning" },
        { from: 12, to: 16, label: "Afternoon" },
        { from: 17, to: 20, label: "Evening" },
    ],
    config: {
        debounce: 100,
    }
};

new booking.Booking("#root", {
	filterShape,
	// other parameters
});
~~~

**Related articles:**
