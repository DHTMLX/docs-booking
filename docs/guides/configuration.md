---
sidebar_label: Configuration
title: Configuration
description: You can learn about the configuration in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Configuration

## Load data for cards

Add data to the [`data`](/api/config/booking-data) array. For full instructions, see [`Loading data`](/guides/loading-data).

## Define card structure

Use the [`cardShape`](/api/config/booking-cardshape) or [`cardTemplate`](/api/config/booking-cardtemplate) property to configure what information appears on the left side of each card.

:::info
`cardTemplate` fully customizes the appearance of a card with custom HTML. It gives full control over the card's layout, design, and content.
`cardShape` only modifies the default template by hiding or showing fields.
If both are applied, `cardTemplate` overrides `cardShape`.
:::

### Hide or show card fields

Use [`cardShape`](/api/config/booking-cardshape) to control which fields appear on the left side of each card without changing the default layout.

The following fields appear on the left side of each card by default:
- `preview` — card image
- `review` — rating information including the number of stars (out of five) and the number of reviews
- `category` — category name (e.g., a specialist's job)
- `title` — card title (e.g., a specialist's name)
- `subtitle` — card subtitle (e.g., experience details); hidden by default
- `price` — service price
- `details` — additional card details

To hide a field, set the corresponding `cardShape` parameter to `false`. The following code snippet hides the `details` field from all cards:

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
Please, see an example in the [snippet tool](https://snippet.dhtmlx.com/6mxd7918)
:::

### Apply a custom card template

Use [`cardTemplate`](/api/config/booking-cardtemplate) to apply a custom HTML template to the left side of each card.

Create a function that takes a card object and returns HTML. Arrange card item properties into HTML blocks with custom styles. The example below defines `cardPreviewTemplate`, which renders a preview image, category, title, and price:

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

    function cardPreviewTemplate({ card }) {
        return `
            <div class="custom-preview" data-action="preview-click">
                <div class="preview-left">
                    <div
                        style="background-image: url(${card.preview})"
                        class="card-photo"
                    ></div>
                    <!-- <div class="card-photo-empty" /> -->
                    </div>

                    <div class="preview-right">
                    <div class="category">${card.category}</div>
                    <div class="title">${card.title}</div>
                    <div class="price">${card.price}</div>
                </div>
            </div>
            `;
    }
</script>
~~~

Also import the `template` helper and assign your function to `cardTemplate`:

~~~jsx
const { Booking, template } = booking;

const widget = new Booking("#root", {
	data,
	cardTemplate: template(card => cardPreviewTemplate(card)),
    // other parameters
});
~~~

:::info
Please, see an example in the [snippet tool](https://snippet.dhtmlx.com/k2v01vng)
:::

## Fill cards with slots

A slot is a time unit available for booking. Available slots appear for the next five days starting from the current date or from the start date set in the filter.

### Add slots for booking

Add an object to the `slots` array of the [`data`](/api/config/booking-data) property for each card. The example below adds slots for Tuesdays and Fridays from 12:00 to 18:00, with 30-minute duration and 10-minute gaps:

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

Each object in the `slots` array of the [`data`](/api/config/booking-data) property supports the following settings:

- slot start and end time
- slot size (duration in minutes)
- slot gap (gap length in minutes)
- days when slots are available

You can apply one common rule to all days of a card, or define different rules for specific days or exact dates:

- apply the same parameters to all days of a card — same slot duration, start time, and end time
- apply different slot duration and gaps to specific days of the week or exact dates

To configure slot size and gap, use one of the following options (listed from highest to lowest priority):
- `size` and `gap` in the `slots` array of [`data`](/api/config/booking-data) — set slot-specific values; override all other values
- `slotSize` and `slotGap` in [`data`](/api/config/booking-data) — set card-level values; applied to all slots of a card if not overridden in `slots`
- [`slotSize`](/api/config/booking-slotsize) and [`slotGap`](/api/config/booking-slotgap) — set widget-level values; applied to all cards if not overridden in `data`

:::info
If you mix common slot parameters with day-specific ones, note the priority order:
- Slot parameters defined for specific days override common parameters defined for all days.
- Slot parameters specified for dates override parameters defined for specific days and all days.
- If multiple slot objects cover the same day, ensure their time ranges (`from`–`to`) with different `size` and `gap` values do not overlap. Overlapping ranges cause all slot data for those days to be ignored.
:::

Use [`end`](/api/config/booking-end) and [`start`](/api/config/booking-start) to define the date range in which slots appear across all cards.

#### Slot rule examples

To add slots with identical parameters to all days of a card, add a single object to the `slots` array. The following code snippet applies the same slot parameters to all days of a card:

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
            star: 1,
            count: 40
        },
        slots: [
            {
                // common rule for all days
                from: 14, // slot start time
                to: 17, // slot end time
                size: 30, // slot duration in minutes
                gap: 10 // gap between slots
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // other parameters
});
~~~
    
To apply different parameters to specific days, add multiple objects to the `slots` array and specify `days` or `dates` for each. The following code snippet applies different slot parameters to specific days and exact dates:

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
            star: 1,
            count: 40
        },
        slots: [
            {
                // common rule for all days except those specified below
                from: 14,
                to: 17,
                size: 30,
                gap: 10
            },
            {
                // applies to days 2 and 5 (Tuesdays and Fridays) except
                // the Friday from the slot object below
                from: 12,
                to: 17,
                size: 50,
                gap: 20,
                days: [2, 5]
            },
            {
                // applies to days 3 and 4 (Wednesdays and Thursdays) and exact dates
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

To see how to set [duration](/api/config/booking-slotsize) and [gap](/api/config/booking-slotgap) for all slots in the widget, [open the snippet tool](https://snippet.dhtmlx.com/pw8xsl1p).

### Mark slots as used or available

Use the `usedSlots` parameter in the [`data`](/api/config/booking-data) property to mark slots as booked and hide them from users. The following code snippet marks a specific slot as used:

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
            star: 1,
            count: 40
        },
        slots: [
            {
                // common rule for all days
                from: 14, // slot start time
                to: 17, // slot end time
                size: 30, // slot duration in minutes
                gap: 10 // gap between slots
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

To mark available slots, use the `availableSlots` parameter of the [`data`](/api/config/booking-data) property.

If `availableSlots` is specified, the `slots` array is ignored and those slots become unavailable. The following code snippet marks specific timestamps as the only available slots for a card:

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
            star: 1,
            count: 40
        },
        slots: [
            {
                // common rule for all days
                from: 14, // slot start time
                to: 17, // slot end time
                size: 30, // slot duration in minutes
                gap: 10 // gap between slots
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

The Booking dialog has two configurable areas: the form fields and the information block on the left side.

### Configure form fields

Use the [`formShape`](/api/config/booking-formshape) property to configure the fields in the Booking dialog.

Add a new object to the array to include a new field. Set `required` to `true` to make a field mandatory. The following code snippet defines three fields, with the second one required:

~~~jsx {}
const formShape = [
    {
        type: "text",
        key: "name",
        label: "Your name"
    },
    {
        type: "text",
        key: "contact",
        label: "Mobile",
        required: true
    },
    {
        type: "textarea",
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
Please, see an example in the [snippet tool](https://snippet.dhtmlx.com/yeqkuzx7)
:::

### Configure the info block

Use the [`infoShape`](/api/config/booking-infoshape) property to manage information on the left side of the Booking dialog. Set individual fields to `false` to hide them.

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
    //other parameters
});
~~~

:::info
Please, see an example in the [snippet tool](https://snippet.dhtmlx.com/pd6wp1xc)
:::

Use the [`infoTemplate`](/api/config/booking-infotemplate) property to fully customize the appearance and content of the information block — `infoShape` only shows or hides fields from the default template. If both properties are applied, `infoTemplate` overrides `infoShape`.

Define a function that generates custom HTML for the information block. The function receives `item` (card object) and `slot` (slot timestamp) as parameters. Arrange card item properties into HTML blocks with custom styles:

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

Also import the `template` helper and pass your function to `infoTemplate`:

~~~jsx
const { Booking, template } = booking;

const widget = new Booking("#root", {
    data,
    infoTemplate: template(item => cardInfoTemplate(item)),
    // other parameters
});
~~~

:::info
Please, see an example in the [snippet tool](https://snippet.dhtmlx.com/byb94ipu) 
:::


## Configure the filter

Use the [`filterShape`](/api/config/booking-filtershape) property to configure filter settings. The default configuration is:

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

All input fields (text, time, and date) appear by default. Use the [`filterShape`](/api/config/booking-filtershape) property and set the corresponding parameters to `false` to hide them. The following code snippet hides the date field from the filter:

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

### Configure filter fields

Set `suggest` to `true` to enable autocomplete — values from [`data`](/api/config/booking-data) that match user input appear in the **text** field. Use the `label` parameter to add labels to these fields. The following code snippet enables autocomplete for all text filter fields:

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
    //other parameters
});
~~~

To define time filtering options, configure the `time` parameter with start and end slot time values:

- `from` — start time for a slot; number from 0 to 24 (e.g., `9` means 9:00, `8.5` means 8:30) or string in `"h:m"` format (e.g., `"8:30"`)
- `to` — end time for a slot; number from 0 to 24 or string in `"h:m"` format

You can also add a label to each time range. The following code snippet defines custom time ranges for the filter:

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

Set the `autoApply` parameter of [`filterShape`](/api/config/booking-filtershape) to `true` to hide the **Search** button and apply filter criteria immediately. The following code snippet enables autoApply mode:

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

### Example

The snippet below configures the filter with all available options:

<iframe src="https://snippet.dhtmlx.com/b5uj78bs?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

## Configure card rendering

Use the [`renderType`](/api/config/booking-rendertype) property to control how cards are rendered. Set it to `"lazy"` to render only visible cards and improve performance with large data sets.

The following code snippet enables lazy rendering:

~~~jsx {}
new booking.Booking("#root", {
    data,
    renderType: "lazy",
    // other parameters
});
~~~
