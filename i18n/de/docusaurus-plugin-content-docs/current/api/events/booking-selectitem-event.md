---
sidebar_label: select-item
title: select-item Event
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über das select-item-Event. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# select-item

### Beschreibung {#description}

@short: Wird ausgelöst, wenn ein Element ausgewählt wird

### Verwendung {#usage}

~~~jsx {}
"select-item": ({
    id: string|number
}) => void;
~~~

### Parameter {#parameters}

Der Callback des `select-item`-Events kann ein Objekt mit folgenden Parametern entgegennehmen:

- `id` - (erforderlich) die ID eines Elements

### Beispiel {#example}

~~~jsx {7-10}
// Booking erstellen
const widget = new booking.Booking("#root", {
    data,
    // weitere Konfigurationsparameter
});

// die ID des ausgewählten Elements ausgeben
widget.api.on("select-item", (ev) => {
    console.log(ev.id);
});
~~~
