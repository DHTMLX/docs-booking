---
sidebar_label: Configuration
title: Configuration
description: You can learn about the configuration in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Configuration

## Load data for cards

Pass card objects to the [`data`](api/config/booking-data.md) array of the Booking configuration. For the full data format and loading scenarios, see the [Loading data](guides/loading-data.md) guide.

## Define the structure of cards

The left side of each card displays a fixed set of data fields. To control which fields appear or to fully replace the default layout, use one of the following properties:

- [`cardShape`](api/config/booking-cardshape.md) — toggle visibility of the default fields
- [`cardTemplate`](api/config/booking-cardtemplate.md) — replace the default layout with custom HTML

:::info
The `cardTemplate` property fully customizes a card's appearance through custom HTML and gives full control over layout, design, and content. The `cardShape` property only hides or shows fields of the default template. If you apply both, `cardTemplate` overrides the `cardShape` settings.
:::

### Toggle default card fields

The card's left side displays the following fields by default:

- `preview` — card image
- `review` — rating information with the number of rating stars (out of five) and the number of reviews
- `category` — the category name (for example, a specialist's job)
- `title` — the card title (for example, a specialist's name)
- `subtitle` — the card subtitle (for example, experience details)
- `price` — the price of the service
- `details` — other details of a card

To hide a field, set the corresponding parameter of the [`cardShape`](api/config/booking-cardshape.md) property to `false`.

The example below hides the `details` field of a card:

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
        count: 120
    },
        slots: [
            {
                from: 9,
                to: 21
            }
        ]
    }
];

const cardShape = {
    details: false
};

new booking.Booking("#root", {
    data,
    cardShape,
    // other parameters
});
~~~

:::info
See an example in the [snippet tool](https://snippet.dhtmlx.com/6mxd7918).
:::

### Apply a custom card template

The [`cardTemplate`](api/config/booking-cardtemplate.md) property replaces the default left-hand block of a card with custom HTML.

Create a function that takes a card object and returns an HTML string. Arrange card item properties into HTML blocks with custom styles.

The following code snippet defines `cardPreviewTemplate`, which returns HTML for a card with a preview image, category, title, and price:

~~~html {}
<style>
    .custom-preview {
        display: flex;
        width: 100%;
        height: 100%;
        gap: 30px;
    }

    .preview-left {
        width: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    /* other styles */
</style>

<script>
    const { Booking, template } = booking;

    function cardPreviewTemplate({ item }) {
        return `
            <div class="custom-preview" data-action="preview-click">
                <div class="preview-left">
                    <div
                        style="background-image: url(${item.preview})"
                        class="card-photo"
                    ></div>
                    <!-- <div class="card-photo-empty" /> -->
                    </div>

                    <div class="preview-right">
                    <div class="category">${item.category}</div>
                    <div class="title">${item.title}</div>
                    <div class="price">${item.price}</div>
                </div>
            </div>
            `;
    }
</script>
~~~

Import the `template` helper and assign your custom function to the `cardTemplate` property.

The following code snippet wires `cardPreviewTemplate` into the Booking configuration:

~~~jsx
const { Booking, template } = booking;

const widget = new Booking("#root", {
	data,
	cardTemplate: template(cardPreviewTemplate),
    // other parameters
});
~~~

:::info
See an example in the [snippet tool](https://snippet.dhtmlx.com/k2v01vng).
:::

## Fill cards with slots

A slot is a time unit available for booking. The widget displays available slots for six days (four on narrow screens), starting from the current day or from the start date selected in the filter.

### Add slots for booking

To add booking slots to a card, add an object to the `slots` array of the [`data`](api/config/booking-data.md) property.

The example below adds slots for Tuesdays and Fridays from 12:00 to 18:00. Each slot lasts 30 minutes with a 10-minute gap between slots:

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
            stars: 1,
            count: 40
        },
        slots: [
            {
                from: 12,
                to: 18,
                size: 30,
                gap: 10,
                days: [2, 5]
            },
            {...}, //other slots
        ]
    }
];

new booking.Booking("#root", {
    data,
    // other parameters
});
~~~

### Define slot rules

Each object in the `slots` array of the [`data`](api/config/booking-data.md) property specifies:

- slot start and end time
- slot size (duration in minutes)
- slot gap (the interval between slots)
- days or dates to which the rule applies

Apply a single common rule to all days of a card, or combine several rules to use different parameters for selected days or specific dates.

Set slot size and gap at three levels of priority (from highest to lowest):

- `size` and `gap` inside an object of the [`data`](api/config/booking-data.md) slots array — apply to that specific slot rule
- `slotSize` and `slotGap` inside a card object of the [`data`](api/config/booking-data.md) property — apply to all slots of that card
- [`slotSize`](api/config/booking-slotsize.md) and [`slotGap`](api/config/booking-slotgap.md) at the widget level — apply to all cards

:::info
When you mix common and specific rules, the widget resolves them as follows:
- Slot parameters defined for specific days override common parameters defined for all days.
- Slot parameters specified for dates override parameters defined for specific days and all days.
- If several slot objects target the same day, the time ranges (`from` and `to`) with different `size` or `gap` must not overlap. Otherwise, the widget skips all slot data for those days.
:::

To bound the range of displayed slots, set the [`start`](api/config/booking-start.md) date and the [`end`](api/config/booking-end.md) date at the widget level.

#### Apply one rule to all days

To add slots with the same duration and time range to every day of a card, add a single object to the `slots` array.

The following code snippet defines a common rule for all days from 14:00 to 17:00, with 30-minute slots and a 10-minute gap:

~~~jsx {}
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
            stars: 1,
            count: 40
        },
        slots: [
            {
                //a common rule for all days
                from: 14, //slots start time
                to: 17, // slots end time
                size: 30, // each slot duration in minutes
                gap: 10 // a gap between slots
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // other parameters
});
~~~

#### Apply different rules per day or date

To use different parameters for selected weekdays or exact dates, add several objects to the `slots` array and set the `days` or `dates` parameter on each rule.

The following code snippet combines three rules — a common rule, a weekday rule for Tuesdays and Fridays, and a rule for Wednesdays, Thursdays, and one exact date:

~~~jsx {}
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
            stars: 1,
            count: 40
        },
        slots: [
            {
                // common rule for all days except those listed below
                from: 14,
                to: 17,
                size: 30,
                gap: 10
            },
            {
                // applies to Tuesdays and Fridays, except the Friday
                // listed in the next rule
                from: 12,
                to: 17,
                size: 50,
                gap: 20,
                days: [2, 5]
            },
            {
                // applies to Wednesdays, Thursdays, and one exact date
                from: 18,
                to: 20,
                size: 45,
                gap: 20,
                days: [3, 4],
                dates: [ 1683234000000 ] // May 5, 2023, Friday
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // other parameters
});
~~~

To see how to set [duration](api/config/booking-slotsize.md) and [gap](api/config/booking-slotgap.md) for all slots in the widget, [open the snippet tool](https://snippet.dhtmlx.com/pw8xsl1p).

### Mark slots as used or available

Two parameters of the [`data`](api/config/booking-data.md) card object control which slots a user can see or book:

- `usedSlots` — hide booked slots from the user
- `availableSlots` — display an explicit list of bookable slots and ignore the `slots` array rules

#### Mark slots as used

To hide booked slots, set the `usedSlots` parameter to an array of slot start timestamps.

The following code snippet hides one slot as already booked:

~~~jsx {}
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
            stars: 1,
            count: 40
        },
        slots: [
            {
                // common rule for all days
                from: 14, // slot start time
                to: 17,   // slot end time
                size: 30, // slot duration in minutes
                gap: 10   // gap between slots
            }
        ],
        usedSlots: [ 1683234000000 ] // timestamps of booked slots in milliseconds
    }
];

new booking.Booking("#root", {
    data,
    // other parameters
});
~~~

#### Mark slots as available

To display an explicit list of bookable slots, use the `availableSlots` parameter of the [`data`](api/config/booking-data.md) property. When you set `availableSlots`, the widget ignores every entry in the `slots` array.

The following code snippet exposes two timestamps as the only bookable slots for the card:

~~~jsx {}
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
            stars: 1,
            count: 40
        },
        slots: [
            {
                // common rule for all days
                from: 14, // slot start time
                to: 17,   // slot end time
                size: 30, // slot duration in minutes
                gap: 10   // gap between slots
            }
        ],
        availableSlots: [ 1693325145000, 1693584345000 ] // timestamps of available slots in milliseconds
    }
];

new booking.Booking("#root", {
    data,
    // other parameters
});
~~~

## Configure the Booking dialog

The Booking dialog has two configurable parts: the form fields where a user enters booking details, and the information block on the left side. Use the following properties to control each part:

- [`formShape`](api/config/booking-formshape.md) — configure the form fields
- [`infoShape`](api/config/booking-infoshape.md) — toggle default fields of the information block
- [`infoTemplate`](api/config/booking-infotemplate.md) — replace the information block with a custom HTML template

### Configure form fields

Pass an array of field descriptors to the [`formShape`](api/config/booking-formshape.md) property. Each descriptor sets the field type, identifier, label, and an optional `required` flag.

The following code snippet defines three form fields, with the `contact` field marked as required:

~~~jsx {}
const formShape = [
    {
        comp: "text",
        key: "name",
        label: "Your name"
    },
    {
        comp: "text",
        key: "contact",
        label: "Mobile",
        required: true
    },
    {
        comp: "textarea",
        key: "description",
        label: "Details"
    }
];

new booking.Booking("#root", {
    formShape,
    // other parameters
});
~~~

:::info
See an example in the [snippet tool](https://snippet.dhtmlx.com/yeqkuzx7).
:::

### Toggle default information fields

The [`infoShape`](api/config/booking-infoshape.md) property hides or shows the default fields of the information block. Set a field to `false` to hide it.

The following code snippet hides the `details` field of the information block:

~~~jsx {1-7,11}
const infoShape = {
    preview: true,
    category: true,
    title: true,
    price: true,
    details: false
};

new booking.Booking("#root", {
    data,
    infoShape,
    // other parameters
});
~~~

:::info
See an example in the [snippet tool](https://snippet.dhtmlx.com/pd6wp1xc).
:::

### Apply a custom information template

Use the [`infoTemplate`](api/config/booking-infotemplate.md) property to fully replace the default information block with custom HTML. If you apply both `infoTemplate` and `infoShape`, `infoTemplate` overrides the `infoShape` settings.

Define a function that takes `item` (the card object) and `slot` (the slot timestamp) and returns an HTML string. Arrange card item properties into HTML blocks with custom styles.

The following code snippet defines `cardInfoTemplate`, which renders a photo, title, category, and formatted date for the selected slot:

~~~html
<style>
	.custom-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.info-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding: 34px;
		background: rgba(128, 128, 155, 0.12);
		border-radius: 8px;
	}
    /* other styles */
</style>

<script>
    const { Booking, template } = booking;

    function cardInfoTemplate({
        item,
        slot,
    }) {
            return `
                <div class="custom-info">
                    <div class="info-wrapper">
                        <div class="photo-wrapper">
                            ${getPhotoElement(item.preview, "info")}
                        </div>
                        <span class="info-title">${item.title}</span>
                        <span class="info-category">${item.category}</span>
                        <div class="date" data-action="reset-slot">
                            <i class="icon wxi-calendar"></i>
                            <span>${formatDate(slot, { dateFormat, timeFormat })}</span>
                        </div>
                    </div>
                </div>
            `;
        }
</script>
~~~

Import the `template` helper and assign your custom function to the `infoTemplate` property.

The following code snippet wires `cardInfoTemplate` into the Booking configuration:

~~~jsx
const { Booking, template } = booking;

const widget = new Booking("#root", {
    data,
    infoTemplate: template(cardInfoTemplate),
    // other parameters
});
~~~

:::info
See an example in the [snippet tool](https://snippet.dhtmlx.com/byb94ipu).
:::

## Configure the filter

Use the [`filterShape`](api/config/booking-filtershape.md) property to control which filter inputs appear and how each behaves. The default configuration enables three text fields, a date picker, and three time ranges:

~~~jsx {}
const defaultTimeRanges = [
    { from: 8, to: 12, label: "Morning" },
    { from: 12, to: 17, label: "Afternoon" },
    { from: 17, to: 20, label: "Evening" }
];

const defaultFilterShape = {
    text: [
        { id: "category", label: "speciality", suggest: true },
        { id: "title", label: "specialist", suggest: true },
        { id: "details", label: "location" }
    ],
    date: true,
    time: defaultTimeRanges,
    autoApply: false
};
~~~

### Hide filter input fields

The widget displays all input fields by default — text, time, and date. To hide a field, set the corresponding parameter of the [`filterShape`](api/config/booking-filtershape.md) property to `false`.

The following code snippet hides the date filter:

~~~jsx {}
const filterShape = {
    date: false,
};

new booking.Booking("#root", {
    data,
    filterShape,
    // other parameters
});
~~~

### Configure text filter fields

To enable auto-complete in a text field, set the `suggest` parameter to `true`. The widget then displays values from the [`data`](api/config/booking-data.md) array that match the user's input. Use the `label` parameter to add a placeholder.

The following code snippet enables auto-complete and custom labels for three text fields:

~~~jsx {}
const filterShape = {
    text: [
        { id: "category", label: "specialization", suggest: true },
        { id: "title", label: "doctor", suggest: true },
        { id: "details", label: "location", suggest: true }
    ],
};

new booking.Booking("#root", {
    data,
    filterShape,
    // other parameters
});
~~~

### Configure time ranges

To define time filtering options, pass an array of objects to the `time` parameter of the [`filterShape`](api/config/booking-filtershape.md) property. Each object accepts the following keys:

- `from` — slot start time, as a number from 0 to 24 (for example, `9` means 9:00, `8.5` means 8:30) or a string in the `"h:m"` format (for example, `"8:30"`)
- `to` — slot end time, in the same format as `from`
- `label` — placeholder for the time range

The following code snippet defines four time ranges with custom labels:

~~~jsx {}
const filterShape = {
    time: [
        { from: "8:30", to: "11:50", label: "Morning" },
        { from: "12:30", to: "16:50", label: "Afternoon" },
        { from: "17:00", to: "19:50", label: "Evening" },
        { from: "20:00", to: "22:50", label: "Urgent" }
    ]
};

new booking.Booking("#root", {
    data,
    filterShape,
    // other parameters
});
~~~

### Enable autoApply mode

To hide the **Search** button and apply filter input immediately, set the `autoApply` parameter of the [`filterShape`](api/config/booking-filtershape.md) property to `true`.

The following code snippet enables auto-apply for the filter:

~~~jsx {}
const filterShape = {
    autoApply: true,
};

new booking.Booking("#root", {
    data,
    filterShape,
    // other parameters
});
~~~

### Filter example

The snippet below demonstrates a complete filter configuration:

<iframe src="https://snippet.dhtmlx.com/b5uj78bs?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

## Optimize rendering of large datasets

The Booking widget renders every loaded card by default. For large datasets, enable lazy rendering so the widget renders only visible cards. Use the [`renderType`](api/config/booking-rendertype.md) property to switch between modes.

The following code snippet enables lazy rendering of cards:

~~~jsx {}
new booking.Booking("#root", {
    data,
    renderType: "lazy",
    // other parameters
});
~~~
