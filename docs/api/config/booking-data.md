---
sidebar_label: data
title: data
description: You can learn about the cards config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# data

### Description

@short: Optional. An array of objects containing the cards data

### Usage

~~~jsx {}
data: [
    {
        id: string | number,
        title: string,
        category?: string,
        subtitle?: string,
        details?: string,
        preview?: string, // link to image
        price?: string,
        review?: {
            stars: number,
            count: number
        },
        slots: [
            {
                from: number | string, // hours from 0 to 24
                to: number | string, // hours from 0 to 24
                size?: number, // length of slot in minutes
                gap?: number, // gap between slots in minutes
                days?: array, // days of week for which rule can be applied from 0 to 6
                dates?: array, // exact dates for which rule can be applied, timestamps
            }
        ],
        availableSlots?: [
            {
                id: string|number,
                time:[number, number] //timestamp, length in minutes
            },
        ],
        usedSlots?: number[], //timestamps
        slotSize?: number, //minutes
        slotGap?: number //minutes
    }
];
~~~

### Parameters

For each card object you can specify the following parameters:

- `id` - (required) the ID of a card  
- `title` - (required) the title of a card (e.g., a specialist's name)
- `category` - (optional) the category name of a card (e.g., a specialist's job)
- `subtitle` - (optional) the subtitle of a card  
- `details` - (optional) other details of a card
- `preview` - (optional) a card preview which is the link to the card image
- `price` - (optional) the price of the service  
- `review` - (optional) rating information that includes the following parameters:  
  - `stars` - (optional) the number of rating stars (out of five)  
  - `count` - (optional) the number of reviews
- `slots` - (required) an array of objects with the following parameters for each slot object:
  - `from` - (required) a slot start time in hours from 0 to 24
  - `to` - (required) a slot end time in hours from 0 to 24
  - `size` - (optional) the duration of one slot in minutes
  - `gap` - (optional) the gap between slots in minutes; 0 is set by default
  - `days` - (optional) days of the week when a slot is available for booking; possible values: from 0 to 6 where 0 is Sunday and 6 is Saturday; if no days are specified, all days are applied by default; if days are specified, the slot parameters (**to**, **from**, **size**, **gap**) defined for these days will be applied
  - `dates` - (optional) an array of timestamps in milliseconds which are exact dates when a slot is available; the slot parameters (**to**, **from**, **size**, **gap**) for these specified dates will be applied (timestamps are in a local timezone)

:::note
Slot parameters specified for days will override common parameters defined for all days.
Slot parameters specified for dates will override parameters defined for specific days and all days.
If several slots objects are created for the same day, make sure that slots time ranges (from and to) with **different** size and gap do not overlap, otherwise all slots data for these days will not be applied.
:::

- `availableSlots` - (optional) an array of timestamps of available slots in milliseconds; if available slots are specified here, all slots from the `slots` array are ignored (i.e., become unavailable); each object in the array has the next parameters:
  - `id` - (required) the id of a slot
  - `time` - (required) an array that includes timestamp and slot duration in minutes (timestamps are in a local timezone)
- `usedSlots` - (optional) an array of timestamps of booked slots in milliseconds (timestamps are in a local timezone)
- `slotSize` - (optional) the duration of a slot in minutes; the value will be applied to all slots of this card if other value is not set inside the `slots` object; *60* minutes is set by default
- `slotGap` - (optional) the gap between slots in minutes that is set for all slots in the current card; this value is applied if any other value is not specified inside the `slots` object; 0 is set by default

### Example

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Debra Weeks",
        category: "Allergist",
        subtitle: "7 years of experience",
        details: 
                "Silverstone Medical Center (Vanderbilt Avenue 13, Chestnut, New Zealand)",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            star: 1,
            count: 40
        },
        slots: [
            {
                //a common slot rule for all days except those specified for the days and dates below
                from: 14,
                to: 17,
                size: 30,
                gap: 10
            },
            {
                //this rule is applied to days 2 and 5 (Tuesdays and Fridays) except
                //the Friday from the slot object below
                from: 12,
                to: 17,
                size: 50,
                gap: 20,
                days: [2, 5]
            },
            {
                //this rule is applied to days 3 and 4 (Wednesdays and Thursdays) and exact date
                from: 18,
                to: 20,
                size: 45,
                gap: 20,
                days: [3, 4],
                dates: [ 1683234000000 ] // exact upcoming date (May 5, 2023, Friday)
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // other parameters
});
~~~

**Related articles:** [Defining slot rules](../../../guides/configuration#defining-slot-rules)
