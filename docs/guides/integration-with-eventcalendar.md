---
sidebar_label: Integration with Event Calendar
title: Integration with DHTMLX Event Calendar
description: You can learn about the integration with DHTMLX Event Calendar in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Integration with DHTMLX Event Calendar

This guide describes how to integrate the DHTMLX Booking widget with [DHTMLX Event Calendar](https://docs.dhtmlx.com/eventcalendar/).

## Main concepts

The integration focuses on converting Event Calendar data into Booking slots.

- **Event Calendar events vs. Booking slots:**
    - Event Calendar handles events (e.g., single or recurring).
    - Booking generates available time slots from those events.

Generate booking slots from events. The [snippet below](#example) converts doctor schedule data on the server side.

- **Recurring events limitation:**
    - Booking supports only weekly recurring events (defined as `INTERVAL=1;FREQ=WEEKLY` in Event Calendar).
    - Event Calendar supports any recurring pattern. Hide other recurring options from the Event Calendar form to ensure compatibility.

- **Timezone handling:**
    - Booking interprets timestamps in the local timezone.
    - If you use UTC timestamps, convert them to the local timezone before sending to Booking, and back to UTC before saving. See [Work with UTC data](/guides/saving-reservations/#work-with-utc-data).

- **Booking slot strategies:**
    - `slots` and `usedSlots` — build the schedule and exclude booked slots (this guide focuses on this strategy)
    - `availableSlots` — suitable for events without recurrences

## Example

The snippet below integrates Booking with Event Calendar by converting doctors' schedules into booking slots. The integration uses the following data endpoints:

- `/events` — Event Calendar data (doctor schedules) with recurring and single-time events; used to generate time slots for Booking
- `/units` — final Booking slots generated from the Event Calendar `events` data on the server side; see also [backend](https://github.com/DHTMLX/event-calendar-booking-go)
- `/calendars` — doctors' calendars with names and IDs; used in both Event Calendar and Booking widgets
- `/reservations` — auxiliary collection that visualizes `usedSlots` in the timeline view; populated from the Booking form

Event conversion is the major part of integration. The [section below](#convert-events-to-booking-slots) describes the rules for handling events and converting the data to slots.

<iframe src="https://snippet.dhtmlx.com/c5eu8pdk?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="800"></iframe>

## Convert events to Booking slots

The examples below use JSON data converted on the server side. All examples cover the period from 2025-03-13 to 2027-03-13.

**Rule 1. Create a slot from a single event.**

For each single event in the schedule, convert the start and end times to Booking slots by creating an entry in the slots array, including the corresponding date (dates).

Event Calendar event:

~~~json
{
  "type": 1, // type is calendar id
  "start_date": "2025-03-18T02:00:00Z", // assume dates in UTC
  "end_date": "2025-03-18T06:00:00Z"
}
~~~

Booking slot:

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

**Rule 2. Handle recurring events.**

Use a weekly pattern for recurring events. The start and end dates of each recurring event in Event Calendar must match the Booking [`start`](/api/config/booking-start) and [`end`](/api/config/booking-end) dates. If they do not match, create placeholder rules for the dates before and after the event (see Rule 7).

Event Calendar event (weekly on weekdays): the recurrence rule (rrule) specifies that the event repeats weekly on Monday, Tuesday, Wednesday, Thursday, and Friday.

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

Booking slots: In Booking, the weekly schedule is represented as a single rule, with the same start and end times for all recurring events:

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

**Rule 3. Handle events that span multiple days.**

If an event spans multiple days (e.g., starts at 8 PM and ends at 4 AM), split the event into two slots, one for each day.

When a doctor's shift starts on Saturday evening and continues into Sunday morning, split the event into two separate rules: one for Saturday and one for Sunday.

Event Calendar event:

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

Booking slots:

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

**Rule 4. Add single events to a recurring schedule.**

Add a single event to a recurring schedule. Booking generates slots for both the recurring and single events. Add single event dates to the recurring event's `dates` array.

Event Calendar events:

- Recurring event: a doctor's availability from 9:00 AM to 5:00 PM on weekdays.
- Single event: a doctor is also available from 2:00 AM to 6:00 AM on March 18 and 19.

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

Booking slots:

- Merging events: combine the recurring and single events into one Booking rule.
- Add specific dates (March 18 and 19) to the recurring event's rule to give those dates priority. See [Define slot rules](/guides/configuration/#define-slot-rules).

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

**Rule 5. Modify a single instance of a recurring event.**

If you edit a single instance of a recurring event (e.g., the time changes for a specific date), create a new slot with the updated time in the `dates` array. The `dates` array takes priority over `days`.

Event Calendar event:

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
  }
]
~~~

Booking slots:

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

**Rule 6. Delete a single instance of a recurring event.**

When you remove a single occurrence from a recurring event in Event Calendar, update the Booking rules to reflect the removal. Create a rule for the removed date with an empty time interval and the `dates` property. The `dates` property takes priority over `days`.

Event Calendar events:

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

Booking slots:

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

**Rule 7. Handle events that start after the Booking start date.**

If a recurring event starts after the Booking start date (2025-03-13 in these examples), create rules with empty time intervals for all dates before the event's start date. This effectively removes those dates from the recurrence.

Event Calendar event:

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

Booking slots:

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
