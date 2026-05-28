---
sidebar_label: Integration with Event Calendar
title: Integration with DHTMLX Event Calendar
description: You can learn about the integration with DHTMLX Event Calendar in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Integration with DHTMLX Event Calendar

This guide shows how to integrate the DHTMLX Booking widget with [DHTMLX Event Calendar](https://docs.dhtmlx.com/eventcalendar/). The integration converts Event Calendar events into Booking slots on the server side.

## Understand the main concepts

The integration centers on converting Event Calendar events into Booking slots. Keep the following points in mind before you start.

**Event Calendar events vs. Booking slots.** Event Calendar handles events, both single and recurring. Booking generates available time slots from those events. The [snippet below](#example) generates booking slots from a doctor's schedule by converting JSON data on the server side.

**Recurring events limitation.** Booking supports only weekly recurring events, defined as `FREQ=WEEKLY;INTERVAL=1` in Event Calendar. Event Calendar handles any recurrence pattern, so hide the other recurrence options in the Event Calendar form.

**Timezone handling.** Booking interprets timestamps in the local timezone. If you use global timestamps, convert them to the local timezone before sending them to Booking, and back to UTC before saving. For conversion instructions, see [Convert UTC data to the local timezone](/guides/saving-reservations/#convert-utc-data-to-the-local-timezone).

**Booking slot strategies.** Choose one of two approaches to build the schedule:

- [`slots`](/api/config/booking-data) and [`usedSlots`](/api/config/booking-data) — build the schedule and exclude booked slots (the strategy covered here)
- [`availableSlots`](/api/config/booking-data) — list bookable slots explicitly, suitable for events without recurrences

## Example

The snippet below integrates Booking with Event Calendar by converting doctors' schedules into booking slots. The integration uses four data endpoints:

- `/events` — Event Calendar data (doctor schedules) with recurring and single events; the source for Booking time slots
- `/units` — final Booking slots generated from the `/events` data on the server side; see the [backend example](https://github.com/DHTMLX/event-calendar-booking-go)
- `/calendars` — doctors' calendars; supplies doctor information to both the Event Calendar and Booking widgets
- `/reservations` — auxiliary collection that visualizes `usedSlots` in the timeline view; holds already reserved slots from the Booking form

Event-to-slot conversion is the core of the integration. The [next section](#convert-events-to-booking-slots) describes the conversion rules.

<iframe src="https://snippet.dhtmlx.com/c5eu8pdk?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="800"></iframe>

## Convert events to Booking slots

The rules below generate booking slots from a doctor's schedule using JSON data, converted on the server side. Every example assumes the schedule for the next period, from 2025-03-13 to 2027-03-13.

### Rule 1. Create a slot from a single event

For each single event, convert the start and end times to a Booking slot. Add an entry to the `slots` array and include the event date in the `dates` array.

The following code snippet shows a single Event Calendar event:

~~~json
{
  "type": 1, // type is calendar id
  "start_date": "2025-03-18T02:00:00Z", // assume dates in UTC
  "end_date": "2025-03-18T06:00:00Z"
}
~~~

The following code snippet shows the resulting Booking slot:

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
         1742256000000 // 2025-03-18 00:00:00 (timestamp)
       ]
     }
   ]
}
~~~

### Rule 2. Convert a recurring event

Map a recurring event to a weekly pattern. The start and end dates of the recurring event in Event Calendar must equal the Booking [`start`](/api/config/booking-start) and [`end`](/api/config/booking-end) dates. Otherwise, create placeholders for the dates before and after the recurring event (see [Rule 7](#rule-7-handle-events-that-start-after-the-booking-start-date)).

The following code snippet shows a recurring Event Calendar event that repeats weekly on weekdays (Monday through Friday):

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

Booking represents the weekly schedule as a single rule, with the same start and end times for every weekday.

The following code snippet shows the resulting Booking slots:

~~~json
{
   "id": 1,
   "slotSize": 20,
   "slotGap": 5,
   "slots": [
     {
       "from": "09:00",
       "to": "17:00",
       "days": [1, 2, 3, 4, 5] // Monday to Friday
     }
   ]
}
~~~

### Rule 3. Split an event that spans multiple days

Booking generates slots within a single day. If an event spans two days (for example, starts at 8 PM and ends at 4 AM), split it into two slots, one for each day.

For example, a doctor's shift that starts on Saturday evening and lasts into Sunday morning splits into two rules: one for Saturday and one for Sunday.

The following code snippet shows the multi-day Event Calendar event:

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

The following code snippet shows the two resulting Booking slots, one per day:

~~~json
{
   "id": 2,
   "slotSize": 45,
   "slotGap": 5,
   "slots": [
     {
       "from": "20:00",
       "to": "24:10",
       "days": [6] // Saturday
     },
     {
       "from": "00:10",
       "to": "04:00",
       "days": [0] // Sunday
     }
   ]
}
~~~

### Rule 4. Add a single event to a recurring schedule

When a single event extends a recurring schedule, generate slots for both. Add the single event dates to the recurring rule's `dates` array.

This example combines two Event Calendar events:

- recurring event — a doctor's availability from 9:00 AM to 5:00 PM on weekdays
- single event — extra availability from 2:00 AM to 6:00 AM on March 18 and 19

The following code snippet shows both Event Calendar events:

~~~json
[
  // recurring event
  {
    "type": 1,
    "start_date": "2025-03-13T09:00:00Z",
    "end_date": "2025-03-13T17:00:00Z",
    "recurring": true,
    "RRULE": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;UNTIL=2027-03-13T23:59:59",
    "STDATE": "2025-03-13T09:00:00Z",
    "DTEND": "2027-03-13T00:00:00Z"
  },
  // single events
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

Booking merges the recurring event and the single events into one rule. The single event dates (March 18 and 19) carry higher priority and join the recurring rule's `dates` array. For the priority order, see [Define slot rules](/guides/configuration/#define-slot-rules).

The following code snippet shows the merged Booking slots:

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

### Rule 5. Modify a single instance of a recurring event

When a single instance of a recurring event changes (for example, a time shift on one date), generate a new slot with the updated time. Add the date to the `dates` array, which overrides the `days` array for that date.

The following code snippet shows the recurring event and its modified instance:

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

The following code snippet shows the recurring rule plus the override for the modified date:

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
         1741910400000 // 2025-03-14 03:00:00 (modified)
       ]
     }
   ]
}
~~~

### Rule 6. Delete a single instance of a recurring event

When you remove a single occurrence from a recurring event, reflect the removal in the Booking rules. Create a rule for the removed date with an empty time interval and the `dates` property, which carries higher priority than `days`.

The following code snippet shows the recurring event and its cancelled occurrence:

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

The following code snippet shows the recurring rule plus the empty interval that removes the cancelled date:

~~~json
{
    "id": 5,
    "slotSize":60,
    "slotGap":10,
    "slots":[
        {
            "from": "09:00",
            "to": "17:00",
            "days": [4, 5, 6, 0] // Thursday to Sunday
        },
        {
            "from": "00:00",
            "to": "00:00",
            "dates": [
                1742688000000 // 2025-03-23 00:00:00 (deleted occurrence)
            ]
        }
    ]
}
~~~

### Rule 7. Handle events that start after the Booking start date

If a recurring event starts after the Booking start date (the default is today, 2025-03-13 in these examples), create rules with empty time intervals for the dates before the event's start. This removes those dates from the recurrence.

The following code snippet shows a recurring event that starts four days after the Booking start date:

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

The following code snippet shows the recurring rule plus empty intervals for the four dates before the event starts:

~~~json
{
    "id": 5,
    "slotSize":60,
    "slotGap":10,
    "slots": [
        { "from": "09:00", "to": "17:00", "days": [0, 1, 2, 3, 4, 5, 6] },
        { "from": "00:00", "to": "00:00", "dates": [
            1741820400000,  // March 13, 2025
            1741906800000,  // March 14, 2025
            1741993200000,  // March 15, 2025
            1742079600000   // March 16, 2025
        ]}
    ]
}
~~~

