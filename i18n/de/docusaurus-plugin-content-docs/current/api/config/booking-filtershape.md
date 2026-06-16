---
sidebar_label: filterShape
title: filterShape
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die filterShape-Konfiguration. Lesen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# filterShape

### Beschreibung {#description}

@short: Optional. Ein Objekt mit Einstellungen zur Steuerung der Filter-Funktionalität

### Verwendung {#usage}

~~~jsx {}
filterShape: {
    text?: boolean | [{
        id: string,
        label?: string,
        suggest?: boolean
    }],
    date?: boolean,
    time?: boolean | [{
        from: number | string,
        to: number | string,
        label?: string
    }],
    autoApply?: boolean
};
~~~

### Parameter {#parameters}

- `text` - (optional) wenn `true`, wird das Texteingabefeld angezeigt (Standard); wenn `false`, wird das Textfeld ausgeblendet
  - `id` - (erforderlich) der Name eines Kartenfelds, nach dem gefiltert werden soll (eine `data`-Eigenschaft, zum Beispiel `category` oder `title`)
  - `suggest` - (optional) wenn `true`, wird die automatische Vervollständigung aktiviert und die Werte (aus dem [`data`](api/config/booking-data.md)-Objekt), die mit dem eingegebenen Text des Benutzers übereinstimmen, werden angezeigt
  - `label` - (optional) die Beschriftung für die Eigenschaft aus dem `data`-Objekt. Siehe [Standardkonfiguration](#default-config) unten.
- `date` - (optional) zeigt das Datumsfeld an oder blendet es aus; `true` ist standardmäßig gesetzt (das Feld wird angezeigt)
- `time` - (optional) zeigt das Zeitfeld an oder blendet es aus. Wenn auf `true` gesetzt, nimmt es ein Array von Objekten mit Standard-Zeitoptionen für einen Slot entgegen. Für jedes Objekt können Sie die folgenden Parameter angeben:
  - `from` - (erforderlich) die Startzeit für einen Slot; kann eine Zahl von 0 bis 24 sein, die die Zeit in Stunden angibt (z. B. bedeutet 9 → 9:00 Uhr, 8.5 → 8:30 Uhr), oder eine Zeichenkette im Format "h:m" (zum Beispiel "8:30")
  - `to` - (erforderlich) die Endzeit für einen Slot; kann eine Zahl von 0 bis 24 sein, die die Zeit in Stunden angibt (z. B. bedeutet 9 → 9:00 Uhr, 8.5 → 8:30 Uhr), oder eine Zeichenkette im Format "h:m" (zum Beispiel "8:30")
  - `label` - (optional) Platzhaltertext für das Zeitfeld
Wenn die `time`-Parameter nicht gesetzt sind, werden die Standardwerte verwendet: siehe [Standardkonfiguration](#default-config) unten.
- `autoApply` - (optional) wenn `true`, werden die Suchkriterien automatisch angewendet (ohne dass die Suche durch Klicken auf die Schaltfläche gestartet werden muss); `false` ist standardmäßig gesetzt

### Standardkonfiguration {#default-config}

~~~jsx {}
const defaultTimeRanges = [
    { from: 8, to: 12, label: "Morning" },
    { from: 12, to: 17, label: "Afternoon" },
    { from: 17, to: 20, label: "Evening" }
];

const defaultFilterShape = {
    text: [
        { id: "category", label: "speciality", suggest: true },
        { id: "title", label: "specialist", suggest: true },
        { id: "details", label: "location" }
    ],
    date: true,
    time: defaultTimeRanges,
    autoApply: false
};
~~~

### Beispiel {#example}

~~~jsx {}
const filterShape = {
    date: false,
    autoApply: true,
    time: [
        { from: 8, to: 11, label: "Morning" },
        { from: 12, to: 18, label: "Afternoon" },
        { from: 18, to: 21, label: "Evening" }
    ]
};

new booking.Booking("#root", {
    data,
    filterShape,
    // other parameters
});
~~~

Das folgende Snippet zeigt, wie der Filter konfiguriert wird:

<iframe src="https://snippet.dhtmlx.com/b5uj78bs?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
