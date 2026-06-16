---
sidebar_label: Initialisierung
title: Initialisierung
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie alles über die Initialisierung. Lesen Sie Entwicklerhandbücher und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# Initialisierung {#initialization}

Diese Anleitung führt Sie durch die Erstellung einer Booking-Instanz auf einer Seite. Führen Sie die folgenden Schritte aus, um eine funktionierende Komponente zu erhalten:

1. [Booking-Quelldateien einbinden](#include-source-files).
2. [Einen Container erstellen](#create-a-container).
3. [Booking mit dem Konstruktor initialisieren](#initialize-booking).

## Quelldateien einbinden {#include-source-files}

Das Booking-Widget wird als zwei Dateien geliefert, die Sie auf der Seite laden.

[Laden Sie das Paket herunter](https://dhtmlx.com/docs/products/dhtmlxBooking/) und entpacken Sie es in einen Ordner Ihres Projekts. Fügen Sie Ihrer Seite die folgenden Dateien hinzu:

- *booking.js* — Booking-Quellcode
- *booking.css* — Booking-Stylesheet

Legen Sie die korrekten relativen Pfade zu den Quelldateien fest.

Das folgende Code-Snippet bindet die Booking-Dateien aus einem *dist/*-Ordner ein:

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>
<link rel="stylesheet" href="./dist/booking.css">
~~~

## Einen Container erstellen {#create-a-container}

Fügen Sie ein HTML-Element hinzu, das das Booking-Widget aufnimmt, und weisen Sie ihm eine ID zu, zum Beispiel *root*.

Das folgende Code-Snippet erstellt einen Container mit der ID *root*:

~~~jsx title="index.html"
<div id="root"></div>
~~~

## Booking initialisieren {#initialize-booking}

Rufen Sie den Konstruktor `booking.Booking` mit zwei Parametern auf:

- container — der Selektor oder die ID des HTML-Containers, der das Widget aufnimmt
- config — ein Objekt mit Konfigurationseigenschaften (siehe [Konfigurationseigenschaften](#configuration-properties))

Das folgende Code-Snippet initialisiert Booking innerhalb des Containers `#root`:

~~~jsx title="index.html"
// Booking erstellen
new booking.Booking("#root", {
    // Konfigurationseigenschaften
});
~~~

### Konfigurationseigenschaften {#configuration-properties}

:::info
Die vollständige Liste der Eigenschaften zur Konfiguration von Booking finden Sie in der [Eigenschaften-Übersicht](api/overview/booking-properties-overview.md).
:::

## Beispiel {#example}

Das folgende Snippet initialisiert Booking mit einer Reihe von Anfangseigenschaften:

<iframe src="https://snippet.dhtmlx.com/6it4ohez?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
