---
sidebar_label: cards
title: cards
description: You can learn about the cards config in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# cards

### Description

@short: Optional. An array of objects containing the cards data

### Usage

~~~jsx {}
cards?: [
	{
		id: string | number,
		title: string,
		category?: string,
		subtitle?: string,
		details?: string,
		preview?: string, // url
		price?: string,
		review?: {
			star: number,
			count: number,
		},
		slots: [
			{
				from: number,
				to: number,
				size?: number,
				gap?: number,
				days?: array, // array of numbers
				dates?: array, // array of numbers
			}, {...}
		],
		availableSlots?: array, // array of numbers
		usedSlots?: array, // array of numbers
	}, {...}
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
  - `star` - (optional) the number of rating stars (out of five)  
  - `count` - (optional) the number of reviews
- `slots` - (required) an array of objects with the following parameters for booking slots:
  - `from` - (required) a slot start time in hours from 0 to 24
  - `to` - (required) a slot end time in hours from 0 to 24
  - `size` - (optional) the duration of one slot in minutes TBD
  - `gap` - (optional) the gap between slots in minutes; 0 is set by default
  - `days` - (optional) days of the week when a slot is available for booking; possible values: from 0 to 6 where 0 is Sunday and 6 is Saturday; if no days are specified, all days are applied by default; if days are specified, the slot parameters (**to**, **from**, **size**, **gap**) defined for these days will be applied
  - `dates` - (optional) an array of timestamps in milliseconds which are exact dates when a slot is available; the slot parameters (**to**, **from**, **size**, **gap**) for these specified dates will be applied 
:::note
Slot parameters specified for days will override common parameters defined for all days. 
Slot parameters specified for dates will override parameters defined for specific days and all days. 
If several slots objects are created for the same day, make sure that slots time ranges (**from** and **to**) do not overlap, otherwise, all slots data for these days will not be applied.  
:::
- `availableSlots` - (optional) an array of timestamps of available slots in milliseconds; if available slots are specified here, all slots from the `slots` array are ignored (i.e., become unavailable)
- `usedSlots` - (optional) an array of timestamps of booked slots in milliseconds; these slots are not visible for a user

### Example

~~~jsx {1-42,45}
const cards = [
	{
		id: "1",
		title: "Debra Weeks",
		category: "Allergist",
		subtitle: "5 years of experience",
		details: "Silverstone Medical Center (Vanderbilt Avenue 13, Chestnut, New Zealand)",
		preview: "https://files.webix.com/30d/d34de82e0a8e3b561988a46ce1e86743/stock-photo-doc.jpg",
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
				days: [2,5],
			},
			{
				//this rule is applied to days 3 and 4 (Wed and Thu) and exact date
				from: 18,
				to: 20,
				size: 45,
				gap: 20,
				days: [1,3]
				dates: [1683234000000] // exact upcoming date (May 5, 2023, Friday)
			},
		],
	}, {...} 
];

new booking.Booking("#root", {
	cards,
	// other parameters
});
~~~

**Related articles:**
