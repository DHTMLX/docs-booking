---
sidebar_label: Localization
title: Localization
description: You can learn about the localization in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Localization

You can localize labels in the interface of JavaScript Booking and present it in any necessary language. You just need to provide localized strings for labels and apply your locale to the component.

## Default locale

The English locale is used by default:

~~~jsx {}
const en = {
	lang: "en",
	booking: {
	    //Filter bar
		"What date would be best?": "What date would be best?",
		"What time would be best?": "What time would be best?",
		"Choose a date": "Choose a date",
		"Choose a time": "Choose a time",
		Search: "Search",
		filterCategoryName: "Speciality",
		filterTitleName: "Specialist",
		textInputPlaceholder: "Search specialist, speciality or location...",
		Morning: "Morning",
		Afternoon: "Afternoon",
		Evening: "Evening",

		// Card info
		reviews: "reviews",

		// Slots
		"Select the time slot to book online":
			"Select the time slot to book online",
		"Unfortunately, there are no slots available for the selected date.":
			"Unfortunately, there are no slots available for the selected date.",
		"Click here": "Click here",
		"if you want to open a specialist card and choose from other free slots.":
			"if you want to open a specialist card and choose from other free slots.",
		"Select date & time": "Select date & time",
		minutes: "minutes",
		Confirm: "Confirm",

		// Booking window
		"Your Details": "Your Details",
		Name: "Name",
		Email: "Email",
		Description: "Description",
		"Type something...": "Type something...",
		"Book an appointment": "Book an appointment",
		"Booking your appointment": "Booking your appointment",
		"Please do not close the window": "Please do not close the window",
		"Appointment confirmed": "Appointment confirmed",
		"Failed to process this booking": "Failed to process this booking",
		"Oops, something went wrong!": "Oops, something went wrong!",
		"Please go back and try again.": "Please go back and try again.",
		"Go back": "Go back",
		" is required": " is required",
	}
};
~~~

:::info
Besides the ***en*** locale, Booking also includes the built-in ***de*** locale.
:::

<details>
<summary><b>de</b> locale</summary>

~~~jsx
const de = {
	lang: "de",
	booking: booking: {
		//Filter bar
		"What date would be best?":
			"Welches Datum würde Ihnen am besten passen?",
		"What time would be best?": "Welche Zeit würde Ihnen am besten passen?",
		"Choose a date": "Wählen Sie bitte das Datum",
		"Choose a time": "Wählen Sie bitte die Zeit",
		Search: "Suchen",
		filterCategoryName: "Fachgebiet",
		filterTitleName: "Spezialist/in",
		textInputPlaceholder:
			"Suchen Sie nach Spezialist/in, Fachgebiet oder Standort...",
		Morning: "Morgen",
		Afternoon: "Nachmittag",
		Evening: "Abend",

		// Card info
		reviews: "Bewertungen",

		// Slots
		"Select the time slot to book online":
			"Wählen Sie bitte das Zeitfenster aus, um online zu buchen",
		"Unfortunately, there are no slots available for the selected date.":
			"Leider sind keine Termine für den ausgewählten Tag verfügbar.",
		"Click here": "Klicken bitte Sie hier",
		"if you want to open a specialist card and choose from other free slots.":
			"wenn Sie eine Facharztkarte öffnen und aus weiteren freien Zeitfenstern wählen möchten.",
		"Select date & time": "Wählen Sie bitte das Datum und die Zeit aus",
		minutes: "Minuten",
		Confirm: "Bestätigen",

		// Booking window
		"Your Details": "Ihre Angaben",
		Name: "Name",
		Email: "Email",
		Description: "Beschreibung",
		"Type something...": "Schreiben Sie bitte etwas...",
		"Book an appointment": "Vereinbaren Sie bitte einen Termin",
		"Booking your appointment": "Buchen Sie bitte Ihren Termin",
		"Please do not close the window":
			"Bitte schließen Sie das Fenster nicht",
		"Appointment confirmed": "Termin ist bestätigt",
		"Failed to process this booking":
			"Diese Buchung konnte nicht bearbeitet werden",
		"Oops, something went wrong!": "Hoppla! Etwas ist schiefgelaufen!",
		"Please go back and try again.":
			"Bitte gehen Sie zurück und versuchen Sie noch einmal.",
		"Go back": "Gehen Sie zurück",
		" is required": " ist erforderlich",
	},
};
~~~
</details>

## Custom locale

To apply a custom locale you need to:

- create the custom locale (or modify the existed one) and provide translations for all text labels in Booking (it can be any language you need)
- apply the new locale via the [**locale**](api/config/booking_locale_config.md) property or by calling the [**setLocale()**](api/methods/booking_setlocale_method.md) method that takes an object with translations (custom locale) as a parameter

## Example

In this snippet you can see how to switch through the *EN*, *RU* and *CN* locales:

<iframe src="" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
