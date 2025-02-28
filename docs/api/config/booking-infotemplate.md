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
infoTemplate?: ({item: obj, slot: number}) => string;
~~~

### Parameters

`infoTemplate` takes the `card` item object and selected `slot` timestamp as input and returns a string of HTML.


### Example

In the example below, we define the `cardInfoTemplate` function that will generate the custom HTML for the information block. This function will receive the `item` (card object) and `slot` (slot timestamp) as input parameters. The function returns div containers representing the information block for a selected booking item, including an image, category, title, and formatted date. We also assign our custom function to `infoTemplate`.

~~~html
<style>
	.custom-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.info-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding: 34px;
		background: rgba(128, 128, 155, 0.12);
		border-radius: 8px;
	}
    /* other styles */
</style>

<script>
    const { Booking, template } = booking; // import template helper

    function cardInfoTemplate({
        item,
        slot,
    }) {
            return `
                <div class="custom-info">
                    <div class="info-wrapper">
                        <div class="photo-wrapper">
                            ${getPhotoElement(item.preview, "info")}
                        </div>
                        <span class="info-title">${item.title}</span>
                        <span class="info-category">${item.category}</span>
                        <div class="date" data-action="reset-slot">
                            <i class="icon wxi-calendar"></i>
                            <span>${formatDate(slot, { dateFormat, timeFormat })}</span>
                        </div>
                    </div>
                </div>
            `;
        }

    const widget = new Booking("#root", {
	    data,
	    infoTemplate: template(item => cardInfoTemplate(item)), // pass the function to the widget configuration
    });
</script>
~~~

The snippet below shows how to apply a template to the information block of the Booking dialog: !!!tbd

<iframe src="https://snippet.dhtmlx.com" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
You can also control which fields to display in the information block of the Booking dialog using the [`infoShape`](/api/config/booking-infoshape) property. But if both properties are applied, `infoTemplate` will override the `infoShape` settings.
:::

**Related articles:** 

- [Configuring the Booking dialog](/guides/configuration/#configuring-the-booking-dialog)
- [`infoShape`](/api/config/booking-infoshape)