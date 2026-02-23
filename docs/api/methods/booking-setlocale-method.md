---
sidebar_label: setLocale()
title: setLocale() Method
description: You can learn about the setLocale() method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# setLocale()

### Description

@short: Applies a new locale to Booking

### Usage

~~~jsx
setLocale(null | locale?: object): void;
~~~

### Parameters

- `null` - (optional) resets to the default locale (English)
- `locale` - (optional) the object of data of the new locale to be applied

### Example

~~~jsx {}
// create Booking
const booking = new booking.Booking("#root", {
    data,
    // initial configuration parameters
});

// apply the "de" locale to Booking
booking.setLocale(de);

// apply the default locale to Booking
booking.setLocale(); // or setLocale(null);
~~~

**Related articles**:
- [locale](/api/config/booking-locale)
- [Localization](/guides/localization)
