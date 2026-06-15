---
sidebar_label: Integration mit Scheduler
title: Integration mit DHTMLX Scheduler
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die Integration mit DHTMLX Scheduler. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# Integration mit DHTMLX Scheduler

Dieser Leitfaden zeigt, wie Sie das DHTMLX Booking-Widget mit [DHTMLX Scheduler](https://docs.dhtmlx.com/scheduler/) integrieren. Die Integration konvertiert Scheduler-Events auf der Serverseite in Booking-Slots.

## Grundlegende Konzepte verstehen {#understand-the-main-concepts}

Die Integration basiert auf der Konvertierung von Scheduler-Events in Booking-Slots. Beachten Sie die folgenden Punkte, bevor Sie beginnen.

**Scheduler-Events vs. Booking-Slots.** Scheduler verwaltet Events, sowohl einzelne als auch wiederkehrende. Booking generiert aus diesen Events verfügbare Zeitslots. Das [folgende Snippet](#example) generiert Booking-Slots aus dem Stundenplan eines Arztes, indem JSON-Daten auf der Serverseite konvertiert werden.

**Einschränkung bei wiederkehrenden Events.** Booking unterstützt nur wöchentlich wiederkehrende Events, die in Scheduler als `INTERVAL=1;FREQ=WEEKLY` definiert sind. Scheduler verarbeitet beliebige Wiederholungsmuster, deshalb sollten Sie die anderen Wiederholungsoptionen in der Scheduler-Konfiguration einschränken.

**Zeitzonenbehandlung.** Booking interpretiert Zeitstempel in der lokalen Zeitzone. Wenn Sie globale Zeitstempel verwenden, konvertieren Sie diese in die lokale Zeitzone, bevor Sie sie an Booking übergeben, und zurück nach UTC, bevor Sie sie speichern. Konvertierungsanweisungen finden Sie unter [UTC-Daten in die lokale Zeitzone konvertieren](guides/saving-reservations.md#convert-utc-data-to-the-local-timezone).

**Booking-Slot-Strategien.** Wählen Sie einen von zwei Ansätzen, um den Zeitplan aufzubauen:

- [`slots`](api/config/booking-data.md) und [`usedSlots`](api/config/booking-data.md) — erstellen Sie den Zeitplan und schließen Sie gebuchte Slots aus (die hier beschriebene Strategie)
- [`availableSlots`](api/config/booking-data.md) — listen Sie buchbare Slots explizit auf, geeignet für Events ohne Wiederholungen

## Beispiel {#example}

Das folgende Snippet integriert Booking mit Scheduler, indem es die Stundenpläne von Ärzten in Booking-Slots konvertiert. Die Integration verwendet vier Daten-Endpunkte:

- `/doctors/worktime` — Scheduler-Daten (Arztpläne) mit wiederkehrenden und einzelnen Events; die Quelle für Booking-Zeitslots
- `/units` — finale Booking-Slots, die aus den `worktime`-Daten auf der Serverseite generiert werden; siehe das [Backend-Beispiel](https://github.com/DHTMLX/scheduler-booking-go)
- `/doctors/reservations` — Hilfsdatensammlung, die `usedSlots` in der Timeline-Ansicht visualisiert; enthält bereits aus dem Booking-Formular reservierte Slots
- `/doctors` — alle Ärzte mit ihren Namen und IDs; liefert Arztinformationen sowohl an das Scheduler- als auch an das Booking-Widget

Die Konvertierung von Events in Slots ist der Kern der Integration. Der [nächste Abschnitt](#convert-scheduler-events-to-booking-slots) beschreibt die Konvertierungsregeln.

<iframe src="https://snippet.dhtmlx.com/d5zbq3g3?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="800"></iframe>

## Scheduler-Events in Booking-Slots konvertieren {#convert-scheduler-events-to-booking-slots}

Die folgenden Regeln generieren Booking-Slots aus dem Stundenplan eines Arztes anhand von JSON-Daten, die auf der Serverseite konvertiert werden. Jedes Beispiel geht vom Zeitplan für den nächsten Zeitraum aus, vom 13.03.2025 bis zum 13.03.2027.

### Regel 1. Einen Slot aus einem einzelnen Event erstellen {#rule-1-create-a-slot-from-a-single-event}

Konvertieren Sie für jedes einzelne Event die Start- und Endzeiten in einen Booking-Slot. Fügen Sie einen Eintrag zum `slots`-Array hinzu und nehmen Sie das Event-Datum in das `dates`-Array auf.

Das folgende Code-Snippet zeigt ein einzelnes Scheduler-Event:

~~~json
{
   "doctor_id": 1,
   "start_date": "2025-03-18 02:00:00",
   "end_date": "2025-03-18 06:00:00"
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

### Regel 2. Ein wiederkehrendes Event konvertieren {#rule-2-convert-a-recurring-event}

Ordnen Sie ein wiederkehrendes Event einem wöchentlichen Muster zu. Die Start- und Enddaten des wiederkehrenden Events im Scheduler müssen den Booking-Daten [`start`](api/config/booking-start.md) und [`end`](api/config/booking-end.md) entsprechen. Andernfalls erstellen Sie Platzhalter für die Daten vor und nach dem wiederkehrenden Event (siehe [Regel 7](#rule-7-handle-events-that-start-after-the-booking-start-date)).

Das folgende Code-Snippet zeigt ein wiederkehrendes Scheduler-Event, das wöchentlich an Wochentagen (Montag bis Freitag) wiederholt wird:

~~~json
{
   "doctor_id": 1,
   "start_date": "2025-03-13 09:00:00",
   "end_date": "2027-03-13 00:00:00",
   "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
   "duration": 28800
}
~~~

Booking stellt den Wochenplan als eine einzige Regel dar, mit denselben Start- und Endzeiten für jeden Wochentag.

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

### Regel 3. Ein mehrtägiges Event aufteilen {#rule-3-split-an-event-that-spans-multiple-days}

Booking generiert Slots innerhalb eines einzelnen Tages. Wenn ein Event zwei Tage umfasst (beginnt zum Beispiel um 20:00 Uhr und endet um 04:00 Uhr), teilen Sie es in zwei Slots auf, einen für jeden Tag.

Eine Arztschicht, die zum Beispiel am Samstagabend beginnt und bis in den Sonntagmorgen dauert, wird in zwei Regeln aufgeteilt: eine für Samstag und eine für Sonntag.

Das folgende Code-Snippet zeigt das mehrtägige Scheduler-Event:

~~~json
{
   "doctor_id": 2,
   "start_date": "2025-03-13 20:00:00",
   "end_date": "2027-03-13 00:00:00",
   "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=SA",
   "duration": 28800
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

### Regel 4. Ein einzelnes Event zu einem wiederkehrenden Zeitplan hinzufügen {#rule-4-add-a-single-event-to-a-recurring-schedule}

Wenn ein einzelnes Event einen wiederkehrenden Zeitplan erweitert, generieren Sie Slots für beide. Fügen Sie die Daten des einzelnen Events dem `dates`-Array der wiederkehrenden Regel hinzu.

Dieses Beispiel kombiniert zwei Scheduler-Events:

- wiederkehrendes Event — die Verfügbarkeit eines Arztes von 09:00 bis 17:00 Uhr an Wochentagen
- einzelnes Event — zusätzliche Verfügbarkeit von 02:00 bis 06:00 Uhr am 18. und 19. März

Das folgende Code-Snippet zeigt beide Scheduler-Events:

~~~json
[
    // wiederkehrendes Event
   {
     "doctor_id": 1,
     "start_date": "2025-03-13 09:00:00",
     "end_date": "2027-03-13 00:00:00",
     "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
     "duration": 28800
   },

   // einzelne Events
   {
     "doctor_id": 1,
     "start_date": "2025-03-18 02:00:00",
     "end_date": "2025-03-18 06:00:00"
   },
   {
     "doctor_id": 1,
     "start_date": "2025-03-19 02:00:00",
     "end_date": "2025-03-19 06:00:00"
   }
]
~~~

Booking führt das wiederkehrende Event und die einzelnen Events zu einer Regel zusammen. Die Daten der einzelnen Events (18. und 19. März) haben eine höhere Priorität und werden dem `dates`-Array der wiederkehrenden Regel hinzugefügt. Zur Prioritätsreihenfolge siehe [Slot-Regeln definieren](guides/configuration.md#define-slot-rules).

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

### Regel 5. Eine einzelne Instanz eines wiederkehrenden Events ändern {#rule-5-modify-a-single-instance-of-a-recurring-event}

Wenn sich eine einzelne Instanz eines wiederkehrenden Events ändert (zum Beispiel eine Zeitverschiebung an einem Datum), generieren Sie einen neuen Slot mit der aktualisierten Zeit. Fügen Sie das Datum dem `dates`-Array hinzu, das für dieses Datum das `days`-Array überschreibt.

Das folgende Code-Snippet zeigt das wiederkehrende Event und seine geänderte Instanz:

~~~json
[
   {
     "doctor_id": 1,
     "start_date": "2025-03-13 09:00:00",
     "end_date": "2027-03-13 00:00:00",
     "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
     "duration": 28800
   },
   {
     "doctor_id": 1,
     "start_date": "2025-03-14 03:00:00",
     "end_date": "2025-03-14 11:00:00",
     "recurring_event_id": "1",
     "original_start": "2025-03-14 09:00"
   }
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

### Regel 6. Eine einzelne Instanz eines wiederkehrenden Events löschen {#rule-6-delete-a-single-instance-of-a-recurring-event}

Wenn Sie ein einzelnes Vorkommen aus einem wiederkehrenden Event entfernen, spiegeln Sie die Entfernung in den Booking-Regeln wider. Erstellen Sie eine Regel für das gelöschte Datum mit einem leeren Zeitintervall und der `dates`-Eigenschaft, die eine höhere Priorität als `days` hat.

Das folgende Code-Snippet zeigt das wiederkehrende Event und sein gelöschtes Vorkommen:

~~~json
[
   {
     "doctor_id": 5,
     "start_date": "2025-03-14 09:00:00",
     "end_date": "2027-03-13 00:00:00",
     "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=TH,FR,SA,SU",
     "duration": 28800
   },
   {
     "doctor_id": 5,
     "start_date": "2025-03-23 09:00:00",
     "end_date": "2025-03-23 17:00:00",
     "recurring_event_id": "15",
     "original_start": "2025-03-23 09:00",
     "deleted": true
   }
]
~~~

Das folgende Code-Snippet zeigt die wiederkehrende Regel sowie das leere Intervall, das das gelöschte Datum entfernt:

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

### Regel 7. Events behandeln, die nach dem Booking-Startdatum beginnen {#rule-7-handle-events-that-start-after-the-booking-start-date}

Wenn ein wiederkehrendes Event nach dem Booking-Startdatum (standardmäßig heute, in diesen Beispielen 13.03.2025) beginnt, erstellen Sie Regeln mit leeren Zeitintervallen für die Daten vor dem Beginn des Events. Dadurch werden diese Daten aus der Wiederholung entfernt.

Das folgende Code-Snippet zeigt ein wiederkehrendes Event, das vier Tage nach dem Booking-Startdatum beginnt:

~~~json
{
    "doctor_id": 5,
    "start_date": "2025-03-17 09:00:00",
    "end_date": "2027-03-13 00:00:00",
    "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA",
    "duration": 28800
}
~~~

Das folgende Code-Snippet zeigt die wiederkehrende Regel sowie leere Intervalle für die vier Daten vor dem Event-Beginn:

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
