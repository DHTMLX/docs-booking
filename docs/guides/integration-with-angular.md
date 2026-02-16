---
sidebar_label: Integration with Angular
title: Integration with Angular
description: You can learn about the integration with Angular in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Integration with Angular

:::tip
You should be familiar with basic concepts and patterns of **Angular** before reading this documentation. To refresh your knowledge, please refer to the [**Angular documentation**](https://v17.angular.io/docs).
:::

DHTMLX Booking is compatible with **Angular**. We have prepared code examples on how to use DHTMLX Booking with **Angular**. For more information, refer to the corresponding [**Example on GitHub**](https://github.com/DHTMLX/angular-booking-demo).

## Creating a project

:::info
Before you start to create a new project, install [**Angular CLI**](https://v17.angular.io/cli) and [**Node.js**](https://nodejs.org/en/).
:::

Create a new **my-angular-booking-app** project using Angular CLI. Run the following command for this purpose:

~~~json
ng new my-angular-booking-app
~~~

:::note
If you want to follow this guide, disable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering) when creating new Angular app!
:::

The command above installs all the necessary tools, so you don't need to run any additional commands.

### Installation of dependencies

Go to the new created app directory:

~~~json
cd my-angular-booking-app
~~~

Install dependencies and start the dev server. For this, use the [**yarn**](https://yarnpkg.com/) package manager:

~~~json
yarn
yarn start
~~~

The app should run on a localhost (for instance `http://localhost:3000`).

## Creating Booking

Now you should get the DHTMLX Booking source code. First of all, stop the app and proceed with installing the Booking package.

### Step 1. Package installation

Download the [**trial Booking package**](/how-to-start/#installing-trial-booking-via-npm-or-yarn) and follow steps mentioned in the README file. Note that trial Booking is available 30 days only.
  
### Step 2. Component creation

Now you need to create an Angular component, to add Booking into the application. Create  the ***booking*** folder in the ***src/app/*** directory, add a new file into it and name it ***booking.component.ts***. Then complete the steps described below.

#### Import source files

Open the file and import Booking source files. Note that:

- if you use PRO version and install the Booking package from a local folder, the imported path looks like this:

~~~jsx
import { Booking } from 'dhx-booking-package';
~~~

- if you use the trial version of Booking, specify the following path:

~~~jsx
import { Booking } from '@dhx/trial-booking';
~~~

:::info
In this tutorial you can see how to configure the **trial** version of Booking.
:::

#### Set the container and initialize Booking

To display Booking on the page, you need to set the container to render the component inside and initialize Booking using the corresponding constructor:

~~~jsx {1,8,12-13,18-19} title="booking.component.ts"
import { Booking } from '@dhx/trial-booking';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "booking", // a template name used in the "app.component.ts" file as <booking />
    styleUrls: ["./booking.component.css"], // include a css file
    template: `<div #container class="widget"></div>`,
})

export class BookingComponent implements OnInit, OnDestroy {
    // initialize container for Booking
    @ViewChild('container', { static: true }) booking_container!: ElementRef;

    private _booking!: Booking;

    ngOnInit() {
        // initialize the Booking component
        this._booking = new Booking(this.booking_container.nativeElement, {});
    }

    ngOnDestroy(): void {
        this._booking.destructor(); // destruct Booking
    }
}
~~~

#### Adding styles

To display Booking correctly, you need to provide the corresponding styles. For this purpose, you can create the ***booking.component.css*** file in the **src/app/booking/** directory and specify important styles for Booking and its container:

~~~css title="booking.component.css"
/* import Booking styles */
@import "@dhx/trial-booking/dist/booking.css";

/* specify styles for initial page */
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

/* specify styles for the Booking container */
.widget {
    height: 100%;
}
~~~

#### Loading data

To add data into Booking, you need to provide a data set. You can create the ***data.ts*** file in the ***src/app/booking/*** directory and add some data into it:

~~~jsx title="data.ts"
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
                },
            ],
            usedSlots: [getDate(0, 12), getDate(0, 18)]
        },
        // ...
    ];
}
~~~

Then open the ***booking.component.ts*** file. Import the file with data and specify the corresponding data properties to the configuration object of Booking within the `ngOnInit()` method, as shown below.

~~~jsx {2,18,20} title="booking.component.ts"
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
        const data = getData(); // initialize data property
        this._booking = new Booking(this.booking_container.nativeElement, {
            data
        });
    }

    ngOnDestroy(): void {
        this._booking.destructor(); 
    }
}
~~~

Now the Booking component is ready to use. When the element will be added to the page, it will initialize the Booking with data. You can provide necessary configuration settings as well. Visit our [Booking API docs](../../api/overview/booking-properties-overview/) to check the full list of available properties.

#### Handling events

When a user makes some action in the Booking, it invokes an event. You can use these events to detect the action and run the desired code for it. See the [full list of events](../../api/overview/booking-events-overview/).

Open the ***booking.component.ts*** file and complete the `ngOnInit()` method as in:

~~~jsx {7-10} title="booking.component.ts"
// ...
ngOnInit() {
    this._booking = new Booking(this.booking_container.nativeElement, {
        date: new Date(2024, 5, 10),
    });

    // output the id of the selected slot
    this._booking.api.on("select-slot", (obj) => {
        console.log(obj.id);
    });
}

ngOnDestroy(): void {
    this._booking.destructor(); 
}
~~~

### Step 3. Adding Booking into the app

To add the ***BookingComponent*** component into the app, open the ***src/app/app.component.ts*** file and replace the default code with the following one:

~~~jsx {5} title="app.component.ts"
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<booking/>` // a template created in the "booking.component.ts" file 
})
export class AppComponent {
    name = "";
}
~~~

Then create the ***app.module.ts*** file in the ***src/app/*** directory and specify the *BookingComponent* as shown below:

~~~jsx {4-5,8} title="app.module.ts"
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

The last step is to open the ***src/main.ts*** file and replace the existing code with the following one:

~~~jsx title="main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
~~~

After that, you can start the app to see Booking loaded with data on a page.

![Booking initialization](/assets/trial-booking.png)

Now you know how to integrate DHTMLX Booking with Angular. You can customize the code according to your specific requirements. The final example you can find on [**GitHub**](https://github.com/DHTMLX/angular-booking-demo).
