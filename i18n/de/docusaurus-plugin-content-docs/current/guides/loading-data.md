---
sidebar_label: Daten laden
title: Daten laden
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie, wie Sie Daten in Booking laden. Durchsuchen Sie Entwicklerleitfäden und API-Referenz, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# Daten laden {#loading-data}

Das Booking-Widget akzeptiert ein Daten-Array über das Konfigurationsobjekt:

- [`data`](api/config/booking-data.md) — Array von Kartenobjekten mit Slot-Regeln

:::tip
Aktivieren Sie für große Datensätze das Lazy-Rendering mit der Eigenschaft [`renderType`](api/config/booking-rendertype.md), damit das Widget nur sichtbare Karten rendert.
:::

## Einen Beispieldatensatz vorbereiten {#prepare-a-sample-dataset}

Speichern Sie Kartendaten in einer separaten Datei, um den Datensatz seitenübergreifend und in Tests zu teilen. Jedes Kartenobjekt enthält Identifikationsfelder, Anzeigefelder und ein `slots`-Array, das Verfügbarkeitsregeln definiert.

Das folgende Code-Snippet definiert drei Kartenobjekte in einem *data.js*-Modul. Die Hilfsfunktion `getDate(addDays, hours, minutes)` gibt einen Zeitstempel für ein Datum relativ zum heutigen Tag zurück (zum Beispiel liefert `getDate(0, 12)` den heutigen Tag um 12:00 Uhr in lokaler Zeit):

~~~jsx title="data.js"
// gibt einen Zeitstempel für "heute + addDays" zur angegebenen Stunde:Minute (Ortszeit) zurück
function getDate(addDays, hours = 0, minutes = 0) {
    const date = new Date();
    date.setDate(date.getDate() + addDays);
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
}

const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "$35",
        review: {
            stars: 4,
            count: 120
        },
        slots: [
            {
                from: 9, to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10, to: 18,
                days: [6, 0]
            }
        ]
    },
    {
        id: "5c9b64ad-1830-4e5b-a5f9-8acea10706df",
        title: "James Anderson",
        category: "Allergist",
        subtitle: "3 years of experience",
        details: "UCLA Medical Center\n57 Westwood Plaza",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/11.jpg",
        price: "$30",
        review: {
            stars: 4,
            count: 64
        },
        slotSize: 45,
        slotGap: 10,
        slots: [
            {
                from: "9:15", to: 17,
                days: [1, 2, 3, 4, 5]
            }
        ]
    },
    {
        id: "9b037564-77be-429f-b719-eebbe499027a",
        title: "Emma Johnson",
        category: "Cardiologist",
        subtitle: "2 years of experience",
        details: "Stanford Health Care\n1468 Madison Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/03.jpg",
        price: "$25",
        review: {
            stars: 5,
            count: 10
        },
        slots: [
            {
                from: 14, to: 17,
                size: 30, gap: 10
            },
            {
                from: 12, to: 19,
                size: 50, gap: 20,
                days: [2], dates: [getDate(0)]
            },
            {
                from: "18:30", to: 20,
                size: 20, gap: 20,
                days: [3, 4, 5]
            },
        ],
        usedSlots: [getDate(0, 12), getDate(0, 18)]
    }
];
~~~

## Daten aus einer lokalen Datei laden {#load-data-from-a-local-file}

Laden Sie Kartendaten aus einer separaten JavaScript-Datei, indem Sie den Datensatz über eine Hilfsfunktion bereitstellen.

Das folgende Code-Snippet definiert `getData()`, das sowohl `data` als auch eine `cardShape`-Konfiguration zurückgibt:

~~~jsx {}
function getData() {
    return {
        data,
        cardShape
    };
}

const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "$35",
        review: {
            stars: 4,
            count: 120
        },
        slots: [
            {
                from: 9, to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10, to: 18,
                days: [6, 0]
            }
        ]
    },
    // weitere Karten
];

const cardShape = {
    preview: true,
    review: true,
    category: true,
    title: true,
    subtitle: true,
    price: true,
    details: true
};
~~~

Binden Sie die Datendatei auf der Seite nach den Booking-Quelldateien ein.

Das folgende Code-Snippet bindet das *data.js*-Modul in *index.html* ein:

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>
<link rel="stylesheet" href="./dist/booking.css">

<script src="./common/data.js"></script>
~~~

Übergeben Sie den von `getData()` zurückgegebenen Datensatz an den Booking-Konstruktor.

Das folgende Code-Snippet erstellt eine Booking-Instanz mit den geladenen Daten:

~~~jsx {}
const { data } = getData();
const widget = new booking.Booking("#root", { data });
~~~

## Daten nach der Initialisierung aktualisieren {#update-data-after-initialization}

Um den Datensatz nach der Initialisierung von Booking zu ersetzen, rufen Sie die Methode [`setConfig()`](api/methods/booking-setconfig-method.md) mit einem neuen `data`-Array auf. Die Methode initialisiert das Widget mit der zusammengeführten Konfiguration neu.

Das folgende Code-Snippet ruft einen aktuellen Datensatz vom Server ab und wendet ihn auf die bestehende Booking-Instanz an:

~~~jsx {}
fetch("/api/cards")
    .then(res => res.json())
    .then(data => {
        widget.setConfig({ data });
    });
~~~

Informationen zur serverseitigen Speicherung von Buchungen finden Sie im Leitfaden [Reservierungen auf dem Server speichern](guides/saving-reservations.md).

---

**Verwandte Artikel**:

- [`confirm-slot`](api/events/booking-confirmslot-event.md) — Slot-Buchungsbestätigung behandeln
- [`setConfig()`](api/methods/booking-setconfig-method.md) — Widget-Konfiguration nach der Initialisierung aktualisieren
- [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) — Handler für die Slot-Bestätigung definieren
- [`renderType`](api/config/booking-rendertype.md) — zwischen Standard- und Lazy-Rendering wechseln
- [Reservierungen auf dem Server speichern](guides/saving-reservations.md) — Buchungen serverseitig persistieren
