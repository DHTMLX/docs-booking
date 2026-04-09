---
sidebar_label: Loading data
title: Loading data
description: You can learn how to load data into Booking in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Load data

Booking loads data through the following property:

- [`data`](/api/config/booking-data) — an array of objects containing card data

Prepare data in a separate file. The example below shows a sample data file with three cards:

~~~jsx title="data.js"
const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "$35",
        review: {
            stars: 4,
            count: 120
        },
        slots: [
            {
                from: 9, to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10, to: 18,
                days: [6, 0]
            }
        ]
    },
    {
        id: "5c9b64ad-1830-4e5b-a5f9-8acea10706df",
        title: "James Anderson",
        category: "Allergist",
        subtitle: "3 years of experience",
        details: "UCLA Medical Center\n57 Westwood Plaza",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/11.jpg",
        price: "$30",
        review: {
            stars: 4,
            count: 64
        },
        slotSize: 45,
        slotGap: 10,
        slots: [
            {
                from: "9:15", to: 17,
                days: [1, 2, 3, 4, 5]
            }
        ]
    },
    {
        id: "9b037564-77be-429f-b719-eebbe499027a",
        title: "Emma Johnson",
        category: "Cardiologist",
        subtitle: "2 years of experience",
        details: "Stanford Health Care\n1468 Madison Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/03.jpg",
        price: "$25",
        review: {
            stars: 5,
            count: 10
        },
        slots: [
            {
                from: 14, to: 17,
                size: 30, gap: 10
            },
            {
                from: 12, to: 19,
                size: 50, gap: 20,
                days: [2], dates: [getDate(0)]
            },
            {
                from: "18:30", to: 20,
                size: 20, gap: 20,
                days: [3, 4, 5]
            },
        ],
        usedSlots: [getDate(0, 12), getDate(0, 18)]
    }
];
~~~

Load JSON data into Booking from a local file or a server-side script after initializing the component.

## Load data from a local file

To load local data from a file, prepare the source file first.

The following code snippet defines a `getData` function that returns card data and card shape configuration:

~~~jsx {}
function getData() {
    return {
        data,
        cardShape
    };
}

const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "$35",
        review: {
            stars: 4,
            count: 120
        },
        slots: [
            {
                from: 9, to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10, to: 18,
                days: [6, 0]
            }
        ]
    },
    //other data
];

const cardShape = {
    preview: true,
    review: true,
    category: true,
    title: true,
    subtitle: true,
    price: true,
    details: true
};
~~~

Add the path to the data file in your HTML:

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>  
<link rel="stylesheet" href="./dist/booking.css">

<script src="./common/data.js"></script>
~~~

Initialize Booking and pass data from the file:

~~~jsx {}
const { data } = getData();
const booking = new booking.Booking("#root", { data });
~~~

## Load data from a server

To load data from the server, see [Saving slot reservations to the server](/guides/saving-reservations).

---

**Related articles**:

- [`confirmSlot`](/api/events/booking-confirmslot-event) — fires when a user confirms a booking slot
- [`setConfig()`](/api/methods/booking-setconfig-method) — updates Booking configuration at runtime
- [`setConfirmHandler()`](/api/methods/booking-setconfirmhandler-method) — sets a custom handler for booking confirmation
- [`renderType`](/api/config/booking-rendertype) — controls how cards are rendered
- [Saving slot reservations to the server](/guides/saving-reservations)
