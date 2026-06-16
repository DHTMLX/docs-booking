---
sidebar_label: api.getReactiveState()
title: Methode getReactiveState()
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die Methode getReactiveState. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# api.getReactiveState()

### Beschreibung {#description}

@short: Gibt ein Objekt mit den reaktiven Eigenschaften von Booking zurück

### Verwendung {#usage}

~~~jsx {}
api.getReactiveState(): object;
~~~

### Rückgabewert {#returns}

Die Methode gibt ein Objekt zurück, in dem jedes Feld ein reaktiver beschreibbarer Store (`IPublicWritable`) ist, der den entsprechenden Zustandswert kapselt. Abonnieren Sie einen Store mit `.subscribe(callback)`, um auf Änderungen zu reagieren. Die zugrunde liegenden Werte sind:

~~~jsx {}
{
    data: [], // ein Array von Kartenobjekten
    cardShape: {}, // ein Objekt mit Einstellungen für Karten
    filteredData: [], // gefiltertes Daten-Array
    filterShape: {}, // ein Objekt mit Filter-Einstellungen
    filterValues: {}, // ein Objekt mit Filterwerten (Text, Datum, Uhrzeit)
    formShape: [], // ein Array von Objekten mit Einstellungen für den Booking-Editor-Dialog
    infoShape: {}, // ein Objekt mit Einstellungen für die linke Seite des Booking-Editors
    selectedItem: {}, // einzelnes Datenelement
    selectedSlot: {}, // ein Objekt mit Slot-ID und Uhrzeit ([Zeitstempel, Dauer in Minuten])
    slotGap: number, // Abstand zwischen Slots in Minuten
    slotSize: number, // Slot-Größe in Minuten
    start: Date, // Startdatum des angezeigten Bereichs
    end: Date, // Enddatum des angezeigten Bereichs
    renderType: "default" | "lazy" // Karten-Rendering-Modus
}
~~~

### Beispiel {#example}

~~~jsx {7-9,11-14}
// Booking erstellen
const widget = new booking.Booking("#root", {
    data,
    //other properties
});

// den Reactive State von Booking abrufen und in der Konsole ausgeben
const state = widget.api.getReactiveState();
console.log(state);

// Änderungen an den Karten abonnieren und das Karten-Array ausgeben
state.data.subscribe((data) => {
    console.log(data);
});
~~~
