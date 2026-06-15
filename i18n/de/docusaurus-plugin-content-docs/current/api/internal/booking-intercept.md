---
sidebar_label: api.intercept()
title: intercept() Methode
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die intercept-Methode. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# api.intercept()

### Beschreibung {#description}

@short: Ermöglicht das Abfangen und Verhindern von internen Events

### Verwendung {#usage}

~~~jsx {}
api.intercept(
    event: string,
    callback: function,
    config?: { tag?: number | string }
): void;
~~~

### Parameter {#parameters}

- `event` - (erforderlich) ein auszulösendes Event
- `callback` - (erforderlich) ein auszuführender Callback (die Callback-Argumente hängen vom ausgelösten Event ab)
- `config` - (optional) ein Objekt mit zusätzlichen Einstellungen für den Callback:
  - `tag` - (optional) ein Tag, der den Callback identifiziert, damit er später über die Methode [`api.detach()`](api/internal/booking-detach.md) entfernt werden kann

:::info
Die vollständige Liste der internen Booking-Events finden Sie [**hier**](api/overview/booking-events-overview.md).
Verwenden Sie die Methode [`api.on()`](api/internal/booking-on.md), wenn Sie Aktionen nur beobachten möchten, ohne sie zu verändern. Um Änderungen an den Aktionen vorzunehmen, verwenden Sie die Methode `api.intercept()`.
:::

### Beispiel {#example}

~~~jsx {7-11}
// Booking erstellen
const widget = new booking.Booking("#root", {
    data,
    // weitere Konfigurationsparameter
});

// Jedes Mal, wenn das filter-data-Event ausgelöst wird, werden nur Slots für den Vormittag angezeigt
widget.api.intercept("filter-data", data => {
    data.time = [{ from: 9, to: 12 }];
});
~~~
