---
sidebar_label: Integration with Angular
title: Integration with Angular
description: You can learn about the integration with Angular in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Integration with Angular

DHTMLX Booking integrates with Angular through a custom component that wraps the widget constructor. This guide walks you through scaffolding a new Angular project, installing Booking, and rendering the widget with data and events. For the complete reference implementation, see the [Angular example on GitHub](https://github.com/DHTMLX/angular-booking-demo).

:::tip
This guide assumes familiarity with Angular core concepts. For an introduction, see the [Angular documentation](https://v17.angular.io/docs).
:::

## Create a project

Scaffold a new Angular app with Angular CLI before adding the Booking integration.

:::info
Install [Angular CLI](https://v17.angular.io/cli) and [Node.js](https://nodejs.org/en/) before you start.
:::

The following command creates a new *my-angular-booking-app* project:

~~~bash
ng new my-angular-booking-app
~~~

:::note
Disable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering) when prompted by the CLI. The Booking widget mounts to the DOM on the client side.
:::

The command installs all necessary tools. No additional commands are required.

### Install dependencies

Switch to the project directory.

The following command opens the newly created app folder:

~~~bash
cd my-angular-booking-app
~~~

Install the dependencies and start the dev server with your package manager.

The following commands use [yarn](https://yarnpkg.com/):

~~~bash
yarn
yarn start
~~~

The following commands use [npm](https://www.npmjs.com/):

~~~bash
npm install
npm start
~~~

The app runs on a localhost, for example *http://localhost:4200*.

## Add Booking to the app

Stop the dev server before installing the Booking package, then create an Angular component that wraps the widget.

### Step 1. Install the package

Download the [trial Booking package](how-to-start.md#installing-trial-booking-via-npm-or-yarn) and follow the steps in the package README. The trial version stays active for 30 days.

### Step 2. Create the Booking component

Create a *booking* folder in the *src/app/* directory and add a *booking.component.ts* file inside it. Complete the steps below to wire the widget.

#### Import the source files

Import the Booking class with the path that matches your distribution:

- *dhx-booking-package* — PRO version installed from a local folder
- *@dhx/trial-booking* — trial version

The following code snippet imports Booking from the PRO package:

~~~ts
import { Booking } from 'dhx-booking-package';
~~~

The following code snippet imports Booking from the trial package:

~~~ts
import { Booking } from '@dhx/trial-booking';
~~~

:::info
This tutorial uses the trial version of Booking.
:::

#### Set the container and initialize Booking

Define the host container in the component template and instantiate Booking in `ngOnInit()`. Call `destructor()` in `ngOnDestroy()` to unmount the widget when Angular removes the component.

The following code snippet declares a Booking component with a container element and lifecycle hooks:

~~~ts {1,8,12-13,18-19} title="booking.component.ts"
import { Booking } from '@dhx/trial-booking';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "booking", // used in app.component.ts as <booking />
    styleUrls: ["./booking.component.css"],
    template: `<div #container class="widget"></div>`,
})

export class BookingComponent implements OnInit, OnDestroy {
    // host container for Booking
    @ViewChild('container', { static: true }) booking_container!: ElementRef;

    private _booking!: Booking;

    ngOnInit() {
        // create the Booking instance
        this._booking = new Booking(this.booking_container.nativeElement, {});
    }

    ngOnDestroy(): void {
        this._booking.destructor(); // unmount Booking
    }
}
~~~

#### Add the styles

Booking requires both the widget stylesheet and a sized container.

Create a *booking.component.css* file in the *src/app/booking/* directory.

The following code snippet imports the Booking stylesheet and sets full height for the page and the widget container:

~~~css title="booking.component.css"
/* import Booking styles */
@import "@dhx/trial-booking/dist/booking.css";

/* page styles */
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

/* Booking container */
.widget {
    height: 100%;
}
~~~

#### Load data

To load card data into Booking, prepare a dataset matching the [`data`](api/config/booking-data.md) property. For the full data format and loading scenarios, see the [Loading data](guides/loading-data.md) guide.

Create a *data.ts* file in the *src/app/booking/* directory.

The following code snippet defines a `getData()` helper that returns a sample dataset:

~~~ts title="data.ts"
export function getData() : any {
    function getDate(addDays : any, hoursValue = 0, minutesValue = 0) {
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
                },
            ],
            usedSlots: [getDate(0, 12), getDate(0, 18)]
        },
        // ...
    ];
}
~~~

Open *booking.component.ts*, import the dataset, and pass it to the Booking configuration inside `ngOnInit()`.

The following code snippet wires `getData()` into the Booking constructor:

~~~ts {2,18,20} title="booking.component.ts"
import { Booking } from '@dhx/trial-booking';
import { getData } from "./data"; // import data
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "booking",
    styleUrls: ["./booking.component.css"],
    template: `<div #container class="widget"></div>`,
})

export class BookingComponent implements OnInit, OnDestroy {
    @ViewChild('container', { static: true }) booking_container!: ElementRef;

    private _booking!: Booking;

    ngOnInit() {
        const data = getData(); // load the dataset
        this._booking = new Booking(this.booking_container.nativeElement, {
            data
        });
    }

    ngOnDestroy(): void {
        this._booking.destructor();
    }
}
~~~

The Booking component now renders with the loaded data. To customize the widget further, pass extra configuration properties — see the full list in the [Properties overview](api/overview/booking-properties-overview.md).

#### Handle events

A user action in the widget triggers an event. Subscribe to an event with `booking.api.on(eventName, handler)` to react to the action. For the full list of events, see the [Events overview](api/overview/booking-events-overview.md).

Open *booking.component.ts* and extend `ngOnInit()` with an event subscription.

The following code snippet logs the slot ID when a user selects a slot:

~~~ts {7-10} title="booking.component.ts"
// ...
ngOnInit() {
    this._booking = new Booking(this.booking_container.nativeElement, {
        start: new Date(2024, 5, 10),
    });

    // log the selected slot id
    this._booking.api.on("select-slot", (obj) => {
        console.log(obj.id);
    });
}

ngOnDestroy(): void {
    this._booking.destructor();
}
~~~

### Step 3. Register Booking in the app

Add the `BookingComponent` to the application bootstrap. Open *src/app/app.component.ts* and replace the default code.

The following code snippet renders the Booking component inside `AppComponent`:

~~~ts {5} title="app.component.ts"
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<booking/>` // template defined in booking.component.ts
})
export class AppComponent {
    name = "";
}
~~~

Create *app.module.ts* in *src/app/* and declare both components.

The following code snippet registers `AppComponent` and `BookingComponent` in the root module:

~~~ts {4-5,8} title="app.module.ts"
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BookingComponent } from "./booking/booking.component";

@NgModule({
    declarations: [AppComponent, BookingComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
~~~

Open *src/main.ts* and bootstrap the root module.

The following code snippet starts the application with `AppModule`:

~~~ts title="main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
~~~

Start the app to see Booking loaded with data on the page.

![Booking initialization](../assets/trial-booking.png)

Customize the code to match your project requirements. The complete reference implementation is available on [GitHub](https://github.com/DHTMLX/angular-booking-demo).
