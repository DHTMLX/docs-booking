---
sidebar_label: slotSize
title: slotSize
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über slotSize. Erkunden Sie Entwicklerhandbücher und API-Referenz, testen Sie Codebeispiele und Live-Demos, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# slotSize

### Beschreibung {#description}

@short: Optional. Definiert die Dauer eines Buchungs-Slots für alle Karten

:::note
Dieser Wert wird angewendet, wenn für den Parameter `size` oder `slotSize` innerhalb der Eigenschaft [`data`](api/config/booking-data.md) kein Größenwert festgelegt ist.
:::

### Verwendung {#usage}

~~~jsx {}
slotSize?: number;
~~~

### Parameter {#parameters}

- `number` - (optional) die Dauer eines Buchungs-Slots in Minuten; der Standardwert beträgt 60 Minuten

### Beispiel {#example}

~~~jsx {}
const slotSize = 45;

new booking.Booking("#root", {
    slotSize,
    // andere Parameter
});
~~~

Das folgende Snippet zeigt, wie Dauer und [Gap](api/config/booking-slotgap.md) für alle Slots festgelegt werden:

<iframe src="https://snippet.dhtmlx.com/pw8xsl1p?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
