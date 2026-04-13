---
sidebar_label: Integration with Vue
title: Integration with Vue
description: You can learn about the integration with Vue in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Integration with Vue

:::tip
Familiarize yourself with the basic concepts of [**Vue**](https://vuejs.org/) before reading this guide. To refresh your knowledge, see the [**Vue 3 documentation**](https://vuejs.org/guide/introduction.html#getting-started).
:::

DHTMLX Booking is compatible with **Vue**. For code examples with **Vue 3**, see the [**Example on GitHub**](https://github.com/DHTMLX/vue-booking-demo).

## Create a project

:::info
Before creating a new project, install [**Node.js**](https://nodejs.org/en/).
:::

To create a **Vue** project, run the following command:

~~~json
npm create vue@latest
~~~

This command installs and executes `create-vue`, the official **Vue** project scaffolding tool. Check the details in the [Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).

Name the project **my-vue-booking-app**.

### Install dependencies

Go to the app directory:

~~~json
cd my-vue-booking-app
~~~

Install dependencies and start the dev server using one of the following package managers:

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

The app runs on a localhost, for example `http://localhost:3000`.

## Create Booking

Get the DHTMLX Booking source code. Stop the app and install the Booking package.

### Step 1. Install the package

Download the [**trial Booking package**](/how-to-start/#installing-trial-booking-via-npm-or-yarn) and follow the steps in the README file. Note that trial Booking is available 30 days only.

### Step 2. Create the component

Create a Vue component to add Booking to the application. Add a new file in the *src/components/* directory and name it *Booking.vue*.

#### Import source files

Open *Booking.vue* and import Booking source files:

- if you use PRO version and install the Booking package from a local folder, use the following import paths:

~~~html title="Booking.vue"
<script>
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
</script>
~~~

Depending on the package, the source files may be minified. In that case, import *booking.min.css* instead.

- if you use the trial version of Booking, specify the following paths:

~~~html title="Booking.vue"
<script>
import { Booking } from '@dhx/trial-booking';
import '@dhx/trial-booking/dist/booking.css';
<script>
~~~

:::info
This tutorial uses the **trial** version of Booking.
:::

#### Set up the container and add Booking

Create the container and initialize Booking with the constructor. The following code snippet sets up the component:

~~~html {2,7-8,18} title="Booking.vue"
<script>
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default {
    mounted() {
        // initialize the Booking component
        this.booking = new Booking(this.$refs.container, {});
    },

    unmounted() {
        this.booking.destructor(); // destruct Booking
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

#### Add styles

Add the following styles to the main CSS file of your project:

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

#### Load data

Create a *data.js* file in the *src/* directory and add sample data:

~~~jsx title="data.js"
export function getData() {
    function getDate(addDays, hoursValue = 0, minutesValue = 0) {
        const date = new Date();
        const secondsValue = 0; // rounded to minutes
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

Open *App.vue*, import the data, and pass the data to the `<Booking/>` component as `props`:

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

Open *Booking.vue* and apply the props to the Booking configuration:

~~~html {6,10} title="Booking.vue"
<script>
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default {
    props: ["data"],

    mounted() {
        this.booking = new Booking(this.$refs.container, {,
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

The Booking component is ready to use. When you add the component to the page, Booking initializes with data. Provide additional configuration settings as needed. See the [Booking API docs](/api/overview/booking-properties-overview/) for the full list of available properties.

#### Handle events

Booking fires an event when a user performs an action. Use these events to detect actions and run custom code. See the [full list of events](/api/overview/booking-events-overview/).

Open *Booking.vue* and update the `mounted()` method to listen for events:

~~~html {8-11} title="Booking.vue"
<script>
// ...
export default {
    // ...
    mounted() {
        this.booking = new Booking(this.$refs.container, {});

        // log the id of the selected slot
        booking.api.on("select-slot", (obj) => {
            console.log(obj.id);
        });
    }
    // ...
}
</script>

<!--...-->
~~~

Start the app to see Booking loaded with data.

![Booking initialization](../assets/trial-booking.png)

Customize the code to meet your project requirements. The complete example is available on [**GitHub**](https://github.com/DHTMLX/vue-booking-demo).
