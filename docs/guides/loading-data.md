---
sidebar_label: Loading data
title: Loading data
description: You can learn how to load data into Booking in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Loading data

## Preparing data

The following information can be loaded into Booking:

- [`data`](/api/properties/booking-data) - an array of objects containing cards data 

You can prepare data in a separate file. Here is an example of an appropriate data set:

~~~jsx title="data.js"
const data = [
		{
			id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
			title: "Debra Weeks",
			category: "Allergist",
			subtitle: "7 years of experience",
			details:
				"Silverstone Medical Center (Vanderbilt Avenue 13, Chestnut, New Zealand)",
			preview:
				"https://files.webix.com/30d/d34de82e0a8e3b561988a46ce1e86743/stock-photo-doc.jpg",
			price: "37 $",
			review: {
				stars: 1,
				count: 40,
			},
		},
		{
			id: "9b037564-77be-429f-b719-eebbe499027a",
			title: "Conrad Hubbard",
			category: "Allergist",
			subtitle: "2 years of experience",
			details:
				"Desert Springs Hospital (Schroeders Avenue 90, Fannett, Ethiopia)",
			preview:
				"https://files.webix.com/30d/d34de82e0a8e3b561988a46ce1e86743/stock-photo-doc.jpg",
			price: "25 $",
			review: {
				stars: 1,
				count: 10,
			},
		},
		{
			id: "7d1bc2e1-df36-413b-8154-591e5f176fb1",
			title: "Barnett Mueller",
			category: "Allergist",
			subtitle: "6 years of experience",
			details: "Navy Street 1, Kiskimere, United States",
			preview: "",
			price: "22 $",
			review: {
				stars: 0,
				count: 88,
			},
		},
		{
			id: "af98c3e8-0ae1-4472-bdff-1d3c246abae5",
			title: "Myrtle Wise",
			category: "Allergist",
			subtitle: "4 years of experience",
			details: "Prescott Place 5, Freeburn, Bulgaria",
			preview: "",
			price: "22 $",
			review: {
				stars: 4,
				count: 127,
			},
		},
		{
			id: "39bfd8a2-c6c9-469c-8d0c-061656e0fbc0",
			title: "Browning Peck",
			category: "Allergist",
			subtitle: "11 years of experience",
			details: "Seacoast Terrace 174, Belvoir, Mauritania",
			preview: "",
			price: "29 $",
			review: {
				stars: 0,
				count: 192,
			},
		},
		{
			id: "a3589553-73bb-4c3b-8c59-1a1be0db71b7",
			title: "Holder Holman",
			category: "Allergist",
			subtitle: "7 years of experience",
			details: "Cropsey Avenue 5, Odessa, Puerto Rico",
			preview: "",
			price: "38 $",
			review: {
				stars: 2,
				count: 181,
			},
		},
	];
~~~

## Loading data from a local source

You can load JSON data into Booking from an external file or the server-side script after the component has been initialized.

To load local data from a separate file, first prepare the source file with data.

Example:

~~~jsx
function getData() {
  return {
    data,
    cardShape,
  };
}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Debra Weeks",
        category: "Allergist",
        subtitle: "7 years of experience",
        details: "Silverstone Medical Center (Vanderbilt Avenue 13, Chestnut, New Zealand)",
        preview: "https://files.webix.com/30d/d34de82e0a8e3b561988a46ce1e86743/stock-photo-doc.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40,
            },
	},
    //other data
],

const cardShape = {
    preview: true,
    review: true,
    category: true,
    title: true,
    subtitle: true,
    price: true,
    details: true,
};
~~~

Second, add the path to the source data file:

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>  
<link rel="stylesheet" href="./dist/booking.css">

<script src="./common/data.js"></script>
~~~

Create Booking and load data: 

~~~jsx {}
const { data } = getData();
const widget = new booking.Booking("#root", { data });
~~~

To get server data, you can send the request for data using the native **fetch** method (or any other way):

~~~jsx
const widget = new booking.Booking("#booking", {data: []});
const server = "https://some-backend-url";

Promise.all([
   fetch(server + "/data").then((res) => res.json()),
   ]).then(([data]) => {
   widget.setConfig({data});
 });
~~~
