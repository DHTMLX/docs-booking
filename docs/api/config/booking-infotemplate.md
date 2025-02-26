---
sidebar_label: infoTemplate
title: infoTemplate
description: You can learn about the infoTemplate config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# infoTemplate

### Description

@short: Optional. Allows applying a template to the information block in the Booking dialog

### Usage

~~~jsx {}
infoTemplate?: (item: obj, slot: obj) => string;
~~~

### Parameters

`infoTemplate` takes the `card` item object and selected `slot` object as input and returns a string of HTML.


### Example

In the example below, we define the `customInfoTemplate` function that will generate the custom HTML for the information block. This function will receive the `selectedItem` (card) and the `formattedDate` (slot) as input parameters. The function returns div containers representing the information block for a selected booking item, including an image, price, category, title, and formatted date. We also assign our custom function to `infoTemplate`.

~~~jsx {}
function customInfoTemplate({ selectedItem, formattedDate, _ }) {
    return `
        <div class="custom-info">
            ${
                selectedItem.preview
                    ? `<div style="background-image: url(${selectedItem.preview})" class="photo"></div>`
                    : `<div class="photo-empty"></div>`
            }

            <div class="price">
                <i class="icon wxi-cash"></i>
                <span>${selectedItem.price}</span>
            </div>
            <span class="category">${_(selectedItem.category)}</span>
            <span class="title">${selectedItem.title}</span>
            <div class="date" data-action="reset-slot">
                <i class="icon wxi-calendar"></i>
                <span>${formattedDate}</span>
            </div>
        </div>
    `;
}
const widget = new Booking("#root", {
    data,
    infoTemplate: template(selectedItem => customInfoTemplate(selectedItem)),
    // other settings
});

~~~

The snippet below shows how to apply a template to the information block of the Booking dialog: !!!tbd

<iframe src="https://snippet.dhtmlx.com" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
You can also control which fields to display in the information block of the Booking dialog using the [`infoShape`](/api/config/booking-infoshape) property. But if both properties are applied, `infoTemplate` will override the `infoShape` settings.
:::

**Related articles:** 

- [Configuring the Booking dialog](/guides/configuration/#configuring-the-booking-dialog)
- [`infoShape`](/api/config/booking-infoshape)