---
sidebar_label: select-slot
title: select-slot Event
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über das select-slot-Event. Durchsuchen Sie Entwicklerhandbücher und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# select-slot

### Beschreibung {#description}

@short: Wird ausgelöst, wenn ein Slot ausgewählt wird

### Verwendung {#usage}

~~~jsx {}
"select-slot": ({
    id: string | number,
    time:[ number, number ]
}) => void;
~~~

### Parameter {#parameters}

Der Callback des `select-slot`-Events kann ein Objekt mit folgenden Parametern entgegennehmen:

- `id` - (erforderlich) die ID der Karte, zu der der ausgewählte Slot gehört
- `time` - (erforderlich) ein Array mit der Startzeit des Slots in Millisekunden und der Slot-Dauer in Minuten (die Startzeit ist in Millisekunden angegeben und repräsentiert die lokale Ortszeit)

### Beispiel {#example}

~~~jsx {7-10}
// Booking erstellen
const widget = new booking.Booking("#root", {
    data,
    // weitere Konfigurationsparameter
});

// die ID des ausgewählten Slots ausgeben
widget.api.on("select-slot", (obj) => {
    console.log(obj.id);
});
~~~
