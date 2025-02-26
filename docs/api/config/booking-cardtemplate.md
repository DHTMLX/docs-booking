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
cardTemplate?: (item: obj) => string;
~~~

### Parameters

`cardTemplate` expects a function that takes a `card` object as input and returns a string of HTML that defines how the card should look.

### Example

In the example below we create a function that takes the card object and returns HTML for a card (that includes a preview image (card.preview), category (card.category), title (card.title), and price (card.price)). You need to create your own HTML template to be applied to a card. Pass the function into the Booking configuration by assigning the function to the `cardTemplate` property.  

~~~jsx {}
function cardPreviewTemplate({ card }) {
	return `
        <div class="custom-preview" data-action="preview-click">
            <div class="preview-left">
                <div
                    style="background-image: url(${card.preview})"
                    class="card-photo"
                ></div>
                <!-- <div class="card-photo-empty" /> -->
                </div>

                <div class="preview-right">
                <div class="category">${card.category}</div>
                <div class="title">${card.title}</div>
                <div class="price">${card.price}</div>
                </div>
                </div>
                `;
}

const widget = new Booking("#root", {
	data,
	cardTemplate: template(card => cardPreviewTemplate(card)),
});
// other parameters
~~~

If you want to modify default styles, add styles to your CSS:

~~~css
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

.preview-right {
	flex-grow: 1;
	align-self: center;
	overflow: hidden;
	font-family: 'Maven Pro', sans-serif;
	line-height: var(--wx-line-height-md);
	position: relative;
	background-color: rgb(233, 235, 236);
	color: rgb(75, 74, 74);
	padding: 20px;
	border-radius: 10px;
   	transition: all 1s;
}
//other styles
~~~

TBD!!!
The snippet below demonstrates how to apply a template to a card:

<iframe src="https://snippet.dhtmlx.com" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related articles:** 

- [Defining the structure of cards](/guides/configuration/#defining-the-structure-of-cards)
- [`cardShape`](/api/config/booking-cardshape)

