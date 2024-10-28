---
sidebar_label: Configuration
title: Configuration
description: You can learn about the configuration in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Configuration


## Loading data for cards

To load data, add data to the [`data`](/api/config/booking-data) array. See all instructions here: [`Loading data`](/guides/loading-data).


## Defining the structure of cards

You can configure what information all cards will display on their left side using the [`cardShape`](/api/config/booking-cardshape) property.

On the left side of a card the following data fields are displayed by default:
- preview: card image
- review: rating information with the number of rating stars (out of five) and the number of reviews
- category: the subtitle of a card
- title: the title of a card which is a specialist's name
- subtitle: the subtitle of a card, for example, experience details 
- price: the price of the service
- details: other details of a card

To hide any information block from cards' display, set the appropriate parameter value of the [`cardShape`](/api/config/booking-cardshape) property to **false**.

Example:

~~~jsx {24}
const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Allergist",
        subtitle: "2 years of experience",
        details: "Lexington Avenue 54\nWheatfields, Hungary",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "27 $",
        review: {
        stars: 4,
        count: 120,
    },
        slots: [
            {
                from: 9,
                to: 21,
            },
        ],
    },
];

const cardShape = {
    details: false,
};

new booking.Booking("#root", {
    data,
    cardShape,
    // other parameters
});
~~~

:::info
Please, see an example in the [snippet tool](https://snippet.dhtmlx.com/6mxd7918)
:::

## Filling cards with slots

A slot is a time unit available for booking. Available slots for cards are displayed for the next five days starting from the current day or from the start date from the filter. 

### Adding slots for booking

To add booking slots to a card, add an object to the `slots` array of the [`data`](/api/config/booking-data) property.
In the example below, the slots are added for the specified card for Tuesdays and Fridays from 12 a.m. to 6 p.m and each slot duration is 30 minutes with 10-minutes gap between slots. 

~~~jsx {15-22}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            star: 1,
            count: 40,
        },
        slots: [
            {
                from: 12,
                to: 18,
                size: 30,
                gap: 10,
                days: [2, 5],
            },

            {...}, //other slots
        ],
    },]
		
new booking.Booking("#root", {
	data,
	// other parameters
});
~~~

### Defining slot rules

Parameters of each object in the `slots` array of the [`data`](/api/config/booking-data) property allow specifying the next settings: 

- slots start and end time
- slot sizes (duration in minutes)
- slot gaps (the length between slot)
- days to which slots should be applied

When applying these rules, you can apply one common rule to all days of the required card or apply different rules (specific rules to selected days or even dates), namely, you can:  

- set the same parameters to all days of a specific card, which means you can add slots with the same duration, the same start and end time to all days of the selected card
- set different slot duration and slot gaps to the same card by applying different parameters to days of the week of the same card or specific dates

When applying **slot size and gap**, you can:
- set specific values to specific slots of the required card(s) using the `size` and `gap` parameters in the `slots` array of the [`data`](/api/config/booking-data) property (these values have the highest priority and will override the next values in this list)
- set specific values to all slots of the selected card using the `slotSize` and `slotGap` parameters of the [`data`](/api/config/booking-data) property 
- set global values to all cards in the widget by using the [`slotSize`](/api/config/booking-slotsize) and [`slotGap`](/api/config/booking-slotgap) properties

:::info
In case you have common slots parameters and specific parameters for some days, you should be aware of the following: 
- Slot parameters defined for specific days will override common parameters defined for all days. 
- Slot parameters specified for dates will override parameters defined for specific days and all days. 
- If several slots objects are created for the same day, make sure that slots time ranges (from and to) with **different** size and gap do not overlap, otherwise all slots data for these days will not be applied.
:::

For all slots of the widget, you can also set the [`slotLimit`](/api/config/booking-slotlimit) value that defines the next available date until which slots should be searched in case none are found for 5 days starting from the current date or the start date in the filter; the default value is the current Date. 

#### Examples of defining slot rules

For example, if you want to add booking slots with the same parameters to all days of the selected card, i.e., add slots with the same duration, the same start and end time to all days of the selected card, you should add one object to the `slots` array with the required parameters. 

Example:

~~~jsx
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            star: 1,
            count: 40,
        },
        slots: [
            {
                //a common rule for all days
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
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
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
                //this rule is applied to days 3 and 4 (Wednesdays and Thursdays) and exact date
                from: 18,
                to: 20,
                size: 45,
                gap: 20,
                days: [3, 4],
                dates: [ 1683234000000 ] // exact upcoming date (May 5, 2023, Friday)
            },
        ],
    },]
		
new booking.Booking("#root", {
	data,
	// other parameters
});
~~~

To see how to set [duration](/api/config/booking-slotsize) and [gap](/api/config/booking-slotgap) for all slots in the widget, [open the snippet tool](https://snippet.dhtmlx.com/pw8xsl1p). 

### Marking slots as used or available

To mark slots as used (booked) and make them not visible for a user, use the `usedSlots` parameter of the required card item of the [`data`](/api/config/booking-data) property.

Example:

~~~jsx
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
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

To mark available slots, use the `availableSlots` parameter of the [`data`](/api/config/booking-data) property.

If available slots are specified here, all slots from the `slots` array are ignored (i.e., become unavailable).

Example:

~~~jsx
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
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

## Configuring the Booking dialog

To configure the fields that should be displayed in the Booking dialog, use the [`formShape`](/api/config/booking-formshape) property.

To add a new field, add a new object to the array. To make a field required for filling, set the `required` parameter to *true*. 

~~~jsx 
const formShape = [
    {
        type: "text",
        key: "name",
        label: "Your name",
    },
    {
        type: "text",
        key: "contact",
        label: "Mobile",
        required: true,
    },
    {
        type: "textarea",
        key: "description",
        label: "Details",
    },
];

new booking.Booking("#root", {
	formShape,
	// other parameters
});
~~~

:::info
Please, see an example in the [snippet tool](https://snippet.dhtmlx.com/yeqkuzx7)
:::

To manage information that is displayed on the left side of the Booking dialog, apply the [`infoShape`](/api/config/booking-infoshape) property. You can hide necessary fields from display by setting values to *false*.

~~~jsx {1-7,11}
const infoShape = {
	preview: true,
	category: true,
	title: true,
	price: true,
	details: false,
};

new booking.Booking("#root", {
	data,
	infoShape,
	//other parameters
});
~~~

:::info
Please, see an example in the [snippet tool](https://snippet.dhtmlx.com/pd6wp1xc)
:::

## Configuring the filter 

You can configure filter settings via the [`filterShape`](/api/config/booking-filterShape) property. Default configuration is the following:

~~~jsx {}
const defaultTimeRanges = [
	{ from: 8, to: 12, label: "Morning" },
	{ from: 12, to: 17, label: "Afternoon" },
	{ from: 17, to: 20, label: "Evening" },
];

const defaultFilterShape = {
    text: [
		{ id: "category", label: "speciality", suggest: true },
		{ id: "title", label: "specialist", suggest: true },
		{ id: "details", label: "location" },
	],
	date: true,
	time: defaultTimeRanges,
	autoApply: false,
};
~~~

### Hiding filter input fields

All input fields are displayed by default: text, time, and date. To hide the fields, apply the [`filterShape`](/api/config/booking-filterShape) property and set the corresponding parameters to **false**. 

Example:

~~~jsx 
const filterShape = {
    date: false,
};

new booking.Booking("#root", {
    data,
    filterShape,
    // other parameters
});
~~~

### Configuring filter fields

To enable the auto-complete and show the values that match a user's input text in the **text** field, set the `suggest` parameter of the [`filterShape`](/api/config/booking-filterShape) property to **true**. The values from the [`data`](/api/config/booking-data) object will be displayed. To add labels to these fields, apply the `label` parameter of the [`filterShape`](/api/config/booking-filterShape) property. 

Example:

~~~jsx 
const filterShape = {
    text: [
        { id: "category", label: "specialization", suggest: true },
        { id: "title", label: "doctor", suggest: true },
        { id: "details", label: "location", suggest: true },
    ],
};

new booking.Booking("#root", {
    data,
    filterShape,
    //other parameters
});
~~~

To define the time filtering options, for the `time` parameter of the [`filterShape`](/api/config/booking-filterShape) property specify the start and end slot time values:

- `from` - the start time for a slot; it can be a number from 0 to 24 that specifies the time in hours (e.g., 9 means 9:00, 8.5 means 8:30) or a string in the format "h:m" (for example, "8:30")
- `to` - the end time for a slot; it can be a number from 0 to 24 that specifies the time in hours (e.g., 9 means 9:00, 8.5 means 8:30) or a string in the format "h:m" (for example, "8:30")

And you can also add a placeholder to each time range.

Example:

~~~jsx 
const filterShape = {
    time: [
        { from: "8:30", to: "11:50", label: "Morning" },
        { from: "12:30", to: "16:50", label: "Afternoon" },
        { from: "17:00", to: "19:50", label: "Evening" },
        { from: "20:00", to: "22:50", label: "Urgent" },
  ],
};

new booking.Booking("#root", {
  data,
  filterShape,
	// other parameters
});
~~~

### Enabling the autoApply mode for the filter

To hide the **Search** button and make the filter immediately apply a user's input, set the `autoApply` parameter of the [`filterShape`](/api/config/booking-filterShape) property to **true**.

Example:

~~~jsx 
const filterShape = {
    autoApply: true,
};

new booking.Booking("#root", {
    data,
    filterShape,
    // other parameters
});
~~~

### Example

The snippet below demonstrates how to configure the filter: 

<iframe src="https://snippet.dhtmlx.com/b5uj78bs?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

