---
sidebar_label: api.detach()
title: Methode detach()
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die detach-Methode. Durchsuchen Sie Entwicklerleitfäden und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# api.detach()

### Beschreibung {#description}

@short: Ermöglicht das Entfernen/Abkoppeln von Event-Handlern

### Verwendung {#usage}

~~~jsx {}
api.detach(tag: number | string ): void;
~~~

### Parameter {#parameters}

- `tag` - (erforderlich) der Name des Aktions-Tags

### Beispiel {#example}

Im folgenden Beispiel fügen wir dem [`api.on()`](api/internal/booking-on.md)-Handler ein Objekt mit der `tag`-Eigenschaft hinzu und verwenden dann die Methode `api.detach()`, um das Protokollieren des [`select-slot`](api/events/booking-selectslot-event.md)-Events zu beenden.

~~~jsx {6-20}
const widget = new booking.Booking("#root", {
    data,
    //andere Konfigurationsparameter
});

// Handler hinzufügen
if (widget.api) {
    widget.api.on(
        "select-slot",
        ({ id }) => {
            console.log("Selected: " + id);
        },
        { tag: "track" }
    );
}

// Handler abkoppeln
function stop() {
    widget.api.detach("track");
}

const button = document.createElement("button");

button.addEventListener("click", stop);
button.textContent = "Stop logging";

document.body.appendChild(button);
~~~
