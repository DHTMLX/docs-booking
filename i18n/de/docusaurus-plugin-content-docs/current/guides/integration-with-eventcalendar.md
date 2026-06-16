---
sidebar_label: Integration mit Event Calendar
title: Integration mit DHTMLX Event Calendar
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die Integration mit DHTMLX Event Calendar. Lesen Sie Entwickleranleitungen und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# Integration mit DHTMLX Event Calendar {#integration-with-dhtmlx-event-calendar}

Diese Anleitung zeigt, wie Sie das DHTMLX Booking-Widget mit [DHTMLX Event Calendar](https://docs.dhtmlx.com/eventcalendar/) integrieren. Die Integration konvertiert Event Calendar-Ereignisse serverseitig in Booking-Slots.

## Grundlegende Konzepte verstehen {#understand-the-main-concepts}

Der Kern der Integration ist die Konvertierung von Event Calendar-Ereignissen in Booking-Slots. Beachten Sie die folgenden Punkte, bevor Sie beginnen.

**Event Calendar-Ereignisse vs. Booking-Slots.** Event Calendar verwaltet Ereignisse – sowohl einzelne als auch wiederkehrende. Booking generiert aus diesen Ereignissen verfügbare Zeitslots. Das [folgende Snippet](#example) generiert Booking-Slots aus dem Zeitplan eines Arztes, indem es JSON-Daten serverseitig konvertiert.

**Einschränkung bei wiederkehrenden Ereignissen.** Booking unterstützt nur wöchentlich wiederkehrende Ereignisse, die im Event Calendar als `FREQ=WEEKLY;INTERVAL=1` definiert sind. Da Event Calendar beliebige Wiederholungsmuster unterstützt, sollten Sie die anderen Wiederholungsoptionen im Event Calendar-Formular ausblenden.

**Zeitzonenbehandlung.** Booking interpretiert Zeitstempel in der lokalen Zeitzone. Wenn Sie globale Zeitstempel verwenden, konvertieren Sie diese vor der Übergabe an Booking in die lokale Zeitzone und vor dem Speichern zurück in UTC. Anweisungen zur Konvertierung finden Sie unter [UTC-Daten in die lokale Zeitzone konvertieren](guides/saving-reservations.md#convert-utc-data-to-the-local-timezone).

**Strategien für Booking-Slots.** Wählen Sie einen der folgenden zwei Ansätze zum Aufbau des Zeitplans:

- [`slots`](api/config/booking-data.md) und [`usedSlots`](api/config/booking-data.md) — Zeitplan erstellen und gebuchte Slots ausschließen (die hier beschriebene Strategie)
- [`availableSlots`](api/config/booking-data.md) — buchbare Slots explizit auflisten; geeignet für Ereignisse ohne Wiederholungen

## Beispiel {#example}

Das folgende Snippet integriert Booking mit Event Calendar, indem es die Zeitpläne von Ärzten in Booking-Slots konvertiert. Die Integration verwendet vier Daten-Endpunkte:

- `/events` — Event Calendar-Daten (Arzt-Zeitpläne) mit wiederkehrenden und einzelnen Ereignissen; die Quelle für Booking-Zeitslots
- `/units` — endgültige Booking-Slots, die aus den `/events`-Daten serverseitig generiert werden; siehe das [Backend-Beispiel](https://github.com/DHTMLX/event-calendar-booking-go)
- `/calendars` — Kalender der Ärzte; stellt sowohl dem Event Calendar- als auch dem Booking-Widget Arztinformationen bereit
- `/reservations` — Hilfsdatensammlung, die `usedSlots` in der Zeitleistenansicht visualisiert; enthält bereits reservierte Slots aus dem Booking-Formular

Die Konvertierung von Ereignissen in Slots ist der Kern der Integration. Der [nächste Abschnitt](#convert-events-to-booking-slots) beschreibt die Konvertierungsregeln.

<iframe src="https://snippet.dhtmlx.com/c5eu8pdk?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="800"></iframe>

## Ereignisse in Booking-Slots konvertieren {#convert-events-to-booking-slots}

Die folgenden Regeln generieren Booking-Slots aus dem Zeitplan eines Arztes anhand von JSON-Daten, die serverseitig konvertiert werden. Alle Beispiele gehen vom Zeitplan für den nächsten Zeitraum aus, vom 2025-03-13 bis 2027-03-13.

### Regel 1. Slot aus einem einzelnen Ereignis erstellen {#rule-1-create-a-slot-from-a-single-event}

Konvertieren Sie für jedes einzelne Ereignis die Start- und Endzeit in einen Booking-Slot. Fügen Sie einen Eintrag zum `slots`-Array hinzu und geben Sie das Ereignisdatum im `dates`-Array an.

Das folgende Code-Snippet zeigt ein einzelnes Event Calendar-Ereignis:

~~~json
{
  "type": 1, // type ist die Kalender-ID
  "start_date": "2025-03-18T02:00:00Z", // Datumsangaben in UTC angenommen
  "end_date": "2025-03-18T06:00:00Z"
}
~~~

Das folgende Code-Snippet zeigt den resultierenden Booking-Slot:

~~~json
{
   "id": 1,
   "slotSize": 20,
   "slotGap": 5,
   "slots": [
     {
       "from": "02:00",
       "to": "06:00",
       "dates": [
         1742256000000 // 2025-03-18 00:00:00 (Zeitstempel)
       ]
     }
   ]
}
~~~

### Regel 2. Wiederkehrendes Ereignis konvertieren {#rule-2-convert-a-recurring-event}

Ordnen Sie ein wiederkehrendes Ereignis einem wöchentlichen Muster zu. Start- und Enddatum des wiederkehrenden Ereignisses im Event Calendar müssen den Booking-Daten [`start`](api/config/booking-start.md) und [`end`](api/config/booking-end.md) entsprechen. Andernfalls erstellen Sie Platzhalter für die Daten vor und nach dem wiederkehrenden Ereignis (siehe [Regel 7](#rule-7-handle-events-that-start-after-the-booking-start-date)).

Das folgende Code-Snippet zeigt ein wiederkehrendes Event Calendar-Ereignis, das wöchentlich an Werktagen (Montag bis Freitag) wiederholt wird:

~~~json
{
  "type": 1,
  "start_date": "2025-03-13T09:00:00Z",
  "end_date": "2025-03-13T17:00:00Z",
  "recurring": true,
  "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;UNTIL=2027-03-13T23:59:59",
  "STDATE": "2025-03-13T09:00:00Z",
  "DTEND": "2027-03-13T00:00:00Z"
}
~~~

Booking stellt den wöchentlichen Zeitplan als einzelne Regel dar, mit denselben Start- und Endzeiten für jeden Werktag.

Das folgende Code-Snippet zeigt die resultierenden Booking-Slots:

~~~json
{
   "id": 1,
   "slotSize": 20,
   "slotGap": 5,
   "slots": [
     {
       "from": "09:00",
       "to": "17:00",
       "days": [1, 2, 3, 4, 5] // Montag bis Freitag
     }
   ]
}
~~~

### Regel 3. Mehrtägiges Ereignis aufteilen {#rule-3-split-an-event-that-spans-multiple-days}

Booking generiert Slots innerhalb eines einzigen Tages. Wenn ein Ereignis zwei Tage überspannt (zum Beispiel Beginn um 20:00 Uhr und Ende um 4:00 Uhr), teilen Sie es in zwei Slots auf, einen pro Tag.

Zum Beispiel wird die Schicht eines Arztes, die am Samstagabend beginnt und bis in den Sonntagmorgen dauert, in zwei Regeln aufgeteilt: eine für Samstag und eine für Sonntag.

Das folgende Code-Snippet zeigt das mehrtägige Event Calendar-Ereignis:

~~~json
{
  "type": 2,
  "start_date": "2025-03-13T20:00:00Z",
  "end_date": "2025-03-14T04:00:00Z",
  "recurring": true,
  "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SA;UNTIL=2027-03-13T23:59:59",
  "STDATE": "2025-03-13T20:00:00Z",
  "DTEND": "2027-03-13T00:00:00Z"
}
~~~

Das folgende Code-Snippet zeigt die zwei resultierenden Booking-Slots, einen pro Tag:

~~~json
{
   "id": 2,
   "slotSize": 45,
   "slotGap": 5,
   "slots": [
     {
       "from": "20:00",
       "to": "24:10",
       "days": [6] // Samstag
     },
     {
       "from": "00:10",
       "to": "04:00",
       "days": [0] // Sonntag
     }
   ]
}
~~~

### Regel 4. Einzelnes Ereignis zu einem wiederkehrenden Zeitplan hinzufügen {#rule-4-add-a-single-event-to-a-recurring-schedule}

Wenn ein einzelnes Ereignis einen wiederkehrenden Zeitplan erweitert, generieren Sie Slots für beide. Fügen Sie die Daten des einzelnen Ereignisses dem `dates`-Array der wiederkehrenden Regel hinzu.

Dieses Beispiel kombiniert zwei Event Calendar-Ereignisse:

- wiederkehrendes Ereignis — Verfügbarkeit eines Arztes von 9:00 bis 17:00 Uhr an Werktagen
- einzelnes Ereignis — zusätzliche Verfügbarkeit von 2:00 bis 6:00 Uhr am 18. und 19. März

Das folgende Code-Snippet zeigt beide Event Calendar-Ereignisse:

~~~json
[
  // wiederkehrendes Ereignis
  {
    "type": 1,
    "start_date": "2025-03-13T09:00:00Z",
    "end_date": "2025-03-13T17:00:00Z",
    "recurring": true,
    "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;UNTIL=2027-03-13T23:59:59",
    "STDATE": "2025-03-13T09:00:00Z",
    "DTEND": "2027-03-13T00:00:00Z"
  },
  // einzelne Ereignisse
  {
    "type": 1,
    "start_date": "2025-03-18T02:00:00Z",
    "end_date": "2025-03-18T06:00:00Z"
  },
  {
    "type": 1,
    "start_date": "2025-03-19T02:00:00Z",
    "end_date": "2025-03-19T06:00:00Z"
  }
]
~~~

Booking führt das wiederkehrende Ereignis und die einzelnen Ereignisse zu einer Regel zusammen. Die Daten der einzelnen Ereignisse (18. und 19. März) haben höhere Priorität und werden dem `dates`-Array der wiederkehrenden Regel hinzugefügt. Informationen zur Prioritätsreihenfolge finden Sie unter [Slot-Regeln definieren](guides/configuration.md#define-slot-rules).

Das folgende Code-Snippet zeigt die zusammengeführten Booking-Slots:

~~~json
{
   "id": 1,
   "slotSize": 20,
   "slotGap": 20,
   "slots": [
     {
       "from": "02:00",
       "to": "06:00",
       "dates": [
         1742256000000, // 2025-03-18 00:00:00
         1742342400000  // 2025-03-19 00:00:00
       ]
     },
     {
       "from": "09:00",
       "to": "17:00",
       "days": [1, 2, 3, 4, 5],
       "dates": [
         1742256000000, // 2025-03-18 00:00:00
         1742342400000  // 2025-03-19 00:00:00
       ]
     }
   ]
}
~~~

### Regel 5. Einzelne Instanz eines wiederkehrenden Ereignisses ändern {#rule-5-modify-a-single-instance-of-a-recurring-event}

Wenn sich eine einzelne Instanz eines wiederkehrenden Ereignisses ändert (zum Beispiel eine Zeitverschiebung an einem Datum), erstellen Sie einen neuen Slot mit der aktualisierten Zeit. Fügen Sie das Datum dem `dates`-Array hinzu, das für dieses Datum Vorrang vor dem `days`-Array hat.

Das folgende Code-Snippet zeigt das wiederkehrende Ereignis und seine geänderte Instanz:

~~~json
[
  {
    "type": 1,
    "start_date": "2025-03-13T09:00:00Z",
    "end_date": "2025-03-13T17:00:00Z",
    "recurring": true,
    "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;UNTIL=2027-03-13T23:59:59",
    "STDATE": "2025-03-13T09:00:00Z",
    "DTEND": "2027-03-13T00:00:00Z"
  },
  {
    "type": 1,
    "start_date": "2025-03-14T03:00:00Z",
    "end_date": "2025-03-14T11:00:00Z",
    "recurring": false,
    "recurringEventId": 1,
    "originalStartTime": "2025-03-14T09:00:00Z"
  },
]
~~~

Das folgende Code-Snippet zeigt die wiederkehrende Regel sowie die Überschreibung für das geänderte Datum:

~~~json
{
   "id": 1,
   "slotSize": 20,
   "slotGap": 5,
   "slots": [
     {
       "from": "09:00",
       "to": "17:00",
       "days": [1, 2, 3, 4, 5]
     },
     {
       "from": "03:00",
       "to": "11:00",
       "dates": [
         1741910400000 // 2025-03-14 03:00:00 (geändert)
       ]
     }
   ]
}
~~~

### Regel 6. Einzelne Instanz eines wiederkehrenden Ereignisses löschen {#rule-6-delete-a-single-instance-of-a-recurring-event}

Wenn Sie ein einzelnes Vorkommen eines wiederkehrenden Ereignisses entfernen, spiegeln Sie die Entfernung in den Booking-Regeln wider. Erstellen Sie eine Regel für das gelöschte Datum mit einem leeren Zeitintervall und der `dates`-Eigenschaft, die Vorrang vor `days` hat.

Das folgende Code-Snippet zeigt das wiederkehrende Ereignis und sein storniertes Vorkommen:

~~~json
[
  {
    "type": 5,
    "start_date": "2025-03-14T09:00:00Z",
    "end_date": "2025-03-14T17:00:00Z",
    "recurring": true,
    "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=TH,FR,SA,SU;UNTIL=2027-03-13T23:59:59",
    "STDATE": "2025-03-14T09:00:00Z",
    "DTEND": "2027-03-13T00:00:00Z"
  },
  {
    "type": 5,
    "recurring": false,
    "recurringEventId": 15,
    "originalStartTime": "2025-03-23T09:00:00Z",
    "status": "cancelled"
  }
]
~~~

Das folgende Code-Snippet zeigt die wiederkehrende Regel sowie das leere Intervall, das das stornierte Datum entfernt:

~~~json
{
    "id": 5,
    "slotSize":60,
    "slotGap":10,
    "slots":[
        {
            "from": "09:00",
            "to": "17:00",
            "days": [4, 5, 6, 0] // Donnerstag bis Sonntag
        },
        {
            "from": "00:00",
            "to": "00:00",
            "dates": [
                1742688000000 // 2025-03-23 00:00:00 (gelöschtes Vorkommen)
            ]
        }
    ]
}
~~~

### Regel 7. Ereignisse behandeln, die nach dem Booking-Startdatum beginnen {#rule-7-handle-events-that-start-after-the-booking-start-date}

Wenn ein wiederkehrendes Ereignis nach dem Booking-Startdatum beginnt (standardmäßig heute, in diesen Beispielen 2025-03-13), erstellen Sie Regeln mit leeren Zeitintervallen für die Daten vor dem Start des Ereignisses. Dadurch werden diese Daten aus der Wiederholung entfernt.

Das folgende Code-Snippet zeigt ein wiederkehrendes Ereignis, das vier Tage nach dem Booking-Startdatum beginnt:

~~~json
{
  "type": 5,
  "start_date": "2025-03-17T09:00:00Z",
  "end_date": "2025-03-17T17:00:00Z",
  "recurring": true,
  "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SU,MO,TU,WE,TH,FR,SA;UNTIL=2027-03-13T23:59:59",
  "STDATE": "2025-03-17T09:00:00Z",
  "DTEND": "2027-03-13T00:00:00Z"
}
~~~

Das folgende Code-Snippet zeigt die wiederkehrende Regel sowie leere Intervalle für die vier Daten vor dem Ereignisbeginn:

~~~json
{
    "id": 5,
    "slotSize":60,
    "slotGap":10,
    "slots": [
        { "from": "09:00", "to": "17:00", "days": [0, 1, 2, 3, 4, 5, 6] },
        { "from": "00:00", "to": "00:00", "dates": [
            1741820400000,  // 13. März 2025
            1741906800000,  // 14. März 2025
            1741993200000,  // 15. März 2025
            1742079600000   // 16. März 2025
        ]}
    ]
}
~~~
