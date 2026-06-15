---
sidebar_label: api.setNext()
title: setNext() Methode
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die setNext-Methode. Lesen Sie Entwicklerhandbücher und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# api.setNext()

### Beschreibung {#description}

@short: Fügt einen benutzerdefinierten Handler am Ende der Event-Bus-Kette des Widgets hinzu

### Verwendung {#usage}

~~~jsx {}
api.setNext(next: any): void;
~~~

### Parameter {#parameters}

- `next` - (erforderlich) die Aktion, die in die **Event Bus**-Reihenfolge eingebunden werden soll

### Beispiel {#example}

Das folgende Beispiel zeigt, wie Sie die Methode `api.setNext()` verwenden, um eine benutzerdefinierte Klasse in die Event-Bus-Reihenfolge zu integrieren:

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

**Verwandte Artikel**: [Daten laden](guides/loading-data.md)
