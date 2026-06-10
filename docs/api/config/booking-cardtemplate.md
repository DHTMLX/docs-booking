---
sidebar_label: cardTemplate
title: cardTemplate
description: You can learn about the cardTemplate config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# cardTemplate

### Description

@short: Optional. Allows applying a template to a card's left block

The property specifies the HTML structure and layout of each card's block (the left side of each card). It means you can manage which fields are displayed, how they are arranged, and how they look.

:::info
You can also specify which fields to display using the [`cardShape`](/api/config/booking-cardshape) property
:::

### Usage

~~~jsx {}
cardTemplate?: ({item: obj}) => string;
~~~

### Parameters

`cardTemplate` expects a function that takes an `item` (card) object as input and returns a string of HTML that defines how the card should look.

### Example

In the example below we create a function that takes the `item` (card) object and returns HTML for a card that includes a preview image (item.preview), category (item.category), title (item.title), and price (item.price). You need to create your own HTML template to be applied to a card and import the **template** helper. Then pass the function into the Booking configuration by assigning the function to the `cardTemplate` property.  

~~~html {}
<style>
    .custom-preview {
        display: flex;
        width: 100%;
        height: 100%;
        gap: 30px;
    }

    .preview-left {
        width: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    /* other styles */
</style>

<script>
    const { Booking, template } = booking; //import template helper

    function cardPreviewTemplate({ item }) {
        return `
            <div class="custom-preview" data-action="preview-click">
                <div class="preview-left">
                    <div
                        style="background-image: url(${item.preview})"
                        class="card-photo"
                    ></div>
                    <!-- <div class="card-photo-empty" /> -->
                    </div>

                    <div class="preview-right">
                    <div class="category">${item.category}</div>
                    <div class="title">${item.title}</div>
                    <div class="price">${item.price}</div>
                </div>
            </div>
            `;
    }

    const widget = new Booking("#root", {
	    data,
	    cardTemplate: template(item => cardPreviewTemplate(item)), // pass the function to Booking configuration
    });
    // other parameters
</script>
~~~


The snippet below demonstrates how to apply a template to the left block of a card:

<iframe src="https://snippet.dhtmlx.com/k2v01vng" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related articles:**

- [Defining the structure of cards](/guides/configuration/#defining-the-structure-of-cards)
- [`cardShape`](/api/config/booking-cardshape)
