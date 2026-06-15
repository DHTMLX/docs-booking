---
sidebar_label: Integration mit React
title: Integration mit React
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie alles über die Integration mit React. Lesen Sie Entwickleranleitungen und API-Referenz, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Booking herunter.
---

# Integration mit React {#integration-with-react}

DHTMLX Booking lässt sich über eine Wrapper-Komponente in React integrieren, die das Widget innerhalb eines Containers mit `ref` einbindet. Diese Anleitung führt Sie durch das Erstellen eines React-Projekts, die Installation von Booking und das Rendern des Widgets mit Daten und Events. Die vollständige Referenzimplementierung finden Sie im [React-Beispiel auf GitHub](https://github.com/DHTMLX/react-booking-demo).

:::tip
Diese Anleitung setzt Kenntnisse der grundlegenden React-Konzepte voraus. Eine Einführung finden Sie in der [React-Dokumentation](https://react.dev/learn).
:::

## Projekt erstellen {#create-a-project}

Erstellen Sie zunächst eine React-App, bevor Sie die Booking-Integration hinzufügen. Verwenden Sie dazu entweder Create React App oder React mit Vite.

:::info
Installieren Sie [Vite](https://vite.dev/) (optional) und [Node.js](https://nodejs.org/en/) bevor Sie beginnen.
:::

Der folgende Befehl erstellt ein neues Projekt *my-react-booking-app* mit Create React App:

~~~bash
npx create-react-app my-react-booking-app
~~~

### Abhängigkeiten installieren {#install-dependencies}

Wechseln Sie in das Projektverzeichnis.

Der folgende Befehl öffnet den neu erstellten App-Ordner:

~~~bash
cd my-react-booking-app
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

Die App läuft auf einem Localhost, zum Beispiel *http://localhost:3000*.

## Booking zur App hinzufügen {#add-booking-to-the-app}

Stoppen Sie den Entwicklungsserver, bevor Sie das Booking-Paket installieren, und erstellen Sie dann eine React-Komponente, die das Widget umschließt.

### Schritt 1. Paket installieren {#step-1-install-the-package}

Laden Sie das [Test-Booking-Paket](how-to-start.md#installing-trial-booking-via-npm-or-yarn) herunter und folgen Sie den Schritten in der README des Pakets. Die Testversion bleibt 30 Tage lang aktiv.

### Schritt 2. Booking-Komponente erstellen {#step-2-create-the-booking-component}

Erstellen Sie eine *Booking.jsx*-Datei im Verzeichnis *src/* und führen Sie die folgenden Schritte aus, um das Widget zu verdrahten.

#### Quelldateien importieren {#import-the-source-files}

Importieren Sie die Booking-Klasse und das Stylesheet mit dem Pfad, der Ihrer Distribution entspricht:

- *dhx-booking-package* — PRO-Version, die aus einem lokalen Ordner installiert wurde
- *@dhx/trial-booking* — Testversion

Der folgende Code-Ausschnitt importiert Booking aus dem PRO-Paket:

~~~jsx title="Booking.jsx"
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
~~~

Wenn Ihr PRO-Paket minifizierte Assets enthält, importieren Sie die CSS-Datei als *booking.min.css*.

Der folgende Code-Ausschnitt importiert Booking aus dem Test-Paket:

~~~jsx title="Booking.jsx"
import { Booking } from '@dhx/trial-booking';
import "@dhx/trial-booking/dist/booking.css";
~~~

:::info
Dieses Tutorial verwendet die Testversion von Booking.
:::

#### Container festlegen und Booking initialisieren {#set-the-container-and-initialize-booking}

Deklarieren Sie eine `ref` für den Host-Container und instanziieren Sie Booking innerhalb von `useEffect()`. Geben Sie eine Bereinigungsfunktion zurück, die `destructor()` aufruft, um das Widget zu entladen, wenn React die Komponente aushängt.

Der folgende Code-Ausschnitt deklariert eine Booking-Komponente mit einem Container mit `ref` und Lifecycle-Bereinigung:

~~~jsx {2,6,9-10,17} title="Booking.jsx"
import { useEffect, useRef } from "react";
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css"; // Booking-Styles importieren

export default function BookingComponent(props) {
    let container = useRef(); // Host-Container für Booking

    useEffect(() => {
        // Booking-Instanz erstellen
        const booking = new Booking(container.current, {});

        return () => {
            booking.destructor(); // Booking entladen
        };
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

#### Styles hinzufügen {#add-the-styles}

Booking benötigt sowohl das Widget-Stylesheet (oben importiert) als auch einen Container mit festgelegter Größe. Setzen Sie in der Haupt-CSS-Datei des Projekts die volle Höhe für die Seite und den Widget-Container.

Der folgende Code-Ausschnitt setzt die volle Höhe für die Seite und den Booking-Container:

~~~css title="index.css"
/* Seitengestaltung */
html,
body,
#root {
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

Um Kartendaten in Booking zu laden, bereiten Sie einen Datensatz vor, der der [`data`](api/config/booking-data.md)-Eigenschaft entspricht. Das vollständige Datenformat und Ladeszenarien finden Sie in der Anleitung [Daten laden](guides/loading-data.md).

Erstellen Sie eine *data.js*-Datei im Verzeichnis *src/*.

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

Öffnen Sie *App.js*, importieren Sie den Datensatz und übergeben Sie ihn als Prop an die `<Booking/>`-Komponente.

Der folgende Code-Ausschnitt rendert die Booking-Komponente mit einem `data`-Prop:

~~~jsx {2,5-6} title="App.js"
import Booking from "./Booking";
import { getData } from "./data";

function App() {
    const dataset = getData();
    return <Booking data={dataset} />;
}

export default App;
~~~

Öffnen Sie *Booking.jsx* und leiten Sie das `data`-Prop an die Booking-Konfiguration weiter.

Der folgende Code-Ausschnitt verdrahtet das Prop mit dem Booking-Konstruktor:

~~~jsx {5,10} title="Booking.jsx"
import { useEffect, useRef } from "react";
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default function BookingComponent(props) {
    let container = useRef();

    useEffect(() => {
        const booking = new Booking(container.current, {
            data: props.data
            // weitere Konfigurationseigenschaften
        });

        return () => {
            booking.destructor();
        }
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

Die Booking-Komponente rendert nun mit den geladenen Daten. Um das Widget weiter anzupassen, übergeben Sie zusätzliche Konfigurationseigenschaften — die vollständige Liste finden Sie in der [Eigenschaften-Übersicht](api/overview/booking-properties-overview.md).

#### Events behandeln {#handle-events}

Eine Benutzeraktion im Widget löst ein Event aus. Abonnieren Sie ein Event mit `booking.api.on(eventName, handler)`, um auf die Aktion zu reagieren. Die vollständige Liste der Events finden Sie in der [Events-Übersicht](api/overview/booking-events-overview.md).

Öffnen Sie *Booking.jsx* und erweitern Sie `useEffect()` um ein Event-Abonnement.

Der folgende Code-Ausschnitt protokolliert die Slot-ID, wenn ein Benutzer einen Slot auswählt:

~~~jsx {5-8} title="Booking.jsx"
// ...
useEffect(() => {
    const booking = new Booking(container.current, {});

    // ausgewählte Slot-ID protokollieren
    booking.api.on("select-slot", (obj) => {
        console.log(obj.id);
    });

    return () => {
        booking.destructor();
    }
}, []);
// ...
~~~

Starten Sie die App, um Booking mit den Daten auf der Seite zu sehen.

![Booking-Initialisierung](../assets/trial-booking.png)

Passen Sie den Code an Ihre Projektanforderungen an. Die vollständige Referenzimplementierung ist auf [GitHub](https://github.com/DHTMLX/react-booking-demo) verfügbar.
