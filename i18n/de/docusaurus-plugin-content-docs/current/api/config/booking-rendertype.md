---
sidebar_label: renderType
title: renderType
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über renderType. Lesen Sie Entwicklerhandbücher und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# renderType

### Beschreibung {#description}

@short: Optional. Legt fest, wie Karten gerendert werden

Die Eigenschaft hilft, die Performance bei der Arbeit mit einer großen Anzahl von Karten zu optimieren.

### Verwendung {#usage}

~~~jsx {}
renderType?: "default" | "lazy";
~~~

### Parameter {#parameters}

- `default` - rendert alle in das Widget geladenen Karten (Standardeinstellung)
- `lazy` - rendert nur sichtbare Karten

### Beispiel {#example}

~~~jsx {}
new booking.Booking("#root", {
    data,
    renderType: "lazy",
    // andere Parameter
});
~~~

Das folgende Snippet zeigt, wie das Rendering großer Datensätze gehandhabt wird:

<iframe src="https://snippet.dhtmlx.com/fb9a5a3b?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
