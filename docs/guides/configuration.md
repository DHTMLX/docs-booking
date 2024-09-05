---
sidebar_label: Configuration
title: Configuration
description: You can learn about the configuration in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Configuration


## Adding cards

To add a card with data, you should add an object to the [`data`](/api/config/booking-data) array. Using `data` parameters you are enabled to add plenty of information to a card, such as its name, category, rating information, slots for booking (both available and used slots), and more. Please, refer to [`data`](/api/config/booking-data) for the description of parameters.

~~~jsx
const data = [
	{
        id: "7d1bc2e1-df36-413b-8154-591e5f176fb1",
        title: "Barnett Mueller",
        category: "Allergist",
        subtitle: "6 years of experience",
        details: "Navy Street 1\nKiskimere, United States",
        preview: "",
        price: "22 $",
        review: {
            stars: 0,
            count: 88,
        },
        slots: [{ from: 15, to: 18, size: 20, gap: 10 }],
    },
];

new booking.Booking("#root", {
	data,
	// other parameters
});
~~~

## Defining the structure of cards

You can configure what information all cards will display on their left side using the [`cardShape`](/api/config/booking-cardshape) property.

On the left side of a card the following information items are displayed by default:
- preview: card image
- review: rating information with the number of rating stars (out of five) and the number of reviews
- category: the subtitle of a card
- title: the title of a card which is a specialist's name
- subtitle: the subtitle of a card. for example, experience details 
- price: the price of the service
- details: other details of a card

To hide any information block from cards' display, set the appropriate parameter value of the [`cardShape`](/api/config/booking-cardshape) property to **false**.

Example:

~~~jsx
    const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Allergist",
        subtitle: "2 years of experiece",
        details: "Lexington Avenue 54\nWheatfields, Hungary",
        preview: "https://files.webix.com/30d/d34de82e0a8e3b561988a46ce1e86743/stock-photo-doc.jpg",
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
    ];

    const cardShape = {
    preview: true,
    review: true,
    category: true,
    title: true,
    subtitle: true,
    price: true,
    details: false,
    };

    new booking.Booking("#root", {
        data,
        cardShape,
        // other parameters
    });
~~~

## Filling cards with slots

A slot is a time unit available for booking. Available slots are displayed for the next five days starting from the current day or from the start date from the filter. 

To add booking slots to a card, use the `slots` parameter of the [`data`](/api/config/booking-data) property. You can apply one common slots rule to all days of the required card and specific rules to selected days or even dates. 

For example, if you want to add booking slots with the same parameters to all days of the selected card, i.e., add slots with the same duration, the same start and end time to all days of the selected card, you should add one object to the `slots` array with the required parameters. 

Example:

~~~jsx
const cards = [
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
            star: 1,
            count: 40,
        },
        slots: [
            {
                //a common rule for all days\
                from: 14, //slots start time
                to: 17, // slots end time
                size: 30, // each slot duration in minutes
                gap: 10, // a gap between slots
            },
        ],
    },]

new booking.Booking("#root", {
	data,
	// other parameters
});
~~~
    
But if you need to add slots with one set of parameters to some days of the week and other parameters to the other days, you need to add several objects to the `slots` array and specify days/dates to which these parameters should be applied.  

Example:

~~~jsx 
const cards = [
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
            star: 1,
            count: 40,
        },
        slots: [
            {
                //a common slot rule for all days except those specified for the days and dates below
                from: 14,
                to: 17,
                size: 30,
                gap: 10,
            },
            {
                //this rule is applied to days 2 and 5 (Tuesdays and Fridays) except
                //the Friday from the slot object below
                from: 12,
                to: 17,
                size: 50,
                gap: 20,
                days: [2, 5],
            },
            {
                //this rule is applied to days 3 and 4 (Wed and Thu) and exact date
                from: 18,
                to: 20,
                size: 45,
                gap: 20,
                days: [1, 3],
                dates: [ 1683234000000 ] // exact upcoming date (May 5, 2023, Friday)
            },
        ],
    },]
		
new booking.Booking("#root", {
	data,
	// other parameters
});
~~~

:::note
In case you have common slots parameters and specific parameters for some days, you should be aware of the following: 
- Slot parameters specified for days will override common parameters defined for all days. 
- Slot parameters specified for dates will override parameters defined for specific days and all days. 
- If several slots objects are created for the same day, make sure that slots time ranges (**from** and **to**) do not overlap, otherwise, all slots data for these days will not be applied.  
:::

## Marking slots as used or available

To mark slots as used (booked) and make them not visible for a user, use the `usedSlots` parameter of the [`data`](/api/config/booking-data) property.

Example:

~~~jsx
const cards = [
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
            star: 1,
            count: 40,
        },
        slots: [
            {
                //a common rule for all days\
                from: 14, //slots start time
                to: 17, // slots end time
                size: 30, // each slot duration in minutes
                gap: 10, // a gap between slots
            },
        ],
        usedSlots: [ 1683234000000 ], // an array of timestamps of booked slots in milliseconds
    },]

new booking.Booking("#root", {
	data,
	// other parameters
});
~~~

To mark available slots, use the `availableSlots` parameter of the `cards` property.

If available slots are specified here, all slots from the `slots` array are ignored (i.e., become unavailable).

Example:

~~~jsx
const cards = [
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
            star: 1,
            count: 40,
        },
        slots: [
            {
                //a common rule for all days\
                from: 14, //slots start time
                to: 17, // slots end time
                size: 30, // each slot duration in minutes
                gap: 10, // a gap between slots
            },
        ],
        availableSlots: [ 1693325145000, 1693584345000 ], // an array of timestamps of available slots in milliseconds
    },]

new booking.Booking("#root", {
	data,
	// other parameters
});
~~~





