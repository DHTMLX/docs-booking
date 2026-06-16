---
sidebar_label: confirm-slot
title: confirm-slot Event
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über das confirm-slot-Event. Lesen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# confirm-slot

### Beschreibung {#description}

@short: Wird ausgelöst, wenn die Buchung eines Slots bestätigt wird

### Verwendung {#usage}

~~~jsx {}
"confirm-slot": ({
    slot:{
        id:string|number,
        time: [ number, number ]
    },
    data:{
        [key]: string
    },
    confirm:{
        promise:Promise,
        done: (value:any) => void,
        error: (error: Error) => void
    }
}) => void;
~~~

### Parameter {#parameters}

Der Callback des `confirm-slot`-Events kann ein Objekt mit folgenden Parametern entgegennehmen:

- `slot` - (erforderlich) ein Objekt mit den folgenden Slot-Parametern:
    - `id` - (erforderlich) die ID der Karte, für die die Buchung eines Slots bestätigt wird
    - `time` - (erforderlich) ein Array mit der Slot-Startzeit in Millisekunden und der Slot-Dauer in Minuten (die Startzeit ist in Millisekunden angegeben und entspricht der lokalen Ortszeit)
- `data` - (erforderlich) ein Objekt mit den Feldern des Buchungsformulars mit folgenden Parametern für jedes Feld:
    - `key` - (erforderlich) die Formularfeld-ID (aus [`formShape`](api/config/booking-formshape.md)). Standardmäßig werden drei Felder hinzugefügt: *name*, *email*, *description*
- `confirm` - (erforderlich) ein Objekt mit folgenden Parametern:
    - `promise` - (erforderlich) ein Promise, das den Bestätigungsstatus repräsentiert. Dabei handelt es sich um ein JavaScript-Promise-Objekt, das den asynchronen Vorgang der Slot-Buchungsbestätigung abbildet. Das Promise wird abhängig vom Ergebnis des Buchungsvorgangs aufgelöst oder abgelehnt. Sie können `.then`- und `.catch`-Handler an dieses Promise anhängen, um Erfolg oder Misserfolg der Buchung zu verarbeiten.
    - `done` - (erforderlich) eine Callback-Funktion, die aufgerufen werden soll, wenn die Buchung erfolgreich bestätigt wurde. Der Aufruf dieser Funktion löst das Promise auf und signalisiert, dass die Buchung erfolgreich war. Sie können diese Funktion aufrufen, nachdem Sie eine positive Antwort vom Server erhalten haben.
    - `error` - (erforderlich) eine Callback-Funktion, die aufgerufen werden soll, wenn die Buchung fehlschlägt. Der Aufruf dieser Funktion lehnt das Promise ab und signalisiert, dass die Buchung nicht erfolgreich war. Sie können diese Funktion aufrufen, nachdem Sie eine negative Antwort vom Server erhalten haben.

### Beispiel {#example}

~~~jsx {7-10}
// Booking erstellen
const widget = new booking.Booking("#root", {
    data,
    // weitere Konfigurationsparameter
});

widget.api.on("confirm-slot", (obj) => {
    console.log("Die Slot-ID, für die die Buchung bestätigt wurde:", obj.slot.id);
});
~~~

**Verwandte Artikel**: [`setConfirmHandler`](api/methods/booking-setconfirmhandler-method.md)-Methode
