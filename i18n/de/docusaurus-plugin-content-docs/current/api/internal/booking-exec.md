---
sidebar_label: api.exec()
title: exec() Methode
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die exec-Methode. Lesen Sie Entwickleranleitungen und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# api.exec()

### Beschreibung {#description}

@short: Ermöglicht das Auslösen der internen Events

Die Methode ist asynchron und gibt ein Promise zurück, das mit der verarbeiteten Event-Konfiguration aufgelöst wird.

### Verwendung {#usage}

~~~jsx {}
api.exec(
    event: string,
    config: object
): Promise<any>;
~~~

### Parameter {#parameters}

- `event` - (erforderlich) ein auszulösendes Event
- `config` - (erforderlich) das Konfigurationsobjekt mit Parametern (siehe das auszulösende Event)

### Events {#events}

:::info
Die vollständige Liste der internen Booking-Events finden Sie [**hier**](api/overview/booking-events-overview.md).
:::

### Beispiel {#example}

Das folgende Beispiel zeigt, wie ein Filter bei der Initialisierung angewendet wird:

~~~jsx {5-19}
const widget = new booking.Booking("#root", {
    data,
    //andere Konfigurationsparameter
});
widget.api.exec("filter-data", {
    text: "Allergist",
    date: {
        start: new Date,
        end: new Date(2025, 2, 12)
    },
    time: [
        {
            from: 12,
            to: 20
        }
    ]
});
~~~
