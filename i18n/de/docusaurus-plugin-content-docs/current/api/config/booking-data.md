---
sidebar_label: data
title: data
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die Konfiguration der Karten. Lesen Sie Entwickleranleitungen und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# data

### Beschreibung {#description}

@short: Optional. Ein Array von Objekten, das die Kartendaten enthält

### Verwendung {#usage}

~~~jsx {}
data: [
    {
        id: string | number,
        title: string,
        category?: string,
        subtitle?: string,
        details?: string,
        preview?: string, // Link zum Bild
        price?: string,
        review?: {
            stars: number,
            count: number
        },
        slots?: [
            {
                from: number | string, // Stunden von 0 bis 24
                to: number | string, // Stunden von 0 bis 24
                size?: number, // Slot-Länge in Minuten
                gap?: number, // Abstand zwischen Slots in Minuten
                days?: array, // Wochentage, auf die die Regel angewendet werden kann, von 0 bis 6
                dates?: array, // genaue Daten, auf die die Regel angewendet werden kann, als Timestamps
            }
        ],
        availableSlots?: [number, number][], // jeder Slot: [Timestamp, Slot-Dauer in Minuten]
        usedSlots?: number[], // Timestamps
        slotSize?: number, // Minuten
        slotGap?: number // Minuten
    }
];
~~~

### Parameter {#parameters}

Für jedes Kartenobjekt können Sie folgende Parameter angeben:

- `id` - (erforderlich) die ID einer Karte
- `title` - (erforderlich) der Titel einer Karte (z. B. der Name eines Spezialisten)
- `category` - (optional) der Kategoriename einer Karte (z. B. der Beruf eines Spezialisten)
- `subtitle` - (optional) der Untertitel einer Karte
- `details` - (optional) weitere Details einer Karte
- `preview` - (optional) eine Kartenvorschau als Link zum Kartenbild
- `price` - (optional) der Preis der Dienstleistung
- `review` - (optional) Bewertungsinformationen mit folgenden Parametern:
  - `stars` - (optional) die Anzahl der Bewertungssterne (von fünf)
  - `count` - (optional) die Anzahl der Bewertungen
- `slots` - (optional) ein Array von Objekten, das Slot-Regeln definiert (entweder `slots` oder `availableSlots` muss angegeben werden, um buchbare Zeiten anzuzeigen); jedes Slot-Objekt hat folgende Parameter:
  - `from` - (erforderlich) die Slot-Startzeit in Stunden von 0 bis 24
  - `to` - (erforderlich) die Slot-Endzeit in Stunden von 0 bis 24
  - `size` - (optional) die Dauer eines Slots in Minuten
  - `gap` - (optional) der Abstand zwischen Slots in Minuten; standardmäßig ist 0 gesetzt
  - `days` - (optional) Wochentage, an denen ein Slot zur Buchung verfügbar ist; mögliche Werte: von 0 bis 6, wobei 0 Sonntag und 6 Samstag entspricht; wenn keine Tage angegeben sind, gelten alle Tage standardmäßig; wenn Tage angegeben sind, werden die für diese Tage definierten Slot-Parameter (`to`, `from`, `size`, `gap`) angewendet
  - `dates` - (optional) ein Array von Timestamps in Millisekunden, die genaue Daten angeben, an denen ein Slot verfügbar ist; die Slot-Parameter (`to`, `from`, `size`, `gap`) für diese angegebenen Daten werden angewendet (Timestamps sind in Millisekunden und sollten die lokale Ortszeit darstellen)

:::note
Slot-Parameter, die für Tage angegeben sind, überschreiben gemeinsame Parameter, die für alle Tage definiert wurden.
Slot-Parameter, die für Daten angegeben sind, überschreiben Parameter, die für bestimmte Tage und alle Tage definiert wurden.
Wenn mehrere Slot-Objekte denselben Tag mit unterschiedlichem `size` oder `gap` ansprechen, dürfen sich ihre Zeitbereiche (`from`–`to`) nicht überschneiden. Überlappende Bereiche führen dazu, dass das Widget alle Slots für diesen Tag auslässt.
:::

- `availableSlots` - (optional) ein Array verfügbarer Slots; jeder Slot ist ein Array `[timestamp, duration]`, wobei der Timestamp in Millisekunden angegeben wird (lokale Ortszeit) und die Dauer die Slot-Länge in Minuten darstellt; wenn hier verfügbare Slots angegeben sind, werden alle Slots aus dem `slots`-Array ignoriert (d. h. nicht verfügbar)
- `usedSlots` - (optional) ein Array von Timestamps gebuchter Slots in Millisekunden (Timestamps sind in Millisekunden und sollten die lokale Ortszeit darstellen)
- `slotSize` - (optional) die Dauer eines Slots in Minuten; der Wert wird auf alle Slots dieser Karte angewendet, wenn kein anderer Wert im `slots`-Objekt gesetzt ist; standardmäßig sind *60* Minuten gesetzt
- `slotGap` - (optional) der Abstand zwischen Slots in Minuten, der für alle Slots der aktuellen Karte gilt; dieser Wert wird angewendet, wenn kein anderer Wert im `slots`-Objekt angegeben ist; standardmäßig ist 0 gesetzt

### Beispiel {#example}

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Debra Weeks",
        category: "Allergist",
        subtitle: "7 years of experience",
        details:
                "Silverstone Medical Center (Vanderbilt Avenue 13, Chestnut, New Zealand)",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // eine gemeinsame Slot-Regel für alle Tage außer denen, die unten für days und dates angegeben sind
                from: 14,
                to: 17,
                size: 30,
                gap: 10
            },
            {
                // diese Regel gilt für Tage 2 und 5 (Dienstag und Freitag) außer
                // dem Freitag aus dem Slot-Objekt unten
                from: 12,
                to: 17,
                size: 50,
                gap: 20,
                days: [2, 5]
            },
            {
                // diese Regel gilt für Tage 3 und 4 (Mittwoch und Donnerstag) und das genaue Datum
                from: 18,
                to: 20,
                size: 45,
                gap: 20,
                days: [3, 4],
                dates: [ 1683234000000 ] // genaues bevorstehendes Datum (5. Mai 2023, Freitag)
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // weitere Parameter
});
~~~

**Verwandte Artikel**: [Slot-Regeln definieren](guides/configuration.md#define-slot-rules)
