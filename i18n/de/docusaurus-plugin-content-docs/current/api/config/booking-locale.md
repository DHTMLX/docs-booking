---
sidebar_label: locale
title: locale
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über das locale-Objekt. Erkunden Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# locale

### Beschreibung {#description}

@short: Optional. Ein Objekt mit einer benutzerdefinierten Locale für Booking

### Verwendung {#usage}

~~~jsx
locale?: object;
~~~

### Standardkonfiguration {#default-config}

Standardmäßig verwendet Booking die [englische](guides/localization.md#default-locale) Locale. Sie können auch eine benutzerdefinierte Locale festlegen.

:::tip
Um die aktuelle Locale dynamisch zu ändern, können Sie die Methode [`setLocale()`](api/methods/booking-setlocale-method.md) verwenden.
:::

### Beispiel {#example}

~~~jsx
const { data } = getData();
const widget = new booking.Booking("#root", {
    data,
    locale: booking.locales.de
});
~~~

**Verwandte Artikel**:
- [setLocale()](api/methods/booking-setlocale-method.md)
- [Lokalisierung](guides/localization.md)
