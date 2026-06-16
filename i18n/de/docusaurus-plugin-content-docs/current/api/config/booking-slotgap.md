---
sidebar_label: slotGap
title: slotGap
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über slotGap. Entdecken Sie Entwicklerhandbücher und API-Referenzen, testen Sie Code-Beispiele und Live-Demos, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# slotGap

### Beschreibung {#description}

@short: Optional. Legt einen Abstand zwischen Buchungsslots für alle Karten fest

:::note
Der Wert wird angewendet, wenn kein Abstandswert für den Parameter `gap` oder `slotGap` innerhalb der Eigenschaft [`data`](api/config/booking-data.md) gesetzt ist.
:::

### Verwendung {#usage}

~~~jsx {}
slotGap?: number;
~~~

### Parameter {#parameters}

- `number` - (optional) ein Abstand zwischen Slots in Minuten; standardmäßig ist 0 gesetzt

### Beispiel {#example}

~~~jsx {}
const slotGap = 10;

new booking.Booking("#root", {
    slotGap,
    // andere Parameter
});
~~~

Das folgende Snippet zeigt, wie Sie [Dauer](api/config/booking-slotsize.md) und Abstand für alle Slots festlegen:

<iframe src="https://snippet.dhtmlx.com/pw8xsl1p?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
