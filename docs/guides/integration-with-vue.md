---
sidebar_label: Integration with Vue
title: Integration with Vue
description: You can learn about the integration with Vue in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Integration with Vue

DHTMLX Booking integrates with Vue 3 through a single-file component that mounts the widget inside a `ref`'d container. This guide walks you through scaffolding a Vue project, installing Booking, and rendering the widget with data and events. For the complete reference implementation, see the [Vue example on GitHub](https://github.com/DHTMLX/vue-booking-demo).

:::tip
This guide assumes familiarity with Vue 3 core concepts. For an introduction, see the [Vue 3 documentation](https://vuejs.org/guide/introduction.html#getting-started).
:::

## Create a project

Scaffold a Vue project before adding the Booking integration.

:::info
Install [Node.js](https://nodejs.org/en/) before you start.
:::

The following command runs the official Vue scaffolding tool:

~~~bash
npm create vue@latest
~~~

The command installs and executes `create-vue`. For the prompts and options, see the [Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application). Name the project *my-vue-booking-app* when prompted.

### Install dependencies

Switch to the project directory.

The following command opens the newly created app folder:

~~~bash
cd my-vue-booking-app
~~~

Install the dependencies and start the dev server with your package manager.

The following commands use [yarn](https://yarnpkg.com/):

~~~bash
yarn
yarn dev
~~~

The following commands use [npm](https://www.npmjs.com/):

~~~bash
npm install
npm run dev
~~~

The app runs on a localhost, for example *http://localhost:5173*.

## Add Booking to the app

Stop the dev server before installing the Booking package, then create a Vue component that wraps the widget.

### Step 1. Install the package

Download the [trial Booking package](how-to-start.md#installing-trial-booking-via-npm-or-yarn) and follow the steps in the package README. The trial version stays active for 30 days.

### Step 2. Create the Booking component

Create a *Booking.vue* file in the *src/components/* directory and complete the steps below to wire the widget.

#### Import the source files

Import the Booking class and stylesheet with the path that matches your distribution:

- *dhx-booking-package* — PRO version installed from a local folder
- *@dhx/trial-booking* — trial version

The following code snippet imports Booking from the PRO package:

~~~html title="Booking.vue"
<script>
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
</script>
~~~

If your PRO package ships minified assets, import the CSS file as *booking.min.css*.

The following code snippet imports Booking from the trial package:

~~~html title="Booking.vue"
<script>
import { Booking } from '@dhx/trial-booking';
import '@dhx/trial-booking/dist/booking.css';
</script>
~~~

:::info
This tutorial uses the trial version of Booking.
:::

#### Set the container and initialize Booking

Declare the host container in the template and instantiate Booking in the `mounted()` hook. Call `destructor()` in `unmounted()` to unmount the widget when Vue removes the component.

The following code snippet declares a Booking component with a ref'd container and lifecycle hooks:

~~~html {2,7-8,18} title="Booking.vue"
<script>
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default {
    mounted() {
        // create the Booking instance
        this.booking = new Booking(this.$refs.container, {});
    },

    unmounted() {
        this.booking.destructor(); // unmount Booking
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

#### Add the styles

Booking requires both the widget stylesheet (imported above) and a sized container. Set full height for the page and the widget container in the main CSS file of the project.

The following code snippet sets full height for the page and the Booking container:

~~~css title="main.css"
/* page styles — use the #app root container */
html,
body,
#app {
    height: 100%;
    padding: 0;
    margin: 0;
}

/* Booking container */
.widget {
    height: 100%;
}
~~~

#### Load data

To load card data into Booking, prepare a dataset matching the [`data`](api/config/booking-data.md) property. For the full data format and loading scenarios, see the [Loading data](guides/loading-data.md) guide.

Create a *data.js* file in the *src/* directory.

The following code snippet defines a `getData()` helper that returns a sample dataset:

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
            subtitle: "2 years of experience",
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

Open *App.vue*, import the dataset, expose it through the `data()` option, and pass the dataset to the `<Booking/>` component as a prop.

The following code snippet renders the Booking component with a `data` prop:

~~~html {3,7-10,15} title="App.vue"
<script>
import Booking from "./components/Booking.vue";
import { getData } from "./data";

export default {
    components: { Booking },
    data() {
        const dataset = getData();
        return { dataset };
    }
};
</script>

<template>
    <Booking :data="dataset" />
</template>
~~~

Open *Booking.vue* and forward the `data` prop to the Booking configuration.

The following code snippet wires the prop into the Booking constructor:

~~~html {6,10} title="Booking.vue"
<script>
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default {
    props: ["data"],

    mounted() {
        this.booking = new Booking(this.$refs.container, {
            data: this.data,
            // other configuration properties
        });
    },

    unmounted() {
        this.booking.destructor();
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

The Booking component now renders with the loaded data. To customize the widget further, pass extra configuration properties — see the full list in the [Properties overview](api/overview/booking-properties-overview.md).

#### Handle events

A user action in the widget triggers an event. Subscribe to an event with `booking.api.on(eventName, handler)` to react to the action. For the full list of events, see the [Events overview](api/overview/booking-events-overview.md).

Open *Booking.vue* and extend `mounted()` with an event subscription.

The following code snippet logs the slot ID when a user selects a slot:

~~~html {8-11} title="Booking.vue"
<script>
// ...
export default {
    // ...
    mounted() {
        this.booking = new Booking(this.$refs.container, {});

        // log the selected slot id
        this.booking.api.on("select-slot", (obj) => {
            console.log(obj.id);
        });
    }
    // ...
}
</script>

<!--...-->
~~~

Start the app to see Booking loaded with data on the page.

![Booking initialization](../assets/trial-booking.png)

Customize the code to match your project requirements. The complete reference implementation is available on [GitHub](https://github.com/DHTMLX/vue-booking-demo).
