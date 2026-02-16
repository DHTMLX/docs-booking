---
sidebar_label: Integration with Svelte
title: Integration with Svelte
description: You can learn about the integration with Svelte in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Integration with Svelte

:::tip
You should be familiar with the basic concepts and patterns of **Svelte** before reading this documentation. To refresh your knowledge, please refer to the [**Svelte documentation**](https://svelte.dev/).
:::

DHTMLX Booking is compatible with **Svelte**. We have prepared code examples on how to use DHTMLX Booking with **Svelte**. For more information, refer to the corresponding [**Example on GitHub**](https://github.com/DHTMLX/svelte-booking-demo).

## Creating a project

:::info
Before you start to create a new project, install [**Vite**](https://vite.dev/) (optional) and [**Node.js**](https://nodejs.org/en/).
:::

To create a **Svelte** JS project, run the following command:

~~~json
npm create vite@latest
~~~

Let's name the project as **my-svelte-booking-app**.

### Installation of dependencies

Go to the app directory:

~~~json
cd my-svelte-booking-app
~~~

Install dependencies and start the dev server. For this, use a package manager:

- if you use [**yarn**](https://yarnpkg.com/), run the following commands:

~~~jsx
yarn 
yarn start // or yarn dev
~~~

- if you use [**npm**](https://www.npmjs.com/), run the following commands:

~~~json
npm install
npm run dev
~~~

The app should run on a localhost (for instance `http://localhost:3000`).

## Creating Booking

Now you should get the DHTMLX Booking source code. First of all, stop the app and proceed with installing the Booking package.

### Step 1. Package installation

Download the [**trial Booking package**](/how-to-start/#installing-trial-booking-via-npm-or-yarn) and follow steps mentioned in the README file. Note that trial Booking is available 30 days only.

### Step 2. Component creation

Now you need to create a Svelte component, to add Booking into the application. Let's create a new file in the ***src/*** directory and name it ***Booking.svelte***.

#### Import source files

Open the ***Booking.svelte*** file and import Booking source files. Note that:

- if you use PRO version and install the Booking package from a local folder, the import paths look like this:

~~~html title="Booking.svelte"
<script>
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
</script>
~~~

Note that depending on the used package, the source files can be minified. In this case make sure that you are importing the CSS file as ***booking.min.css***.

- if you use the trial version of Booking, specify the following paths:

~~~html title="Booking.svelte"
<script>
import { Booking } from '@dhx/trial-booking';
import '@dhx/trial-booking/dist/booking.css';
</script>
~~~

:::info
In this tutorial you can see how to configure the **trial** version of Booking.
:::

#### Setting the container and adding Booking

To display Booking on the page, you need to create the container for Booking, and initialize this component using the corresponding constructor:

~~~html {3,6,10-11,19} title="Booking.svelte"
<script>
    import { onMount, onDestroy } from "svelte";
    import { Booking } from "@dhx/trial-booking";
    import "@dhx/trial-booking/dist/booking.css";

    let container; // initialize container for Booking
    let booking;

    onMount(() => {
        // initialize the Booking component
        booking = new Booking(container, {})
    });

    onDestroy(() => {
        booking.destructor(); // destruct Booking
    });
</script>

<div bind:this={container} class="widget"></div>
~~~

#### Adding styles

To display Booking correctly, you need to specify important styles for Booking and its container in the main css file of the project:

~~~css title="main.css"
/* specify styles for initial page */
html,
body,
#app { /* make sure that you use the #app root container */
    height: 100%;
    padding: 0;
    margin: 0;
}

/* specify styles for the Booking container */
.widget {
    height: 100%;
}
~~~

#### Loading data

To add data into the Booking, we need to provide a data set. You can create the ***data.js*** file in the ***src/*** directory and add some data into it:

~~~jsx title="data.js"
export function getData() {
    function getDate(addDays, hoursValue = 0, minutesValue = 0) {
        const date = new Date();
        const secondsValue = 0; // round to minutes
        const msValue = 0;
    
        date.setDate(date.getDate() + addDays);
        date.setHours(hoursValue, minutesValue, secondsValue, msValue);
    
        return date.getTime();
    }

    return [
        {
            id: "ee828b5d-a034-420c-889b-978840015d6a",
            title: "Natalie Tyson",
            category: "Therapist",
            subtitle: "2 years of experiece",
            details: "Cleveland Clinic\n9500 Euclid Ave",
            preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
            price: "$35",
            review: {
                stars: 4,
                count: 120
            },
            slots: [
                {
                    from: 9,
                    to: 20,
                    days: [1, 2, 3, 4, 5]
                },
                {
                    from: 10,
                    to: 18,
                    days: [6, 0]
                }
            ]
        },
        {
            id: "9b037564-77be-429f-b719-eebbe499027a",
            title: "Emma Johnson",
            category: "Cardiologist",
            subtitle: "2 years of experience",
            details: "Stanford Health Care\n1468 Madison Ave",
            preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/03.jpg",
            price: "$25",
            review: {
                stars: 5,
                count: 10
            },
            slots: [
                {
                    from: 14,
                    to: 17,
                    size: 30,
                    gap: 10
                },
                {
                    from: 12,
                    to: 19,
                    size: 50,
                    gap: 20,
                    days: [2],
                    dates: [getDate(0)]
                },
                {
                    from: "18:30",
                    to: 20,
                    size: 20,
                    gap: 20,
                    days: [3, 4, 5]
                }
            ],
            usedSlots: [getDate(0, 12), getDate(0, 18)]
        },
        // ...
    ];
}
~~~

Then open the ***App.svelte*** file, import data, and pass it into the new created `<Booking/>` components as **props**:

~~~html {3,5,8} title="App.svelte"
<script>
    import Booking from "./Booking.svelte";
    import { getData } from "./data.js";

    const dataset = getData();
</script>

<Booking data={dataset} />
~~~

Go to the ***Booking.svelte*** file and apply the passed **props** to the Booking configuration object:

~~~html {6,13} title="Booking.svelte"
<script>
import { onMount, onDestroy } from "svelte";
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export let data;

let container;
let booking;

onMount(() => {
    booking = new Booking(container, {
        data
    })
});

onDestroy(() => {
    booking.destructor();
});
</script>

<div bind:this={container} class="widget"></div>
~~~

Now the Booking component is ready to use. When the element will be added to the page, it will initialize the Booking with data. You can provide necessary configuration settings as well. Visit our [Booking API docs](../../api/overview/booking-properties-overview/) to check the full list of available properties.

#### Handling events

When a user makes some action in the Booking, it invokes an event. You can use these events to detect the action and run the desired code for it. See the [full list of events](../../api/overview/booking-events-overview/).

Open ***Booking.svelte*** and complete the `onMount()` method in the following way:

~~~html {8-11} title="Booking.svelte"
<script>
// ...
let booking;

onMount(() => {
    booking = new Booking(container, {})

    // output the id of the selected slot
    booking.api.on("select-slot", (obj) => {
        console.log(obj.id);
    });
});

onDestroy(() => {
    booking.destructor();
});
</script>

// ...
~~~

After that, you can start the app to see Booking loaded with data on a page.

![Booking initialization](/assets/trial-booking.png)

Now you know how to integrate DHTMLX Booking with Svelte. You can customize the code according to your specific requirements. The final example you can find on [**GitHub**](https://github.com/DHTMLX/svelte-booking-demo).
