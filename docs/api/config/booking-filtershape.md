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
filterShape: {
    text?: boolean | [{
        id: string,
        label?: string,
        suggest?: boolean, 
    }],
    date?: boolean,
    time?: boolean | [{
        from: number | string,
        to: number | string,
        label?: string,
	}],
    autoApply?: boolean
};
~~~

### Parameters

- `text` - (optional) if **true**, the text input field is displayed (default); if **false**, the text field is hidden
  - `id` - (required) the id of a card
  - `suggest` - (required) if **true**, the auto-complete is enabled and the values (from the [`data`](/api/config/booking-data) object) that match a user's input text will be displayed 
  - `label` - (optional) the label for the property from the `data` object. See [Default config](#default-config) below.
- `date` - (optional) shows/hides the date field; **true** is set by default (the field is shown)
- `time` - (optional) shows/hides the time field. If set to **true**, it takes an array of objects with default time options for a slot. For each object you can specify the following parameters:
  - `from` - (required) the start time for a slot; it can be a number from 0 to 24 that specifies the time in hours (e.g., 9 means 9:00, 8.5 means 8:30) or a string in the format "h:m" (for example, "8:30")
  - `to` - (required) the end time for a slot; it can be a number from 0 to 24 that specifies the time in hours (e.g., 9 means 9:00, 8.5 means 8:30) or a string in the format "h:m" (for example, "8:30")
  - `label` - (optional) placeholder for the time field
If the `time` parameters are not set, the default values are applied: see [Default config](#default-config) below.
- `autoApply` - (optional) if **true**, the search criteria will be automatically applied (no need to initiate the search by clicking the button); **false** is set by default

### Default config

~~~jsx {}
const defaultTimeRanges = [
    { from: 8, to: 12, label: "Morning" },
    { from: 12, to: 17, label: "Afternoon" },
    { from: 17, to: 20, label: "Evening" },
];

const defaultFilterShape = {
    text: [
        { id: "category", label: "speciality", suggest: true },
        { id: "title", label: "specialist", suggest: true },
        { id: "details", label: "location" },
    ],
    date: true,
    time: defaultTimeRanges,
    autoApply: false,
};
~~~

### Example

~~~jsx {1-9,13}
const filterShape = {
    date: false,
    autoApply: true,
    time: [
        { from: 8, to: 11, label: "Morning" },
        { from: 12, to: 16, label: "Afternoon" },
        { from: 17, to: 20, label: "Evening" },
    ],
};

new booking.Booking("#root", {
    data,
    filterShape,
    // other parameters
});
~~~

**Related articles:**
