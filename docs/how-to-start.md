---
sidebar_label: How to start
title: How to start
description: You can explore how to start working with DHTMLX Booking in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# How to start

This clear and comprehensive tutorial will guide your through the steps you need to take in order to get a full-functional Booking application on a page.

![main](assets/main.png)

## Step 1. Downloading and installing packages

[Download the package](https://dhtmlx.com/docs/products/dhtmlxbooking/download.shtml) and unpack it into a folder of your project.

You can import JavaScript Booking into your project using `yarn` or `npm` package manager.

#### Installing trial Booking via npm and yarn

:::info
If you want to use the trial version of Booking, download the trial [booking package](https://dhtmlx.com/docs/products/dhtmlxbooking/download.shtml) and follow the steps mentioned in the *README* file. Note that trial booking is available for 30 days only.
:::

#### Installing PRO Booking via npm and yarn

:::info
If you have already purchased Booking under the proprietary license, send your **license number** to the *contact@dhtmlx.com* email in order to receive *login* and *password* for private **npm** as well as detailed guide on how to install Booking. Note that private **npm** is available before the expiration of the proprietary Booking license.
:::

## Step 2. Including source files

Start from creating an HTML file and call it *index.html*. Then proceed to include Booking source files into the created file.

There are two necessary files:

- the JS file of booking
- the CSS file of booking

~~~html {5-6} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Booking</title>
        <script src="./dist/booking.js"></script>   
        <link href="./dist/booking.css" rel="stylesheet">
    </head>
    <body>
        <script>
        // your code will be here
        </script>
    </body>
</html>
~~~

:::tip
If you want to integrate JavaScript Booking into React, Angular or Vue projects, refer to the corresponding [**Examples on CodeSandbox**](https://codesandbox.io/u/DHTMLX) for more information.
:::

## Step 3. Creating booking

Now you are ready to add booking to the page. First, let's create the DIV container for Booking. 

~~~html {} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Booking</title>
        <script src="./dist/booking.js"></script>   
        <link href="./dist/booking.css" rel="stylesheet">  
    </head>
    <body>
        <div id="root"></div>
        <script>
            const widget = new booking.Booking("#root", {
                // configuration properties
            });
        </script>
    </body>
</html>
~~~

## Step 4. Configuring Booking

To start working with Booking, first you need to provide the initial data, and then you can add other configuration properties you want to be applied at the initialization. The example below creates Booking with two cards:
- the [`data`](/api/config/booking-data) property allows adding data to each card, such as title, image, rating data, and booking slots
- the [`cardShape`](/api/config/booking-infoshape) property helps to configure which cards' data fields to display 

~~~jsx
const data = [
		{
			id: "ee828b5d-a034-420c-889b-978840015d6a",
			title: "Natalie Tyson",
			category: "Allergist",
			subtitle: "2 years of experiece",
			details: "Lexington Avenue 54\nWheatfields, Hungary",
			preview:
				"https://files.webix.com/30d/d34de82e0a8e3b561988a46ce1e86743/stock-photo-doc.jpg",
			price: "27 $",
			review: {
				stars: 4,
				count: 120,
			},
			slots: [
				{
					from: 9,
					to: 21,
					days: [1, 2, 3, 4, 5],
				},
				{
					from: 10,
					to: 18,
					days: [6, 0],
				},
			],
		},
		{
			id: "5c9b64ad-1830-4e5b-a5f9-8acea10706df",
			title: "Luz Lancaster",
			category: "Allergist",
			subtitle: "3 years of experiece",
			details: "Ludlam Place 128\nMooresburg, Antigua and Barbuda",
			preview:
				"https://files.webix.com/30d/d34de82e0a8e3b561988a46ce1e86743/stock-photo-doc.jpg",
			price: "27 $",
			review: {
				stars: 4,
				count: 64,
			},
			slotSize: 45,
			slotGap: 10,
			slots: [
				{
					from: 9,
					to: 17,
					days: [1, 2, 3, 4, 5],
				},
			],
		},
]

const cardShape = {
	review: false,
	subtitle: false,
	price: false,
};

new booking.Booking("#root", {
	data,
	cardShape,
	// other parameters
});
~~~

## What's next

That's all you need to create a simple Booking on a page. Now you are ready to embark on a journey with the Booking API:

- [Guides](/category/guides) pages provide instructions about installation, loading data, styling, and other helpful tips to go smoothly with the Booking configuration
- [API reference](/api/overview/booking-api-overview) gives description of the Booking functionality