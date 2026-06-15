---
sidebar_label: setConfirmHandler()
title: setConfirmHandler() Methode
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die Methode setConfirmHandler(). Lesen Sie Entwicklerhandbücher und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# setConfirmHandler()

### Beschreibung {#description}

@short: Registriert einen Handler für das confirm-slot-Event

### Verwendung {#usage}

~~~jsx
setConfirmHandler(confirmHandler: (ev) => any): void;
~~~

### Parameter {#parameters}

Die Methode nimmt die Funktion `confirmHandler` entgegen, die beim Bestätigen eines Slots für eine Buchung aufgerufen wird. Die Funktion erhält das Objekt wie im [`confirm-slot`](api/events/booking-confirmslot-event.md)-Event.

### Beispiel {#example}

~~~jsx {}
const { data } = getData();
const widget = new booking.Booking("#root", {
    data
});

widget.setConfirmHandler((ev) => {
    console.log("Booking info:", ev);
});
~~~

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Verwandte Artikel**: [Reservierungen auf dem Server speichern](guides/saving-reservations.md)
