---
sidebar_label: Erste Schritte
title: Erste Schritte
description: Erfahren Sie, wie Sie mit DHTMLX Booking beginnen – in der Dokumentation der DHTMLX JavaScript Booking-Bibliothek. Lesen Sie Entwickler-Guides und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# Erste Schritte {#how-to-start}

Dieses Tutorial führt Sie durch die Schritte, die Sie ausführen müssen, um eine vollständig funktionsfähige Booking-Anwendung auf einer Seite einzurichten.

![Voll funktionsfähige DHTMLX Booking-Anwendung auf einer Webseite](/img/main.png)

## Schritt 1. Pakete herunterladen und installieren {#step-1-downloading-and-installing-packages}

[Laden Sie das Paket herunter](https://dhtmlx.com/docs/products/dhtmlxBooking/) und entpacken Sie es in einen Ordner Ihres Projekts.

Sie können JavaScript Booking mit dem Paketmanager `yarn` oder `npm` in Ihr Projekt importieren.

#### Trial-Booking über npm oder yarn installieren {#installing-trial-booking-via-npm-or-yarn}

:::info
Wenn Sie die Testversion von Booking verwenden möchten, laden Sie das Trial-[Booking-Paket](https://dhtmlx.com/docs/products/dhtmlxBooking/) herunter und befolgen Sie die im *README*-File beschriebenen Schritte. Beachten Sie, dass die Testversion von Booking nur 30 Tage lang verfügbar ist.
:::

#### PRO-Booking über npm oder yarn installieren {#installing-pro-booking-via-npm-or-yarn}

:::info
Sie können im [Client-Bereich](https://dhtmlx.com/clients/) direkt auf das private DHTMLX-**npm** zugreifen, indem Sie Ihren Login und Ihr Passwort für **npm** generieren. Eine ausführliche Installationsanleitung finden Sie dort ebenfalls. Bitte beachten Sie, dass der Zugriff auf das private **npm** nur verfügbar ist, solange Ihre proprietäre Booking-Lizenz aktiv ist.
:::

## Schritt 2. Quelldateien einbinden {#step-2-including-source-files}

Erstellen Sie zunächst eine HTML-Datei und benennen Sie sie *index.html*. Binden Sie anschließend die Booking-Quelldateien in die erstellte Datei ein.

Zwei Dateien sind erforderlich:

- die JS-Datei von Booking
- die CSS-Datei von Booking

~~~html {5-6} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Booking</title>
        <script src="./dist/booking.js"></script>
        <link href="./dist/booking.css" rel="stylesheet">
    </head>
    <body>
        <script>
        // Ihr Code kommt hier hin
        </script>
    </body>
</html>
~~~

:::tip
Wenn Sie JavaScript Booking in React-, Angular- oder Vue-Projekte integrieren möchten, finden Sie weitere Informationen in den entsprechenden [**Beispielen auf CodeSandbox**](https://codesandbox.io/u/DHTMLX).
:::

## Schritt 3. Booking erstellen {#step-3-creating-booking}

Jetzt können Sie Booking zur Seite hinzufügen. Erstellen Sie zunächst den DIV-Container für Booking.

~~~html {} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Booking</title>
        <script src="./dist/booking.js"></script>
        <link href="./dist/booking.css" rel="stylesheet">
    </head>
    <body>
        <div id="root"></div>
        <script>
            const widget = new booking.Booking("#root", {
                // Konfigurationseigenschaften
            });
        </script>
    </body>
</html>
~~~

## Schritt 4. Booking konfigurieren {#step-4-configuring-booking}

Um mit Booking arbeiten zu können, müssen Sie zunächst die Initialdaten bereitstellen. Anschließend können Sie weitere Konfigurationseigenschaften hinzufügen, die bei der Initialisierung angewendet werden sollen. Das folgende Beispiel erstellt Booking mit zwei Karten:

- die Eigenschaft [`data`](api/config/booking-data.md) ermöglicht das Hinzufügen von Daten zu jeder Karte, z. B. Titel, Bild, Bewertungsdaten und Buchungs-Slots
- die Eigenschaft [`cardShape`](api/config/booking-cardshape.md) hilft dabei zu konfigurieren, welche Datenfelder der Karten angezeigt werden sollen

~~~jsx {}
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
                from: 9,
                to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10,
                to: 18,
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
                from: "9:15",
                to: 17,
                days: [1, 2, 3, 4, 5]
            }
        ]
    }
];

const cardShape = {
    review: false,
    subtitle: false,
    price: false
};

new booking.Booking("#root", {
    data,
    cardShape,
    // weitere Parameter
});
~~~

## Wie geht es weiter? {#whats-next}

Das ist alles, was Sie benötigen, um ein einfaches Booking auf einer Seite zu erstellen. Erkunden Sie nun die Booking-API:

- Die Seiten unter [Guides](/category/guides) bieten Anleitungen zur Installation, zum Laden von Daten, zur Gestaltung und weitere hilfreiche Tipps für eine reibungslose Booking-Konfiguration
- Die [API-Referenz](api/overview/booking-api-overview.md) beschreibt die Funktionalität von Booking
