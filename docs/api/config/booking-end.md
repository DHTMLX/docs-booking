---
sidebar_label: end
title: end
description: You can learn about the end date in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# end

### Description

@short: Optional. Defines the date until which to show available slots

### Usage

~~~jsx {}
end?: Date;
~~~

### Parameters

- `Date` - the end date until which to display available slots; the default value is one year from the current date.

### Example

~~~jsx {}
new booking.Booking("#root", {
    data,
    end: new Date(2025, 11, 11),
    // other parameters
});
~~~
