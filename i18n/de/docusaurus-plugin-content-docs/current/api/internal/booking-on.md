---
sidebar_label: api.on()
title: on() Methode
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die on-Methode. Lesen Sie Entwicklerleitfäden und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# api.on()

### Beschreibung {#description}

@short: Ermöglicht das Anhängen eines Handlers an interne Events

### Verwendung {#usage}

~~~jsx {}
api.on(
    event: string,
    handler: function,
    config?: { tag?: number | string }
): void;
~~~

### Parameter {#parameters}

- `event` - (erforderlich) ein Event, das ausgelöst werden soll
- `handler` - (erforderlich) ein Handler, der angehängt werden soll (die Handler-Argumente hängen vom ausgelösten Event ab)
- `config` - (optional) ein Objekt mit zusätzlichen Einstellungen für den Handler:
  - `tag` - (optional) ein Tag, der den Handler identifiziert, damit er später über die Methode [`api.detach()`](api/internal/booking-detach.md) entfernt werden kann

:::info
Die vollständige Liste der internen Booking-Events finden Sie [**hier**](api/overview/booking-events-overview.md).
Verwenden Sie die Methode `api.on()`, wenn Sie Aktionen beobachten möchten, ohne sie zu verändern. Um Änderungen an den Aktionen vorzunehmen, verwenden Sie die Methode [`api.intercept()`](api/internal/booking-intercept.md).
:::

### Beispiel {#example}

~~~jsx {7-10}
// Booking erstellen
const widget = new booking.Booking("#root", {
    data,
    // andere Konfigurationsparameter
});

// die ID und Zeit des ausgewählten Slots ausgeben
widget.api.on("select-slot", (obj) => {
    console.log("The selected slot", obj.id, "and time", obj.time);
});
~~~
