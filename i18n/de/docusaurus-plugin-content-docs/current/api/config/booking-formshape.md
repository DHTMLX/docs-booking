---
sidebar_label: formShape
title: formShape
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die formShape-Konfiguration. Durchsuchen Sie Entwicklerhandbücher und API-Referenz, probieren Sie Codebeispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# formShape

### Beschreibung {#description}

@short: Optional. Ein Array von Objekten mit Einstellungen zur Konfiguration der Felder im Booking-Dialog

### Verwendung {#usage}

~~~jsx {}
formShape: [{
    comp: "text" | "textarea",
    key: string,
    label?: string,
    required?: boolean,
    validation?: (value: any) => boolean,
    errorMessage?: string
}];
~~~

### Parameter {#parameters}

Für jedes Feld können Sie die folgenden Parameter angeben:

- `comp` - (erforderlich) der Feldtyp (`text` oder `textarea`)
- `key` - (erforderlich) die ID eines Feldes
- `label` - (optional) die Feldbeschriftung
- `required` - (optional) wenn der Wert auf `true` gesetzt ist, darf das Feld nicht leer sein und muss ausgefüllt werden, um das Buchungsformular abzusenden; bei `false` kann das Feld leer bleiben
- `validation` - (optional) eine Funktion, die den Feldwert entgegennimmt und einen booleschen Wert zurückgibt; das Feld gilt als gültig, wenn die Funktion `true` zurückgibt
- `errorMessage` - (optional) die Meldung, die angezeigt wird, wenn der Wert die Validierung nicht besteht

### Standardkonfiguration {#default-config}

~~~jsx {}
const defaultFormShape = [
    {
        comp: "text",
        key: "name",
        label: "Name",
        required: true,
        validation: val => {
            return !!val.replace(/\s/g, "");
        },
        errorMessage: " should not be empty"
    },
    {
        comp: "text",
        key: "email",
        label: "Email",
        required: true,
        validation: val => {
            const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return val && regEx.test(val);
        },
        errorMessage: " should contain valid email address"
    },
    {
        comp: "textarea",
        key: "description",
        label: "Description"
    }
];
~~~

### Beispiel {#example}

~~~jsx {1-17,21}
const formShape = [
    {
        comp: "text",
        key: "name",
        label: "Name"
    },
    {
        comp: "text",
        key: "contact",
        label: "Mobile"
    },
    {
        comp: "textarea",
        key: "description",
        label: "Details"
    },
];

new booking.Booking("#root", {
    data,
    formShape,
    // andere Parameter
});
~~~

Das folgende Snippet zeigt, wie Sie die Felder im Booking-Dialog konfigurieren:

<iframe src="https://snippet.dhtmlx.com/yeqkuzx7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
