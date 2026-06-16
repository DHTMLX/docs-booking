---
sidebar_label: filter-data
title: filter-data Event
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über das filter-data-Event. Lesen Sie Entwickleranleitungen und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# filter-data

### Beschreibung {#description}

@short: Wird ausgelöst, wenn Filter angewendet werden

### Verwendung {#usage}

~~~jsx {}
"filter-data": ({
    text: string,
    date:{
        start: Date | null,
        end: Date | null
    },
    time:[{
        from: number | string,
        to: number | string,
        label?: string
    }]
 }) => void;
~~~

### Parameter {#parameters}

Der Callback des `filter-data`-Events kann ein Objekt mit folgenden Parametern entgegennehmen:

- `text` - (optional) der Text im Suchfeld
- `date` - (optional) ein Objekt mit dem Start- und Enddatum für einen Slot:
    - `start` - das Startdatum des Slots (`Date | null`)
    - `end` - das Enddatum des Slots (`Date | null`)
- `time` - (optional) ein Array von Objekten mit Zeitoptionen für einen Slot. Für jedes Objekt können Sie folgende Parameter angeben:
    - `from` - (erforderlich) die Startzeit für einen Slot; kann eine Zahl von 0 bis 24 sein, die die Zeit in Stunden angibt (z. B. bedeutet 9 den Wert 9:00, 8.5 den Wert 8:30), oder eine Zeichenkette im Format "h:m" (zum Beispiel "8:30")
    - `to` - (erforderlich) die Endzeit für einen Slot; kann eine Zahl von 0 bis 24 sein, die die Zeit in Stunden angibt (z. B. bedeutet 9 den Wert 9:00, 8.5 den Wert 8:30), oder eine Zeichenkette im Format "h:m" (zum Beispiel "8:30")
    - `label` - (optional) Platzhaltertext für den Zeitbereich

### Beispiel {#example}

Das folgende Beispiel zeigt, wie Sie bei der Initialisierung mithilfe der Methode [`api.exec()`](api/internal/booking-exec.md) einen Filter anwenden:

~~~jsx {6-18}
// Booking erstellen
const widget = new booking.Booking("#root", {
    data,
    // weitere Konfigurationsparameter
});
widget.api.exec("filter-data", {
    text: "Allergist",
    date: {
        start: new Date,
        end: new Date(2025, 4, 10)
    },
    time: [
        {
            from: 12,
            to: 20
        }
    ]
});
~~~
