---
sidebar_label: Integration mit Svelte
title: Integration mit Svelte
description: Sie können mehr über die Integration mit Svelte in der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren. Durchsuchen Sie Entwicklerhandbücher und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus, und laden Sie eine kostenlose 30-tägige Evaluierungsversion von DHTMLX Booking herunter.
---

# Integration mit Svelte {#integration-with-svelte}

DHTMLX Booking lässt sich über eine Single-File-Komponente in Svelte integrieren, die das Widget in einem gebundenen Container einbindet. Dieses Handbuch führt Sie durch das Erstellen eines Svelte-Projekts, die Installation von Booking und das Rendern des Widgets mit Daten und Events. Die vollständige Referenzimplementierung finden Sie im [Svelte-Beispiel auf GitHub](https://github.com/DHTMLX/svelte-booking-demo).

:::tip
Dieses Handbuch setzt Kenntnisse der grundlegenden Svelte-Konzepte voraus. Eine Einführung finden Sie in der [Svelte-Dokumentation](https://svelte.dev/).
:::

## Projekt erstellen {#create-a-project}

Erstellen Sie zunächst ein Svelte-Projekt, bevor Sie die Booking-Integration hinzufügen.

:::info
Installieren Sie [Vite](https://vite.dev/) (optional) und [Node.js](https://nodejs.org/en/), bevor Sie beginnen.
:::

Der folgende Befehl startet das Vite-Scaffolding-Tool:

~~~bash
npm create vite@latest
~~~

Benennen Sie das Projekt auf Aufforderung *my-svelte-booking-app*.

### Abhängigkeiten installieren {#install-dependencies}

Wechseln Sie in das Projektverzeichnis.

Der folgende Befehl öffnet den neu erstellten App-Ordner:

~~~bash
cd my-svelte-booking-app
~~~

Installieren Sie die Abhängigkeiten und starten Sie den Entwicklungsserver mit Ihrem Paketmanager.

Die folgenden Befehle verwenden [yarn](https://yarnpkg.com/):

~~~bash
yarn
yarn dev
~~~

Die folgenden Befehle verwenden [npm](https://www.npmjs.com/):

~~~bash
npm install
npm run dev
~~~

Die App läuft auf einem Localhost, zum Beispiel *http://localhost:5173*.

## Booking zur App hinzufügen {#add-booking-to-the-app}

Stoppen Sie den Entwicklungsserver, bevor Sie das Booking-Paket installieren, und erstellen Sie dann eine Svelte-Komponente, die das Widget kapselt.

### Schritt 1. Paket installieren {#step-1-install-the-package}

Laden Sie das [Booking-Testpaket](how-to-start.md#installing-trial-booking-via-npm-or-yarn) herunter und folgen Sie den Schritten in der README des Pakets. Die Testversion ist 30 Tage lang gültig.

### Schritt 2. Booking-Komponente erstellen {#step-2-create-the-booking-component}

Erstellen Sie eine Datei *Booking.svelte* im Verzeichnis *src/* und führen Sie die folgenden Schritte aus, um das Widget zu verbinden.

#### Quelldateien importieren {#import-the-source-files}

Importieren Sie die Booking-Klasse und das Stylesheet mit dem Pfad, der Ihrer Distribution entspricht:

- *dhx-booking-package* — PRO-Version, die aus einem lokalen Ordner installiert wurde
- *@dhx/trial-booking* — Testversion

Das folgende Code-Snippet importiert Booking aus dem PRO-Paket:

~~~html title="Booking.svelte"
<script>
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
</script>
~~~

Wenn Ihr PRO-Paket minimierte Assets enthält, importieren Sie die CSS-Datei als *booking.min.css*.

Das folgende Code-Snippet importiert Booking aus dem Testpaket:

~~~html title="Booking.svelte"
<script>
import { Booking } from '@dhx/trial-booking';
import '@dhx/trial-booking/dist/booking.css';
</script>
~~~

:::info
Dieses Tutorial verwendet die Testversion von Booking.
:::

#### Container festlegen und Booking initialisieren {#set-the-container-and-initialize-booking}

Binden Sie den Host-Container mit `bind:this` und instanziieren Sie Booking innerhalb von `onMount()`. Rufen Sie `destructor()` in `onDestroy()` auf, um das Widget zu entfernen, wenn Svelte die Komponente entlädt.

Das folgende Code-Snippet deklariert eine Booking-Komponente mit einem gebundenen Container und Lifecycle-Hooks:

~~~html {3,6,10-11,19} title="Booking.svelte"
<script>
    import { onMount, onDestroy } from "svelte";
    import { Booking } from "@dhx/trial-booking";
    import "@dhx/trial-booking/dist/booking.css";

    let container; // Host-Container für Booking
    let booking;

    onMount(() => {
        // Booking-Instanz erstellen
        booking = new Booking(container, {})
    });

    onDestroy(() => {
        booking.destructor(); // Booking entfernen
    });
</script>

<div bind:this={container} class="widget"></div>
~~~

#### Styles hinzufügen {#add-the-styles}

Booking benötigt sowohl das Widget-Stylesheet (oben importiert) als auch einen Container mit definierten Abmessungen. Setzen Sie die volle Höhe für die Seite und den Widget-Container in der Haupt-CSS-Datei des Projekts.

Das folgende Code-Snippet setzt die volle Höhe für die Seite und den Booking-Container:

~~~css title="main.css"
/* Seitenstile; verwenden Sie den #app-Root-Container */
html,
body,
#app {
    height: 100%;
    padding: 0;
    margin: 0;
}

/* Booking-Container */
.widget {
    height: 100%;
}
~~~

#### Daten laden {#load-data}

Um Kartendaten in Booking zu laden, bereiten Sie einen Datensatz vor, der der Eigenschaft [`data`](api/config/booking-data.md) entspricht. Das vollständige Datenformat und Ladeszenarien finden Sie im Handbuch [Daten laden](guides/loading-data.md).

Erstellen Sie eine Datei *data.js* im Verzeichnis *src/*.

Das folgende Code-Snippet definiert einen `getData()`-Helfer, der einen Beispieldatensatz zurückgibt:

~~~jsx title="data.js"
export function getData() {
    function getDate(addDays, hoursValue = 0, minutesValue = 0) {
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
                }
            ],
            usedSlots: [getDate(0, 12), getDate(0, 18)]
        },
        // ...
    ];
}
~~~

Öffnen Sie *App.svelte*, importieren Sie den Datensatz und übergeben Sie ihn als Prop an die `<Booking/>`-Komponente.

Das folgende Code-Snippet rendert die Booking-Komponente mit einem `data`-Prop:

~~~html {3,5,8} title="App.svelte"
<script>
    import Booking from "./Booking.svelte";
    import { getData } from "./data.js";

    const dataset = getData();
</script>

<Booking data={dataset} />
~~~

Öffnen Sie *Booking.svelte* und leiten Sie den `data`-Prop an die Booking-Konfiguration weiter.

Das folgende Code-Snippet verdrahtet den Prop mit dem Booking-Konstruktor:

~~~html {6,13} title="Booking.svelte"
<script>
import { onMount, onDestroy } from "svelte";
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export let data;

let container;
let booking;

onMount(() => {
    booking = new Booking(container, {
        data
    })
});

onDestroy(() => {
    booking.destructor();
});
</script>

<div bind:this={container} class="widget"></div>
~~~

Die Booking-Komponente rendert nun mit den geladenen Daten. Um das Widget weiter anzupassen, übergeben Sie zusätzliche Konfigurationseigenschaften — die vollständige Liste finden Sie in der [Übersicht der Eigenschaften](api/overview/booking-properties-overview.md).

#### Events verarbeiten {#handle-events}

Eine Benutzeraktion im Widget löst ein Event aus. Abonnieren Sie ein Event mit `booking.api.on(eventName, handler)`, um auf die Aktion zu reagieren. Die vollständige Liste der Events finden Sie in der [Übersicht der Events](api/overview/booking-events-overview.md).

Öffnen Sie *Booking.svelte* und erweitern Sie `onMount()` um ein Event-Abonnement.

Das folgende Code-Snippet protokolliert die Slot-ID, wenn ein Benutzer einen Slot auswählt:

~~~html {8-11} title="Booking.svelte"
<script>
// ...
let booking;

onMount(() => {
    booking = new Booking(container, {})

    // ausgewählte Slot-ID protokollieren
    booking.api.on("select-slot", (obj) => {
        console.log(obj.id);
    });
});

onDestroy(() => {
    booking.destructor();
});
</script>

// ...
~~~

Starten Sie die App, um Booking mit Daten auf der Seite zu sehen.

![Booking-Initialisierung](../assets/trial-booking.png)

Passen Sie den Code an Ihre Projektanforderungen an. Die vollständige Referenzimplementierung ist auf [GitHub](https://github.com/DHTMLX/svelte-booking-demo) verfügbar.
