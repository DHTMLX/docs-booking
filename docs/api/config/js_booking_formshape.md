---
sidebar_label: formShape
title: formShape
description: You can learn about the formShape config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# formShape

### Description

@short: Optional. An array of objects containing settings for managing the appearance and functionality of the Reservation editor

### Usage

~~~jsx {}
formShape?: [
    {
        type: "text" | "area",
        name: string,
        label: string,
    }
];
~~~

### Parameters

For each field you can specify the following parameters:

- `type` - (optional) the field type (**text** or **area**)
- `name` - (optional) the field name
- `label` - (optional) the field label

### Default config

~~~jsx {}
const defaultFormShape = {
	...
};
~~~

### Example

~~~jsx {1-17,20}
const formShape = [
    {
        type: "text",
        name: "name",
        label: "Name",
    },
    {
        type: "text",
        name: "email",
        label: "eMail",
    },
    {
        type: "area",
        name: "description",
        label: "Details",
    },
];

new booking.Booking("#root", {
	formShape,
	// other parameters
});
~~~

**Related articles:**
