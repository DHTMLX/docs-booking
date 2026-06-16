---
sidebar_label: end
title: end
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über das Enddatum. Durchsuchen Sie Entwicklerhandbücher und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# end

### Beschreibung {#description}

@short: Optional. Legt das Datum fest, bis zu dem verfügbare Slots angezeigt werden

### Verwendung {#usage}

~~~jsx {}
end?: Date;
~~~

### Parameter {#parameters}

- `end` - (optional) das Enddatum, bis zu dem verfügbare Slots angezeigt werden; der Standardwert ist ein Jahr ab dem aktuellen Datum.

### Beispiel {#example}

~~~jsx {}
new booking.Booking("#root", {
    data,
    end: new Date(2025, 11, 11),
    // andere Parameter
});
~~~

Der folgende Ausschnitt zeigt, wie das [Start](api/config/booking-start.md)- und Enddatum festgelegt werden:

<iframe src="https://snippet.dhtmlx.com/cc28whe7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
