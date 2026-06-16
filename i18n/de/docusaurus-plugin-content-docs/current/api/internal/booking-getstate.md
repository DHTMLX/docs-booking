---
sidebar_label: api.getState()
title: getState() Methode
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die getState-Methode. Lesen Sie Entwickleranleitungen und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# api.getState()

### Beschreibung {#description}

@short: Gibt ein Objekt mit den StateStore-Eigenschaften von Booking zurück

### Verwendung {#usage}

~~~jsx {}
api.getState(): object;
~~~

### Rückgabewert {#returns}

Die Methode gibt ein Objekt mit den folgenden State-Feldern zurück:

~~~jsx {}
{
    data: [], // ein Array mit Kartenobjekten
    cardShape: {}, // ein Objekt mit Einstellungen für Karten
    filteredData: [], // gefiltertes Daten-Array
    filterShape: {}, // ein Objekt mit Filter-Einstellungen
    filterValues: {}, // ein Objekt mit Filterwerten (Text, Datum, Uhrzeit)
    formShape: [], // ein Array von Objekten mit Einstellungen für den Booking-Editor-Dialog
    infoShape: {}, // ein Objekt mit Einstellungen für die linke Seite des Booking-Editors
    selectedItem: {}, // einzelnes Datenelement
    selectedSlot: {}, // ein Objekt mit Slot-ID und Uhrzeit ([Zeitstempel, Dauer in Minuten])
    slotGap: number, // Slot-Abstand in Minuten
    slotSize: number, // Slot-Größe in Minuten
    start: Date, // Startdatum des angezeigten Bereichs
    end: Date, // Enddatum des angezeigten Bereichs
    renderType: "default" | "lazy" // Karten-Rendering-Modus
}
~~~

### Beispiel {#example}

~~~jsx {7-11}
// Booking erstellen
const widget = new booking.Booking("#root", {
    data,
    cardShape
});

// den State von Booking abrufen und in der Konsole ausgeben
const state = widget.api.getState();
console.log(state);
~~~
