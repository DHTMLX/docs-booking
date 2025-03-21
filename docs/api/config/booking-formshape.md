---
sidebar_label: formShape
title: formShape
description: You can learn about the formShape config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# formShape

### Description

@short: Optional. An array of objects containing settings for configuring fields in the Booking dialog

### Usage

~~~jsx {}
formShape: {
    comp: "text" | "textarea",
    key: string,
    label?: string,
    required?: boolean
};
~~~

### Parameters

For each field you can specify the following parameters:

- `comp` - (required) the field type (**text** or **textarea**)
- `key` - (required) the id of a field
- `label` - (optional) the field label
- `required` - (optional) if the value is set to **true**, the field should not be empty and it's required to submit the booking form; if **false**, the field can be empty

### Default config

~~~jsx {}
const defaultFormShape = [
    {
        comp: "text",
        key: "name",
        label: "Name",
        required: true,
        validation: val => {
            return !!val.replace(/\s/g, "");
        },
        errorMessage: " should not be empty"
    },
    {
        comp: "text",
        key: "email",
        label: "Email",
        required: true,
        validation: val => {
            const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return val && regEx.test(val);
        },
        errorMessage: " should contain valid email address"
    },
    {
        comp: "textarea",
        key: "description",
        label: "Description"
    }
];
~~~

### Example

~~~jsx {1-17,21}
const formShape = [
    {
        type: "text",
        key: "name",
        label: "Name"
    },
    {
        type: "text",
        key: "contact",
        label: "Mobile"
    },
    {
        type: "textarea",
        key: "description",
        label: "Details"
    },
];

new booking.Booking("#root", {
    data,
    formShape,
    // other parameters
});
~~~

The snippet below shows how to configure the fields in the Booking dialog:

<iframe src="https://snippet.dhtmlx.com/yeqkuzx7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
