---
sidebar_label: cardShape
title: cardShape
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die cardShape-Konfiguration. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Booking herunter.
---

# cardShape

### Beschreibung {#description}

@short: Optional. Ein Objekt mit Einstellungen zur Verwaltung der auf der linken Seite jeder Karte angezeigten Informationen

### Verwendung {#usage}

~~~jsx {}
cardShape?: {
    category?: boolean,
    details?: boolean,
    preview?: boolean,
    price?: boolean,
    review?: boolean,
    subtitle?: boolean,
    title?: boolean
};
~~~

### Parameter {#parameters}

Im `cardShape`-Objekt können Sie die folgenden Parameter (Felder) angeben:

- `category` - (optional) blendet einen Kategorienamen ein/aus
- `details` - (optional) blendet Details ein/aus
- `preview` - (optional) blendet ein Vorschaubild ein/aus
- `price` - (optional) blendet den Preis ein/aus
- `review` - (optional) blendet Bewertungsinformationen ein/aus
- `subtitle` - (optional) blendet den Untertitel einer Karte ein/aus
- `title` - (optional) blendet den Titel einer Karte ein/aus

### Standardkonfiguration {#default-config}

~~~jsx {}
const defaultCardShape = {
    category: true,
    details: true,
    preview: true,
    price: true,
    review: true,
    subtitle: true,
    title: true
};
~~~

### Beispiel {#example}

~~~jsx {}
const cardShape = {
    review: false,
    subtitle: false,
    price: false
};

new booking.Booking("#root", {
    cardShape,
    // andere Parameter
});
~~~

Das folgende Snippet zeigt, wie Sie konfigurieren, welche Felder auf der linken Seite der Karten angezeigt werden:

<iframe src="https://snippet.dhtmlx.com/6mxd7918?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
Sie können das Erscheinungsbild einer Karte auch mithilfe der Eigenschaft [`cardTemplate`](api/config/booking-cardtemplate.md) konfigurieren. Wenn sowohl `cardTemplate` als auch `cardShape` angewendet werden, überschreibt `cardTemplate` die `cardShape`-Einstellungen.
:::

**Verwandte Artikel**:

- [Struktur der Karten definieren](guides/configuration.md#define-the-structure-of-cards)
- [`cardTemplate`](api/config/booking-cardtemplate.md)
