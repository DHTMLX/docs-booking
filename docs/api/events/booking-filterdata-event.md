---
sidebar_label: filter-data
title: filter-data Event
description: You can learn about the filter-data event in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# filter-data

### Description

@short: Fires when filters are applied

### Usage

~~~jsx {}
"filter-data": ({
    text: string;
		date:{ 
			start: Date | null,
			end: Date | null,
		},
		time:[{ 
			from: number;
			to: number
		}]
 }) => void;
~~~

### Parameters

The callback of the **filter-data** event can take an object with the following parameters:

- `text` - (required) the text in the search field
- `date` - (required) an object with the start and end date for a slot; each object has the next parameters (the date format ?? should be of the one supported by [date-fns](https://date-fns.org/)):
  - `start` - the slot start date
  - `end` - the slot end date 
- `time` - (required) an array of objects containing time options for a slot. For each object, you can specify the following parameters:
  - `from` - (required) the start time for a slot; it can be a number from 0 to 24 that specifies the time in hours (e.g., 9 means 9:00, 8.5 means 8:30) or a string in the format "h:m" (for example, "8:30")
  - `to` - (required) the end time for a slot; it can be a number from 0 to 24 that specifies the time in hours (e.g., 9 means 9:00, 8.5 means 8:30) or a string in the format "h:m" (for example, "8:30")

### Example

~~~jsx {7-10}
// create Booking
const booking = new booking.Booking("#root", {
	data,
	cardShape
});

//output the date object for filtered data
booking.api.on("filter-data", (ev) => {
   console.log(ev.date);
});
~~~

**Related articles:** TODO
