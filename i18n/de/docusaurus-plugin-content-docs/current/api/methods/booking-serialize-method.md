---
sidebar_label: serialize()
title: serialize() Methode
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie alles über die serialize()-Methode. Durchsuchen Sie Entwickleranleitungen und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# serialize()

### Beschreibung {#description}

@short: Serialisiert Booking-Daten in ein JSON-Array

### Verwendung {#usage}

~~~jsx
serialize(): object[];
~~~

### Rückgabewert {#returns}

Gibt das [Daten](api/config/booking-data.md)-Array zurück.

### Beispiel {#example}

~~~jsx {}
// Booking erstellen
const widget = new booking.Booking("#root", {
    data,
    // Konfigurationsparameter
});

console.log(widget.serialize());
~~~
