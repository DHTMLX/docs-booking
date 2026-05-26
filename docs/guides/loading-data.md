---
sidebar_label: Loading data
title: Loading data
description: You can learn how to load data into Booking in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Loading data

The Booking widget accepts a single dataset through the configuration object:

- [`data`](/api/config/booking-data) — array of card objects with slot rules

:::tip
For large datasets, enable lazy rendering with the [`renderType`](/api/config/booking-rendertype) property so the widget renders only visible cards.
:::

## Prepare a sample dataset

Keep card data in a separate file to share the dataset across pages and tests. Each card object includes identifying fields, display fields, and a `slots` array that defines availability rules.

The following code snippet defines three card objects in a *data.js* module:

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

## Load data from a local file

Load card data from a separate JavaScript file by exposing the dataset through a helper function.

The following code snippet defines `getData()`, which returns both `data` and a `cardShape` config:

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
    // other cards
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

Include the data file on the page after the Booking source files.

The following code snippet wires the *data.js* module into *index.html*:

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>  
<link rel="stylesheet" href="./dist/booking.css">

<script src="./common/data.js"></script>
~~~

Pass the dataset returned by `getData()` to the Booking constructor.

The following code snippet creates a Booking instance with the loaded data:

~~~jsx {}
const { data } = getData();
const booking = new booking.Booking("#root", { data });
~~~

## Update data after initialization

To replace the dataset after Booking is initialized, call the [`setConfig()`](/api/methods/booking-setconfig-method) method with a new `data` array. The method re-initializes the widget with the merged configuration.

The following code snippet fetches a fresh dataset from the server and applies it to the existing Booking instance:

~~~jsx {}
fetch("/api/cards")
    .then(res => res.json())
    .then(data => {
        booking.setConfig({ data });
    });
~~~

For server-side persistence of bookings, see the [Saving reservations to the server](/guides/saving-reservations) guide.

---

**Related articles**:

- [`confirm-slot`](/api/events/booking-confirmslot-event) — handle slot booking confirmation
- [`setConfig()`](/api/methods/booking-setconfig-method) — update the widget configuration after initialization
- [`setConfirmHandler()`](/api/methods/booking-setconfirmhandler-method) — define the slot confirmation handler
- [`renderType`](/api/config/booking-rendertype) — switch between default and lazy rendering
- [Saving reservations to the server](/guides/saving-reservations) — persist bookings server-side
