---
sidebar_label: infoShape
title: infoShape
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die infoShape-Konfiguration. Lesen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Booking herunter.
---

# infoShape

### Beschreibung {#description}

@short: Optional. Ein Objekt mit Einstellungen zur Steuerung der Informationen, die auf der linken Seite des Booking-Dialogs angezeigt werden

### Verwendung {#usage}

~~~jsx {}
infoShape?: {
    preview?: boolean,
    category?: boolean,
    title?: boolean,
    price?: boolean,
    details?: boolean
};
~~~

### Parameter {#parameters}

Das Objekt hat folgende Parameter:

- `preview` - (optional) zeigt/verbirgt ein Vorschaubild im Informationsblock (linke Seite) des Booking-Dialogs
- `category` - (optional) zeigt/verbirgt einen Kategorienamen auf der linken Seite des Booking-Dialogs (zum Beispiel die Berufsbezeichnung eines Spezialisten)
- `title` - (optional) zeigt/verbirgt einen Titel im Informationsblock des Booking-Dialogs (z. B. den Namen eines Spezialisten)
- `price` - (optional) zeigt/verbirgt den Preis im Informationsblock des Booking-Dialogs
- `details` - (optional) zeigt/verbirgt Details im Informationsblock des Booking-Dialogs

### Standardkonfiguration {#default-config}

~~~jsx {}
const defaultInfoShape = {
    preview: true,
    category: true,
    title: true,
    price: true,
    details: true
};
~~~

### Beispiel {#example}

~~~jsx {}
const infoShape = {
    preview: false,
    price: false
};

new booking.Booking("#root", {
    data,
    infoShape,
    // andere Parameter
});
~~~

Der folgende Ausschnitt zeigt, wie Sie konfigurieren, was auf der linken Seite des Booking-Dialogs angezeigt werden soll:

<iframe src="https://snippet.dhtmlx.com/pd6wp1xc?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
Sie können auch steuern, welche Felder im Informationsblock des Booking-Dialogs angezeigt werden, indem Sie die Eigenschaft [`infoTemplate`](api/config/booking-infotemplate.md) verwenden. Wenn jedoch beide Eigenschaften angewendet werden, überschreibt `infoTemplate` die `infoShape`-Einstellungen.
:::

**Verwandte Artikel**:

- [Den Booking-Dialog konfigurieren](guides/configuration.md#configure-the-booking-dialog)
- [`infoTemplate`](api/config/booking-infotemplate.md)
