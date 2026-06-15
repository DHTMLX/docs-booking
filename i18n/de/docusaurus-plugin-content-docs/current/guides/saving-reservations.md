---
sidebar_label: Arbeiten mit dem Server
title:  Arbeiten mit dem Server
description: Sie erfahren mehr über die Arbeit mit dem Server in der Dokumentation der DHTMLX JavaScript Booking-Bibliothek. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# Arbeiten mit dem Server {#working-with-server}

Das Booking-Widget wird über zwei Hauptoperationen mit einem Backend verknüpft: das Laden von Kartendaten vom Server und das Übermitteln von Slot-Reservierungen an den Server. Dieser Leitfaden erläutert beide Abläufe sowie die UTC-Konvertierung, die erforderlich ist, wenn die Serverdaten eine andere Zeitzone verwenden.

## Daten vom Server laden {#load-data-from-the-server}

Rufen Sie Kartendaten mit der nativen `fetch`-API (oder einem gleichwertigen HTTP-Client) ab und übergeben Sie das geparste JSON über die Methode [`setConfig()`](api/methods/booking-setconfig-method.md) an das Widget.

Das folgende Code-Snippet initialisiert eine leere Booking-Instanz und lädt den Datensatz, sobald die Antwort eintrifft:

~~~jsx {}
const widget = new booking.Booking("#booking", { data: [] });
const server = "https://some-backend-url";

fetch(server + "/data")
    .then((res) => res.json())
    .then((data) => {
        widget.setConfig({ data });
    });
~~~

## Slot-Reservierungen auf dem Server speichern {#save-slot-reservations-to-the-server}

Um Slot-Reservierungen im Backend zu verarbeiten, registrieren Sie einen Bestätigungs-Handler mit der Methode [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md).

Der Handler empfängt ein Event-Objekt mit drei Feldern:

- `slot` — gebuchter Slot: `id` (Karten-ID) und `time` (`[timestamp, duration]`)
- `data` — Formularwerte, die den Feld-IDs von [`formShape`](api/config/booking-formshape.md) zugeordnet sind (Standardwerte: `name`, `email`, `description`)
- `confirm` — Server-Antwort-Callbacks: `done()` bei Erfolg, `error()` bei Fehler

Das folgende Code-Snippet sendet die Reservierung an den Server und löst die Buchung basierend auf der Antwort auf:

~~~jsx {}
// Reservierungslogik verarbeiten
const handleSlotReservation = (event) => {
    const { confirm, slot, data } = event;

    // Nutzdaten zusammenstellen
    const info = {
        item: slot.id,
        start: slot.time[0],
        data
    };

    // Nutzdaten an den Server senden
    fetch("/server/url", {
        method: "POST",
        body: JSON.stringify(info),
    // Buchung basierend auf der Antwort bestätigen oder ablehnen
    }).then((response) => {
        if (response.ok) confirm.done();
        else confirm.error();
    });
};

// Booking erstellen
const widget = new booking.Booking("#root", {
    data: [],
    // Konfigurationsparameter
});

// Datensatz vom Server abrufen
fetch("/server/url")
    .then((res) => res.json())
    .then((items) => {
        // abgerufene Einträge in das Widget laden
        widget.setConfig({ data: items });
        // Reservierungs-Handler registrieren
        widget.setConfirmHandler(handleSlotReservation);
    });
~~~

:::info
Die Methode [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) ist eine Kurzform, die intern das Ereignis [`confirm-slot`](api/events/booking-confirmslot-event.md) über `widget.api.on("confirm-slot", handler)` abonniert. Beide Ansätze registrieren einen Handler mit derselben Callback-Signatur — verwenden Sie `widget.api.on("confirm-slot", handler)` direkt, wenn Sie mehrere Abonnenten hinzufügen möchten.
:::

## UTC-Daten in die lokale Zeitzone konvertieren {#convert-utc-data-to-the-local-timezone}

Das Widget arbeitet in der lokalen Zeitzone. Wenn der Server UTC-Timestamps zurückgibt, konvertieren Sie jeden Timestamp vor der Übergabe an das Widget und konvertieren Sie ihn vor dem Senden von Reservierungen zurück in UTC.

Die folgenden Hilfsfunktionen verarbeiten beide Richtungen:

- `g2l` — einen UTC-Timestamp in die lokale Zeitzone konvertieren (auf eingehende `usedSlots` und `slots.dates` anwenden)
- `l2g` — einen lokalen Timestamp zurück in UTC konvertieren (vor dem Senden an den Server auf `slot.time[0]` anwenden)

Das folgende Code-Snippet kombiniert beide Hilfsfunktionen in einem vollständigen Lade- und Reservierungsablauf:

~~~jsx
const serverURL = "https://some-backend-url";

function g2l(v) {
    const utcDate = new Date(v);
    return new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
        utcDate.getUTCHours(),
        utcDate.getUTCMinutes(),
        utcDate.getUTCSeconds(),
        utcDate.getUTCMilliseconds(),
    ).valueOf();
}

function l2g(v) {
    const date = new Date(v);
    return Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
    );
}

const handleSlotReservation = event => {
    const { confirm, slot, data } = event;

    const info = {
        doctor: slot.id,
        date: l2g(slot.time[0]),
        form: {
            name: data.name,
            email: data.email,
            details: data.description,
        },
    };

    fetch( serverURL + "/doctors/reservations", {
        method: "POST",
        body: JSON.stringify(info),
    }).then(response => {
        if (response.ok) confirm.done();
        else confirm.error();
    });
};

// Widget-Initialisierung
const widget = new booking.Booking("#root", {
    data: [],
});

// Daten laden
fetch( serverURL + "/units")
    .then(res => res.json())
    .then(units => {
        units.forEach(unit => {
            if (unit.usedSlots) unit.usedSlots = unit.usedSlots.map(g2l);
            if (unit.slots) {
                unit.slots = unit.slots.map(slot => {
                    if (slot.dates) {
                        return {
                            ...slot,
                            dates: slot.dates.map(g2l)
                        };
                    }
                    return slot;
                });
            };
        });

        widget.setConfig({ data: units });
        widget.setConfirmHandler(handleSlotReservation);
    });
~~~


## Beispiel {#example}

Das folgende Snippet zeigt einen vollständigen serverseitigen Buchungsablauf:

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Verwandte Artikel**:

- [`confirm-slot`](api/events/booking-confirmslot-event.md) — Ereignis, das ausgelöst wird, wenn ein Benutzer einen Slot bestätigt
- [`setConfig()`](api/methods/booking-setconfig-method.md) — Widget-Konfiguration mit abgerufenen Daten aktualisieren
- [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) — Slot-Reservierungs-Handler registrieren
