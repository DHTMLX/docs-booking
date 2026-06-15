---
sidebar_label: start
title: start
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über das Startdatum. Durchsuchen Sie Entwicklerhandbücher und die API-Referenz, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Booking herunter.
---

# start

### Beschreibung {#description}

@short: Optional. Legt das Datum fest, ab dem verfügbare Zeitfenster angezeigt werden

### Verwendung {#usage}

~~~jsx {}
start?: Date;
~~~

### Parameter {#parameters}

- `Date` - (optional) das Startdatum, ab dem verfügbare Zeitfenster angezeigt werden; der Standardwert ist das aktuelle Datum.

### Beispiel {#example}

~~~jsx {}
new booking.Booking("#root", {
    data,
    start: new Date(2024, 10, 10),
    // weitere Parameter
});
~~~

Das folgende Snippet zeigt, wie das Start- und [Enddatum](api/config/booking-end.md) festgelegt werden:

<iframe src="https://snippet.dhtmlx.com/cc28whe7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
