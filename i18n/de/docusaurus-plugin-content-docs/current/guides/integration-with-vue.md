---
sidebar_label: Integration mit Vue
title: Integration mit Vue
description: Erfahren Sie in der Dokumentation der DHTMLX JavaScript Booking-Bibliothek, wie die Integration mit Vue funktioniert. Durchsuchen Sie Entwicklerhandbücher und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# Integration mit Vue {#integration-with-vue}

DHTMLX Booking lässt sich über eine Single-File-Komponente in Vue 3 integrieren, die das Widget in einem `ref`'d-Container einbettet. Dieses Handbuch führt Sie durch das Erstellen eines Vue-Projekts, die Installation von Booking und das Rendern des Widgets mit Daten und Events. Die vollständige Referenzimplementierung finden Sie im [Vue-Beispiel auf GitHub](https://github.com/DHTMLX/vue-booking-demo).

:::tip
Dieses Handbuch setzt Kenntnisse der Vue 3-Grundkonzepte voraus. Eine Einführung finden Sie in der [Vue 3-Dokumentation](https://vuejs.org/guide/introduction.html#getting-started).
:::

## Projekt erstellen {#create-a-project}

Erstellen Sie zunächst ein Vue-Projekt, bevor Sie die Booking-Integration hinzufügen.

:::info
Installieren Sie [Node.js](https://nodejs.org/en/), bevor Sie beginnen.
:::

Der folgende Befehl führt das offizielle Vue-Scaffolding-Tool aus:

~~~bash
npm create vue@latest
~~~

Der Befehl installiert und führt `create-vue` aus. Informationen zu den Eingabeaufforderungen und Optionen finden Sie im [Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application). Nennen Sie das Projekt *my-vue-booking-app*, wenn Sie dazu aufgefordert werden.

### Abhängigkeiten installieren {#install-dependencies}

Wechseln Sie in das Projektverzeichnis.

Der folgende Befehl öffnet den neu erstellten App-Ordner:

~~~bash
cd my-vue-booking-app
~~~

Installieren Sie die Abhängigkeiten und starten Sie den Dev-Server mit Ihrem Paketmanager.

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

Stoppen Sie den Dev-Server, bevor Sie das Booking-Paket installieren, und erstellen Sie dann eine Vue-Komponente, die das Widget kapselt.

### Schritt 1. Paket installieren {#step-1-install-the-package}

Laden Sie das [Booking-Testpaket](how-to-start.md#installing-trial-booking-via-npm-or-yarn) herunter und folgen Sie den Schritten in der README des Pakets. Die Testversion ist 30 Tage lang aktiv.

### Schritt 2. Booking-Komponente erstellen {#step-2-create-the-booking-component}

Erstellen Sie eine Datei *Booking.vue* im Verzeichnis *src/components/* und führen Sie die folgenden Schritte aus, um das Widget zu verbinden.

#### Quelldateien importieren {#import-the-source-files}

Importieren Sie die Booking-Klasse und das Stylesheet mit dem Pfad, der Ihrer Distribution entspricht:

- *dhx-booking-package* — PRO-Version, aus einem lokalen Ordner installiert
- *@dhx/trial-booking* — Testversion

Der folgende Code-Ausschnitt importiert Booking aus dem PRO-Paket:

~~~html title="Booking.vue"
<script>
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
</script>
~~~

Wenn Ihr PRO-Paket minimierte Assets enthält, importieren Sie die CSS-Datei als *booking.min.css*.

Der folgende Code-Ausschnitt importiert Booking aus dem Testpaket:

~~~html title="Booking.vue"
<script>
import { Booking } from '@dhx/trial-booking';
import '@dhx/trial-booking/dist/booking.css';
</script>
~~~

:::info
Dieses Tutorial verwendet die Testversion von Booking.
:::

#### Container festlegen und Booking initialisieren {#set-the-container-and-initialize-booking}

Deklarieren Sie den Host-Container im Template und instanziieren Sie Booking im `mounted()`-Hook. Rufen Sie `destructor()` in `unmounted()` auf, um das Widget zu entfernen, wenn Vue die Komponente ausblendet.

Der folgende Code-Ausschnitt deklariert eine Booking-Komponente mit einem ref'd-Container und Lifecycle-Hooks:

~~~html {2,7-8,18} title="Booking.vue"
<script>
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default {
    mounted() {
        // Booking-Instanz erstellen
        this.booking = new Booking(this.$refs.container, {});
    },

    unmounted() {
        this.booking.destructor(); // Booking entfernen
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

#### Styles hinzufügen {#add-the-styles}

Booking benötigt sowohl das Widget-Stylesheet (oben importiert) als auch einen Container mit definierter Größe. Legen Sie in der Haupt-CSS-Datei des Projekts die volle Höhe für die Seite und den Widget-Container fest.

Der folgende Code-Ausschnitt setzt die volle Höhe für die Seite und den Booking-Container:

~~~css title="main.css"
/* Seitenstile — Root-Container #app verwenden */
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

Um Kartendaten in Booking zu laden, bereiten Sie einen Datensatz vor, der der Eigenschaft [`data`](api/config/booking-data.md) entspricht. Informationen zum vollständigen Datenformat und zu Ladeszenarien finden Sie im Handbuch [Daten laden](guides/loading-data.md).

Erstellen Sie eine Datei *data.js* im Verzeichnis *src/*.

Der folgende Code-Ausschnitt definiert einen `getData()`-Helfer, der einen Beispieldatensatz zurückgibt:

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

Öffnen Sie *App.vue*, importieren Sie den Datensatz, stellen Sie ihn über die Option `data()` bereit und übergeben Sie den Datensatz als Prop an die Komponente `<Booking/>`.

Der folgende Code-Ausschnitt rendert die Booking-Komponente mit einem `data`-Prop:

~~~html {3,7-10,15} title="App.vue"
<script>
import Booking from "./components/Booking.vue";
import { getData } from "./data";

export default {
    components: { Booking },
    data() {
        const dataset = getData();
        return { dataset };
    }
};
</script>

<template>
    <Booking :data="dataset" />
</template>
~~~

Öffnen Sie *Booking.vue* und leiten Sie das `data`-Prop an die Booking-Konfiguration weiter.

Der folgende Code-Ausschnitt verbindet das Prop mit dem Booking-Konstruktor:

~~~html {6,10} title="Booking.vue"
<script>
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default {
    props: ["data"],

    mounted() {
        this.booking = new Booking(this.$refs.container, {
            data: this.data,
            // weitere Konfigurationseigenschaften
        });
    },

    unmounted() {
        this.booking.destructor();
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

Die Booking-Komponente rendert nun mit den geladenen Daten. Um das Widget weiter anzupassen, übergeben Sie zusätzliche Konfigurationseigenschaften — die vollständige Liste finden Sie in der [Übersicht der Eigenschaften](api/overview/booking-properties-overview.md).

#### Events verarbeiten {#handle-events}

Eine Benutzeraktion im Widget löst ein Event aus. Abonnieren Sie ein Event mit `booking.api.on(eventName, handler)`, um auf die Aktion zu reagieren. Die vollständige Liste der Events finden Sie in der [Events-Übersicht](api/overview/booking-events-overview.md).

Öffnen Sie *Booking.vue* und erweitern Sie `mounted()` um ein Event-Abonnement.

Der folgende Code-Ausschnitt protokolliert die Slot-ID, wenn ein Benutzer einen Slot auswählt:

~~~html {8-11} title="Booking.vue"
<script>
// ...
export default {
    // ...
    mounted() {
        this.booking = new Booking(this.$refs.container, {});

        // ID des ausgewählten Slots protokollieren
        this.booking.api.on("select-slot", (obj) => {
            console.log(obj.id);
        });
    }
    // ...
}
</script>

<!--...-->
~~~

Starten Sie die App, um Booking mit Daten auf der Seite zu sehen.

![Booking-Initialisierung](../assets/trial-booking.png)

Passen Sie den Code an Ihre Projektanforderungen an. Die vollständige Referenzimplementierung ist auf [GitHub](https://github.com/DHTMLX/vue-booking-demo) verfügbar.
