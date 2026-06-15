---
sidebar_label: api.setNext()
title: setNext Method
description: You can learn about the setNext method in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# api.setNext()

### Description

@short: Adds a custom handler to the end of the widget's Event Bus chain

### Usage

~~~jsx {}
api.setNext(next: any): void;
~~~

### Parameters

- `next` - (required) the action to be included into the **Event Bus** order  

### Example

The example below shows how to use the `api.setNext()` method to integrate some custom class into the Event Bus order:

~~~jsx {}
const widget = new booking.Booking("#root", { data: [] });
const server = "https://some-backend-url";

// Assume you have a custom server service class named someServerService
const someServerService = new ServerDataService(server);

fetch(server + "/data").then((res) => res.json()).then((data) => { 
    widget.setConfig({data});
});   
// Integrate someServerService into the Event Bus order of the widget
widget.api.setNext(someServerService);
~~~

**Related articles**: [Loading data](guides/loading-data.md)
