---
sidebar_label: setLocale()
title: setLocale()-Methode
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die setLocale()-Methode. Durchsuchen Sie Entwicklerleitfäden und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Booking herunter.
---

# setLocale()

### Beschreibung {#description}

@short: Wendet eine neue Locale auf Booking an

### Verwendung {#usage}

~~~jsx
setLocale(locale?: object | null): void;
~~~

### Parameter {#parameters}

- `null` - (optional) setzt auf die Standard-Locale (Englisch) zurück
- `locale` - (optional) das Objekt mit den Daten der neuen anzuwendenden Locale

### Beispiel {#example}

~~~jsx {}
// Booking erstellen
const widget = new booking.Booking("#root", {
    data,
    // initiale Konfigurationsparameter
});

// die "de"-Locale auf Booking anwenden
widget.setLocale(booking.locales.de);

// die Standard-Locale auf Booking anwenden
widget.setLocale(); // oder setLocale(null);
~~~

**Verwandte Artikel**:
- [locale](api/config/booking-locale.md)
- [Lokalisierung](guides/localization.md)
