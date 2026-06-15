---
sidebar_label: Integration mit Angular
title: Integration mit Angular
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die Integration mit Angular. Lesen Sie Entwicklerleitfäden und die API-Referenz, testen Sie Code-Beispiele und Live-Demos, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# Integration mit Angular {#integration-with-angular}

DHTMLX Booking lässt sich über eine benutzerdefinierte Komponente, die den Widget-Konstruktor kapselt, in Angular integrieren. Dieser Leitfaden führt Sie durch das Erstellen eines neuen Angular-Projekts, die Installation von Booking und das Rendern des Widgets mit Daten und Events. Die vollständige Referenzimplementierung finden Sie im [Angular-Beispiel auf GitHub](https://github.com/DHTMLX/angular-booking-demo).

:::tip
Dieser Leitfaden setzt Grundkenntnisse der Angular-Kernkonzepte voraus. Eine Einführung finden Sie in der [Angular-Dokumentation](https://v17.angular.io/docs).
:::

## Projekt erstellen {#create-a-project}

Erstellen Sie mit der Angular CLI ein neues Angular-Projekt, bevor Sie die Booking-Integration hinzufügen.

:::info
Installieren Sie [Angular CLI](https://v17.angular.io/cli) und [Node.js](https://nodejs.org/en/), bevor Sie beginnen.
:::

Der folgende Befehl erstellt ein neues Projekt namens *my-angular-booking-app*:

~~~bash
ng new my-angular-booking-app
~~~

:::note
Deaktivieren Sie Server-Side Rendering (SSR) und Static Site Generation (SSG/Prerendering), wenn Sie die CLI dazu auffordert. Das Booking-Widget wird clientseitig in das DOM eingehängt.
:::

Der Befehl installiert alle erforderlichen Tools. Weitere Befehle sind nicht notwendig.

### Abhängigkeiten installieren {#install-dependencies}

Wechseln Sie in das Projektverzeichnis.

Der folgende Befehl öffnet den neu erstellten App-Ordner:

~~~bash
cd my-angular-booking-app
~~~

Installieren Sie die Abhängigkeiten und starten Sie den Entwicklungsserver mit Ihrem Paketmanager.

Die folgenden Befehle verwenden [yarn](https://yarnpkg.com/):

~~~bash
yarn
yarn start
~~~

Die folgenden Befehle verwenden [npm](https://www.npmjs.com/):

~~~bash
npm install
npm start
~~~

Die App läuft auf einem Localhost, zum Beispiel *http://localhost:4200*.

## Booking zur App hinzufügen {#add-booking-to-the-app}

Stoppen Sie den Entwicklungsserver, bevor Sie das Booking-Paket installieren, und erstellen Sie dann eine Angular-Komponente, die das Widget kapselt.

### Schritt 1. Paket installieren {#step-1-install-the-package}

Laden Sie das [Booking-Testpaket](how-to-start.md#installing-trial-booking-via-npm-or-yarn) herunter und folgen Sie den Schritten in der README des Pakets. Die Testversion ist 30 Tage lang aktiv.

### Schritt 2. Booking-Komponente erstellen {#step-2-create-the-booking-component}

Erstellen Sie im Verzeichnis *src/app/* einen Ordner namens *booking* und fügen Sie darin eine Datei *booking.component.ts* hinzu. Führen Sie die folgenden Schritte aus, um das Widget zu verdrahten.

#### Quelldateien importieren {#import-the-source-files}

Importieren Sie die Booking-Klasse mit dem Pfad, der Ihrer Distribution entspricht:

- *dhx-booking-package* — PRO-Version, aus einem lokalen Ordner installiert
- *@dhx/trial-booking* — Testversion

Das folgende Code-Snippet importiert Booking aus dem PRO-Paket:

~~~ts
import { Booking } from 'dhx-booking-package';
~~~

Das folgende Code-Snippet importiert Booking aus dem Testpaket:

~~~ts
import { Booking } from '@dhx/trial-booking';
~~~

:::info
Dieses Tutorial verwendet die Testversion von Booking.
:::

#### Container festlegen und Booking initialisieren {#set-the-container-and-initialize-booking}

Definieren Sie den Host-Container im Komponenten-Template und instanziieren Sie Booking in `ngOnInit()`. Rufen Sie `destructor()` in `ngOnDestroy()` auf, um das Widget zu entfernen, wenn Angular die Komponente zerstört.

Das folgende Code-Snippet deklariert eine Booking-Komponente mit einem Container-Element und Lifecycle-Hooks:

~~~ts {1,8,12-13,18-19} title="booking.component.ts"
import { Booking } from '@dhx/trial-booking';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "booking", // wird in app.component.ts als <booking /> verwendet
    styleUrls: ["./booking.component.css"],
    template: `<div #container class="widget"></div>`,
})

export class BookingComponent implements OnInit, OnDestroy {
    // Host-Container für Booking
    @ViewChild('container', { static: true }) booking_container!: ElementRef;

    private _booking!: Booking;

    ngOnInit() {
        // Booking-Instanz erstellen
        this._booking = new Booking(this.booking_container.nativeElement, {});
    }

    ngOnDestroy(): void {
        this._booking.destructor(); // Booking entfernen
    }
}
~~~

#### Styles hinzufügen {#add-the-styles}

Booking benötigt sowohl das Widget-Stylesheet als auch einen Container mit festgelegter Höhe.

Erstellen Sie im Verzeichnis *src/app/booking/* eine Datei *booking.component.css*.

Das folgende Code-Snippet importiert das Booking-Stylesheet und setzt die volle Höhe für die Seite und den Widget-Container:

~~~css title="booking.component.css"
/* Booking-Styles importieren */
@import "@dhx/trial-booking/dist/booking.css";

/* Seitenstile */
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

/* Booking-Container */
.widget {
    height: 100%;
}
~~~

#### Daten laden {#load-data}

Um Kartendaten in Booking zu laden, bereiten Sie einen Datensatz vor, der der Eigenschaft [`data`](api/config/booking-data.md) entspricht. Das vollständige Datenformat und Ladeszenarien finden Sie im Leitfaden [Daten laden](guides/loading-data.md).

Erstellen Sie im Verzeichnis *src/app/booking/* eine Datei *data.ts*.

Das folgende Code-Snippet definiert einen `getData()`-Helfer, der einen Beispieldatensatz zurückgibt:

~~~ts title="data.ts"
export function getData() : any {
    function getDate(addDays : any, hoursValue = 0, minutesValue = 0) {
        const date = new Date();
        const secondsValue = 0; // auf Minuten runden
        const msValue = 0;

        date.setDate(date.getDate() + addDays);
        date.setHours(hoursValue, minutesValue, secondsValue, msValue);

        return date.getTime();
    }

    return [
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
                    from: 14,
                    to: 17,
                    size: 30,
                    gap: 10
                },
                {
                    from: 12,
                    to: 19,
                    size: 50,
                    gap: 20,
                    days: [2],
                    dates: [getDate(0)]
                },
                {
                    from: "18:30",
                    to: 20,
                    size: 20,
                    gap: 20,
                    days: [3, 4, 5]
                },
            ],
            usedSlots: [getDate(0, 12), getDate(0, 18)]
        },
        // ...
    ];
}
~~~

Öffnen Sie *booking.component.ts*, importieren Sie den Datensatz und übergeben Sie ihn in `ngOnInit()` an die Booking-Konfiguration.

Das folgende Code-Snippet verdrahtet `getData()` mit dem Booking-Konstruktor:

~~~ts {2,18,20} title="booking.component.ts"
import { Booking } from '@dhx/trial-booking';
import { getData } from "./data"; // Daten importieren
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "booking",
    styleUrls: ["./booking.component.css"],
    template: `<div #container class="widget"></div>`,
})

export class BookingComponent implements OnInit, OnDestroy {
    @ViewChild('container', { static: true }) booking_container!: ElementRef;

    private _booking!: Booking;

    ngOnInit() {
        const data = getData(); // Datensatz laden
        this._booking = new Booking(this.booking_container.nativeElement, {
            data
        });
    }

    ngOnDestroy(): void {
        this._booking.destructor();
    }
}
~~~

Die Booking-Komponente rendert nun mit den geladenen Daten. Um das Widget weiter anzupassen, übergeben Sie zusätzliche Konfigurationseigenschaften — die vollständige Liste finden Sie in der [Eigenschaftenübersicht](api/overview/booking-properties-overview.md).

#### Events verarbeiten {#handle-events}

Eine Benutzeraktion im Widget löst ein Event aus. Abonnieren Sie ein Event mit `booking.api.on(eventName, handler)`, um auf die Aktion zu reagieren. Die vollständige Liste der Events finden Sie in der [Events-Übersicht](api/overview/booking-events-overview.md).

Öffnen Sie *booking.component.ts* und erweitern Sie `ngOnInit()` um ein Event-Abonnement.

Das folgende Code-Snippet protokolliert die Slot-ID, wenn ein Benutzer einen Slot auswählt:

~~~ts {7-10} title="booking.component.ts"
// ...
ngOnInit() {
    this._booking = new Booking(this.booking_container.nativeElement, {
        start: new Date(2024, 5, 10),
    });

    // ID des ausgewählten Slots protokollieren
    this._booking.api.on("select-slot", (obj) => {
        console.log(obj.id);
    });
}

ngOnDestroy(): void {
    this._booking.destructor();
}
~~~

### Schritt 3. Booking in der App registrieren {#step-3-register-booking-in-the-app}

Fügen Sie `BookingComponent` zum Anwendungs-Bootstrap hinzu. Öffnen Sie *src/app/app.component.ts* und ersetzen Sie den Standardcode.

Das folgende Code-Snippet rendert die Booking-Komponente innerhalb von `AppComponent`:

~~~ts {5} title="app.component.ts"
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<booking/>` // Template definiert in booking.component.ts
})
export class AppComponent {
    name = "";
}
~~~

Erstellen Sie *app.module.ts* in *src/app/* und deklarieren Sie beide Komponenten.

Das folgende Code-Snippet registriert `AppComponent` und `BookingComponent` im Root-Modul:

~~~ts {4-5,8} title="app.module.ts"
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BookingComponent } from "./booking/booking.component";

@NgModule({
    declarations: [AppComponent, BookingComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
~~~

Öffnen Sie *src/main.ts* und starten Sie das Root-Modul.

Das folgende Code-Snippet startet die Anwendung mit `AppModule`:

~~~ts title="main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
~~~

Starten Sie die App, um Booking mit geladenen Daten auf der Seite anzuzeigen.

![Booking-Initialisierung](../assets/trial-booking.png)

Passen Sie den Code an Ihre Projektanforderungen an. Die vollständige Referenzimplementierung ist auf [GitHub](https://github.com/DHTMLX/angular-booking-demo) verfügbar.
