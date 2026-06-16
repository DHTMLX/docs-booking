---
sidebar_label: select-item-date
title: select-item-date Event
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie alles über das select-item-date Event. Lesen Sie Entwickleranleitungen und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# select-item-date

### Beschreibung {#description}

@short: Wird ausgelöst, wenn ein Datum für ein Element ausgewählt wird

### Verwendung {#usage}

~~~jsx {}
"select-item-date": ({
    id: string|number,
    date: number
}) => void;
~~~

### Parameter {#parameters}

Der Callback des `select-item-date` Events kann ein Objekt mit den folgenden Parametern entgegennehmen:

- `id` - (erforderlich) die ID eines Elements
- `date` - (erforderlich) das Datum (in Millisekunden), das für das ausgewählte Element gesetzt wurde

### Beispiel {#example}

~~~jsx {7-10}
// Booking erstellen
const widget = new booking.Booking("#root", {
    data,
    // weitere Konfigurationsparameter
});

// Datum ausgeben
widget.api.on("select-item-date", (ev) => {
    console.log(ev.date);
});
~~~
