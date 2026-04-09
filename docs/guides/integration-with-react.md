---
sidebar_label: Integration with React
title: Integration with React
description: You can learn about the integration with React in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Integration with React

:::tip
Familiarize yourself with the basic concepts of [**React**](https://react.dev) before reading this guide. To refresh your knowledge, see the [**React documentation**](https://react.dev/learn).
:::

DHTMLX Booking is compatible with **React**. For code examples, see the [**Example on GitHub**](https://github.com/DHTMLX/react-booking-demo).

## Create a project

:::info
Before creating a new project, install [**Node.js**](https://nodejs.org/en/) and optionally [**Vite**](https://vite.dev/).
:::

Create a basic **React** project or use **React with Vite**. Name the project **my-react-booking-app**:

~~~json
npx create-react-app my-react-booking-app
~~~

### Install dependencies

Go to the app directory:

~~~json
cd my-react-booking-app
~~~

Install dependencies and start the dev server using one of the following package managers:

- if you use [**yarn**](https://yarnpkg.com/), run the following commands:

~~~json
yarn
yarn start
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

Download the [**trial Booking package**](/how-to-start/#installing-trial-booking-via-npm-or-yarn) and follow steps mentioned in the README file. Note that trial Booking is available 30 days only.

### Step 2. Create the component

Create a React component to add Booking to the application. Add a new file in the `src/` directory and name it `Booking.jsx`.

#### Import source files

Open `Booking.jsx` and import Booking source files:

- if you use PRO version and install the Booking package from a local folder, use the following import paths:

~~~jsx title="Booking.jsx"
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
~~~

Depending on the package, the source files may be minified. In that case, import `booking.min.css` instead.

- if you use the trial version of Booking, specify the following paths:

~~~jsx title="Booking.jsx"
import { Booking } from '@dhx/trial-booking';
import "@dhx/trial-booking/dist/booking.css";
~~~

:::info
This tutorial uses the **trial** version of Booking.
:::

#### Set up the container and add Booking

Create the container and initialize Booking with the constructor. The following code snippet sets up the component:

~~~jsx {2,6,9-10,17} title="Booking.jsx"
import { useEffect, useRef } from "react";
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css"; // include Booking styles

export default function BookingComponent(props) {
    let container = useRef(); // Booking container

    useEffect(() => {
        // initialize the Booking component
        const booking = new Booking(container.current, {});

        return () => {
            booking.destructor(); // destruct Booking
        };
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

#### Add styles

Add the following styles to the main CSS file of your project:

~~~css title="index.css"
/* specify styles for initial page */
html,
body,
#root {
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

Create a `data.js` file in the `src/` directory and add sample data:

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

Open `App.js`, import the data, and pass it to the `<Booking/>` component as `props`:

~~~jsx {2,5-6} title="App.js"
import Booking from "./Booking";
import { getData } from "./data";

function App() {
    const dataset = getData();
    return <Booking data={dataset} />;
}

export default App;
~~~

Open `Booking.jsx` and apply the props to the Booking configuration:

~~~jsx {5,10} title="Booking.jsx"
import { useEffect, useRef } from "react";
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default function BookingComponent(props) {
    let container = useRef(); 

    useEffect(() => {
        const booking = new Booking(container.current, {
            data: props.data
            // other configuration properties
        });

        return () => {
            booking.destructor();
        }
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

The Booking component is ready to use. When added to the page, it initializes with data. Provide additional configuration settings as needed. See the [Booking API docs](/api/overview/booking-properties-overview/) for the full list of available properties.

#### Handle events

Booking fires an event when a user performs an action. Use these events to detect actions and run custom code. See the [full list of events](/api/overview/booking-events-overview/).

Open `Booking.jsx` and update the `useEffect()` method to listen for events:

~~~jsx {5-8} title="Booking.jsx"
// ...
useEffect(() => {
    const booking = new Booking(container.current, {});

    // log the id of the selected slot
    booking.api.on("select-slot", (obj) => {
        console.log(obj.id);
    });
    
    return () => {
        booking.destructor();
    }
}, []);
// ...
~~~

Start the app to see Booking loaded with data.

![Booking initialization](../assets/trial-booking.png)

Customize the code to meet your project requirements. The complete example is available on [**GitHub**](https://github.com/DHTMLX/react-booking-demo).
