---
sidebar_label: setConfig()
title: setConfig() Methode
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die Methode setConfig(). Lesen Sie Entwicklerleitfäden und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Booking herunter.
---

# setConfig()

### Beschreibung {#description}

@short: Aktualisiert die aktuelle Konfiguration des Booking-Widgets

Die Methode wird verwendet, um die aktuelle Konfiguration des Booking-Widgets zu aktualisieren. Sie ist nützlich, wenn der zugrunde liegende Datensatz des Widgets aktualisiert werden muss.

### Verwendung {#usage}

~~~jsx
setConfig(config: object): void;
~~~

### Parameter {#parameters}

- `config` - (erforderlich) ein Objekt der Booking-Konfiguration. Die vollständige Liste der Eigenschaften finden Sie [hier](api/overview/booking-properties-overview.md)

:::info
Die Methode führt ein flaches Zusammenführen auf der obersten Ebene durch: Jede übergebene Eigenschaft ersetzt die vorhandene vollständig — verschachtelte Objekte wie `cardShape` oder `filterShape` werden nicht tief zusammengeführt. Um zuvor gesetzte Werte innerhalb eines verschachtelten Objekts beizubehalten, übergeben Sie das gesamte Objekt erneut. Die Methode zerstört anschließend die aktuelle Komponente und initialisiert eine neue.
:::

### Beispiel {#example}

~~~jsx {}
// Booking erstellen
const widget = new booking.Booking("#root", {
    data,
    cardShape: {
        review: false,
        subtitle: false,
        details: false
    },
    filterShape: {
        date: false,
        autoApply: true,
        time: [
            { from: 8, to: 11, label: "Morning" },
            { from: 12, to: 16, label: "Afternoon" },
            { from: 17, to: 20, label: "Evening" }
        ]
    }
});

// Konfigurationsparameter aktualisieren
widget.setConfig({
    cardShape: {
        review: true
    },
    filterShape: {
        date: true,
        autoApply: false,
        time: [
            { from: 9, to: 11, label: "Morning" },
            { from: 13, to: 17, label: "Afternoon" },
            { from: 18, to: 20, label: "Evening" }
        ]
    }
});
~~~

Das folgende Snippet zeigt, wie bereits gefilterte Daten geladen werden:

<iframe src="https://snippet.dhtmlx.com/f77ytme5?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
