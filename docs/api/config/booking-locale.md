---
sidebar_label: locale
title: locale
description: You can learn about the locale in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# locale

### Description

@short: Optional. An object of a custom locale of Booking

### Usage

~~~jsx
locale?: object;
~~~

### Default config

By default, Booking uses the [English](/guides/localization/#default-locale) locale. You can set it to the custom locale as well.

:::tip
To change the current locale dynamically, you can use the [`setLocale()`](../../../api/methods/booking-setlocale-method) method
:::

### Example

~~~jsx
const { data } = getData();
const booking = new booking.Booking("#root", {
    data,
    locale: de
});
~~~

**Related articles**:
- [setLocale()](../../../api/methods/booking-setlocale-method)
- [Localization](/guides/localization)
