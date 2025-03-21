---
sidebar_label: Integration with Event Calendar
title: Integration with DHTMLX Event Calendar
description: You can learn about the integration with DHTMLX Event Calendar in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Integration with DHTMLX Event Calendar

This guide will show how to integrate the DHTMLX Booking widget with [DHTMLX Event Calendar](https://docs.dhtmlx.com/eventcalendar/). 

## Main concepts

The integration primarily focuses on converting the Event Calendar data into Booking slots.

- **Event Calendar events vs. Booking slots:**
    - Event Calendar handles events (e.g., single or recurring).
    - Booking generates available time slots from those events.

So what you actually need is to generate booking slots from events (the [snippet below](#example) shows how to generate booking slots from the doctor's schedule by converting JSON data on server-side).

- **Recurring events limitation:**
    - Booking supports only weekly recurring events (defined as INTERVAL=1;FREQ=WEEKLY in Event Calendar).
    - Event Calendar can handle any recurring pattern so you will need to hide other recurring options from Event calendar form

- **Timezone handling:**
    - Booking interprets timestamps in the local timezone.
    - If you use global timestamps, you need to convert them to local timezones before sending them to Booking (and vice versa before saving the data back).
For conversion instructions, refer to [Working with UTC data](/guides/saving-reservations/#working-with-utc-data). 

- **Booking slot strategies:**
    - Use `slots` and `usedSlots` to build the schedule, ensuring that used slots are excluded (we'll focus on this strategy)
    - Use only `availableSlots`, which is suitable for events without recurrences.

## Example 

The snippet below demonstrates how to integrate Booking with the Event Calendar widget by converting doctors' schedules into booking slots. Key data endpoints used for integration:

- `/events` - Event Calendar data (doctor schedules) that includes recurring and single-time events. These events are used to create time slots for the Booking system.

- `/units` - final Booking slots generated from the Event Calendar `events` data. The slots are generated on the server-side. Please, also refer to [backend](https://git.webix.io/XBS/event-calendar-booking-go). 

- `/calendars` - contains doctors' calendars. It is used for displaying doctor information in both the Event Calendar and Booking widgets.

- `/reservations` - an auxiliary collection used to visualize `usedSlots` in the timeline view. This data comes from the Booking form, containing information about already reserved slots for doctors.

Converting events to Booking slots is the major part of integration and the rules for handling the events and converting them to slots are described in the [section below](#rules-for-converting-events-to-booking-slots). 


<iframe src="https://snippet.dhtmlx.com/c5eu8pdk?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="800"></iframe>

## Rules for converting events to Booking slots

We will show how to generate booking slots from the doctor's schedule/calendars using JSON data. Data is converted on the the server-side. In all example below the schedule for the next period is considered: from 2025-03-13 to 2027-03-13. 

**Rule 1. Single event slot creation.**

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

**Rule 2. Recurring events.** 

For recurring events, we use a weekly pattern. The start date and end date of each recurring event in Event Calendar should be equal to Booking [start](/api/config/booking-start) and [end](/api/config/booking-end) dates, otherwise create placeholders for dates before and after the recurring event (see Rule 7).

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

**Rule 3. Scheduling an event that spans multiple days.**

If an event spans across multiple days (e.g., starts at 8 PM and ends at 4 AM), it should be split into two slots — one for each day.

For example, when a doctor's shift starts on Saturday evening and lasts into Sunday morning, Booking can only generate slots within one day. In this case, we need to split the event into two separate rules: one for Saturday and another for Sunday.

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

**Rule 4. Additional single events added to recurring events.**

In this case, a single event is added to a recurring schedule. The Booking slots are generated for both the recurring and the single events. The single event dates are added to the recurring event's dates array. 

Event Calendar events:

- Recurring event: a doctor’s availability from 9:00 AM to 5:00 PM on weekdays.
- Single event: a doctor is also available from 2:00 AM to 6:00 AM on March 18th and 19th.

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

- Merging events: the recurring event and single events are combined into one Booking rule.
- If a single event has priority, its specific dates (March 18th and 19th) are added to the recurring event's rule. Please, refer to [Defining the slot rules](/guides/configuration/#defining-slot-rules)

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

**Rule 5. Modifying a single instance of a recurring event.**

If a single instance of a recurring event is edited (e.g., time change for a specific date), generate a new slot with the updated time and date in the dates array, overriding the days array.

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
  },
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

**Rule 6. Deleting a single instance of a recurring event.**

When a single occurrence is removed from a recurring event in Event Calendar, we need to update Booking rules to reflect this removal. This is done by creating a special rule for the removed date, using an empty time interval and the dates property (which has higher priority than days).

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

**Rule 7. Events starting later than Booking start date.**

If a recurring event starts after the Booking start date (default is today which is 2025-03-13 in all examples), create rules with empty time intervals for the dates prior to the event's start date. This simulates the dates being "removed" from the recurrence.

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










