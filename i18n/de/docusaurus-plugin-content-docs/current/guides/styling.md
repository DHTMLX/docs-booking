---
sidebar_label: Styling
title: Styling
description: Sie können mehr über das Styling in der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren. Durchsuchen Sie Entwicklerleitfäden und die API-Referenz, testen Sie Code-Beispiele und Live-Demos, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# Styling

Passen Sie das Booking-Widget über CSS-Custom-Properties an. Das Widget stellt Booking-spezifische Layout-Tokens unter dem Namespace `--wx-booking-*` bereit und teilt generische Design-Tokens (Farben, Rahmen, Typografie) unter dem Namespace `--wx-*`.

## Standard-Stil {#default-style}

Das Booking-Widget verwendet CSS-Custom-Properties für Layout-Dimensionen und gemeinsame Theme-Tokens. Überschreiben Sie diese Variablen in Ihrem eigenen CSS, um das Erscheinungsbild anzupassen.

Der folgende Code-Ausschnitt zeigt eine Teilmenge der Booking-spezifischen Variablen, die das Widget bereitstellt (mit ihren Desktop-Werten; intern definiert das Widget einige davon je nach Bildschirmgröße neu — Desktop, Tablet und Mobil):

~~~css
.wx-booking {
    --wx-booking-content-min-width: 984px;
    --wx-booking-content-max-width: 1132px;
    --wx-booking-content-padding: 0 var(--wx-booking-content-h-padding) 28px;
    --wx-booking-slots-width: 602px;
    --wx-booking-slots-padding: 0 30px 0 50px;
    --wx-booking-separator: var(--wx-border);
}
~~~

:::tip Hinweis
In zukünftigen Versionen von Booking können sich Variablennamen ändern. Überprüfen Sie die Namen nach einem Update auf eine neuere Version und passen Sie Ihren Code an, um Darstellungsprobleme zu vermeiden.
:::

## Eingebautes Theme anwenden {#apply-the-built-in-theme}

Das Widget bietet ein eingebautes Theme — das Material-Theme.

Wenden Sie das Theme an, indem Sie die entsprechende CSS-Klasse zum Widget-Container hinzufügen.

Der folgende Code-Ausschnitt fügt das Material-Theme dem Booking-Container hinzu:

~~~html {}
<!-- Booking-Container -->
<div id="root" class="wx-material-theme"></div>
~~~

Um das Theme-Stylesheet aus dem Skins-Ordner zu laden, fügen Sie ein Link-Tag auf der Seite hinzu.

Der folgende Code-Ausschnitt bindet das Material-Theme-Stylesheet ein:

~~~html {}
<link rel="stylesheet" href="path/to/booking/skins/material.css"/>
~~~

## Eingebautes Theme anpassen {#customize-the-built-in-theme}

Überschreiben Sie die Material-Theme-Variablen unter dem Selektor `.wx-material-theme`.

Der folgende Code-Ausschnitt färbt das Material-Theme für ein dunkles Layout um:

~~~html
<style>
    .wx-material-theme {
        color-scheme: dark;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-icon-color-hover: rgba(255, 255, 255, 0.2);
        --wx-background: #949393;
        --wx-booking-background: #c0bbbb;
        --wx-background-alt: #a5a3a3;
        --wx-booking-content-background: #a3a1a1;
        --wx-border: 1px solid #818080;
        --wx-border-medium: 1px solid #9e9e9e;
        --wx-input-background: #d6d3d3;
    }
</style>
~~~

## Benutzerdefinierte Styles anwenden {#apply-custom-styles}

Um das Design Ihres Projekts anzupassen, setzen Sie die CSS-Variablen unter einer benutzerdefinierten Klasse am Booking-Container.

Der folgende Code-Ausschnitt definiert eine benutzerdefinierte Palette für den `.demo`-Container:

~~~html
<div id="root" class="demo"></div>
<style>
    .demo {
        --wx-background: #c4c7e0;
        --wx-color-font: rgba(12, 12, 116, 0.9);
        --wx-color-secondary-font: rgba(34, 33, 33, 0.904);
        --wx-icon-color: rgba(149, 179, 223, 0.7);
        --wx-booking-primary-hover: #194e9e;
        --wx-booking-border-color: 1px solid #818080;
        --wx-border: 1px dashed #818080;
    }
</style>
~~~

Der folgende Code-Ausschnitt ändert die Hintergrundfarbe von Karten und Datumselementen:

~~~html
<style>
    .demo {
        .wx-booking .wx-list > .wx-card,
        .wx-booking .wx-slot-dates > .wx-date-item {
            background-color: #e8f3f7;
        }

        .wx-booking .wx-slot-dates > .wx-date-item.wx-selected {
            background-color: #bfdde7;
        }
    }
</style>
~~~

## Beispiel {#example}

Der folgende Ausschnitt zeigt einen benutzerdefinierten Booking-Stil:

<iframe src="https://snippet.dhtmlx.com/d7w3jtqz?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
