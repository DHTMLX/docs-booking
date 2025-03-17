---
sidebar_label: Integration with DHTMLX Scheduler
title: Integration with DHTMLX Scheduler
description: You can learn about the integration with DHTMLX Scheduler in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Integration with DHTMLX Scheduler

This guide will show how to integrate the DHTMLX Booking widget with DHTMLX Scheduler. 

## Main concepts

The integration primarily focuses on converting the Scheduler data into Booking slots.

- **Scheduler events vs. Booking slots:**
    - Scheduler handles events (e.g., single or recurring).
    - Booking generates available time slots from those events.

So what you actually need is to generate booking slots from the schedule (the [snippet below](#example) shows how to generate booking slots from the doctor's schedule using JSON data).

- **Recurring events limitation:**
    - Booking supports only weekly recurring events (defined as INTERVAL=1;FREQ=WEEKLY in the Scheduler).
    - Scheduler can handle any recurring pattern

- **Timezone handling:**
    - Booking interprets timestamps in the local timezone.
    - You need to convert timestamps between global and local timezones before sending them to Booking (and vice versa).

- **Slot creation strategy:**
    - Use the `slots` and `usedSlots` properties to build the schedule, ensuring that used slots are excluded.


## Main steps for integration and rules for generating events

We will show how to generate booking slots from the doctor's schedule using JSON data. 

**Step 1. Retrieve the doctor's schedule data (e.g., /doctors/worktime), which may contain both recurring and single events.**

Scheduler data example:

~~~json
[
  {
    "doctor_id": 1,
    "start_date": "2025-03-18 02:00:00",
    "end_date": "2025-03-18 06:00:00"
  },
  {
    "doctor_id": 1,
    "start_date": "2025-03-13 09:00:00",
    "end_date": "9999-02-01 00:00:00",
    "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
    "duration": 28800
  },
  {
    "doctor_id": 2,
    "start_date": "2025-03-13 20:00:00",
    "end_date": "9999-02-01 00:00:00",
    "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=SA",
    "duration": 28800
  }
]
~~~

**Step 2. Convert Scheduler events to Booking slots following the next rules.**

**Rule 1:** Single event slot creation. 

For each single event in the schedule, convert the start and end times to Booking slots by creating an entry in the slots array, including the corresponding date (dates).

Scheduler event:

~~~json
{
   "doctor_id": 1,
   "start_date": "2025-03-18 02:00:00",
   "end_date": "2025-03-18 06:00:00"
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

**Rule 2:** Recurring events. 

For recurring events, we use a weekly pattern. The start and end dates must be the same for each occurrence, as Booking only supports weekly recurring slots.

Scheduler event (weekly on weekdays): the recurrence rule (rrule) specifies that the event repeats weekly on Monday, Tuesday, Wednesday, Thursday, and Friday.

~~~json
{
   "doctor_id": 1,
   "start_date": "2025-03-13 09:00:00",
   "end_date": "9999-02-01 00:00:00",
   "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
   "duration": 28800
}
~~~

Booking Slots: In Booking, the weekly schedule is represented as a single rule, with the same start and end times for all repeated events:

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

**Rule 3:** Scheduling an event that spans multiple days.

If an event spans across multiple days (e.g., starts at 8 PM and ends at 4 AM), it should be split into two slots — one for each day.

For example, when a doctor's shift starts on Saturday evening and lasts into Sunday morning, Booking can only generate slots within one day. In this case, we need to split the event into two separate rules: one for Saturday and another for Sunday.

Scheduler event:

~~~json
{
   "doctor_id": 2,
   "start_date": "2025-03-13 20:00:00",
   "end_date": "9999-02-01 00:00:00",
   "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=SA",
   "duration": 28800
}
~~~

Booking slot:

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

**Rule 4:** Additional single events added to recurring events.

In this case, a single event is added to a recurring schedule. The Booking slots are generated for both the recurring and the single events. The single event dates are added to the recurring event's dates array. 

Scheduler events:

- Repeating event: Doctor’s availability from 9:00 AM to 5:00 PM on weekdays.
- Single event: Doctor is also available from 2:00 AM to 6:00 AM on March 18th and 19th.

~~~json
[
    // recurring event
   {
     "doctor_id": 1,
     "start_date": "2025-03-13 09:00:00",
     "end_date": "9999-02-01 00:00:00",
     "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
     "duration": 28800
   },

   // single events
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

Booking slots:

- Merging events: The repeating event and single events are combined into one Booking rule.
- If the single event has priority, its specific dates (March 18th and 19th) are added to the repeating event's rule.
- If the single event needs to override the repeating one, it must not be added to the repeating event’s dates.

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

**Rule 5:** Modifying a single instance of an recurring event.

If a single instance of a recurring event is edited (e.g., time change for a specific date), generate a new slot with the updated time and date in the dates array, overriding the days array.

Scheduler event:

~~~json
[
   {
     "doctor_id": 1,
     "start_date": "2025-03-13 09:00:00",
     "end_date": "9999-02-01 00:00:00",
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

Booking slot:

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

**Rule 6:** Deleting a single instance of a recurring event

When a single occurrence is removed from a recurring event in Scheduler, we need to update Booking rules to reflect this removal. This is done by creating a special rule for the removed date, using an empty time interval and the dates property (which has higher priority than days).

Scheduler event:

~~~json
[
   {
     "doctor_id": 5,
     "start_date": "2025-03-14 09:00:00",
     "end_date": "9999-02-01 00:00:00",
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

Booking slot:

~~~json
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
~~~

**Rule 7:** Events starting later than Booking start date

If a recurring event starts after the Booking start date (default is today), create rules with empty time intervals for the dates prior to the event's start date. This simulates the dates being "removed" from the recurrence.

Scheduler event:

~~~json
{
    "id": "ffbe7628-25f4-4cbe-9127-3bc779d6bafa",
    "start_date": "2025-03-17 09:00:00",
    "end_date": "9999-02-01 00:00:00",
    "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA",
    "duration": 28800
}
~~~

Booking slots:

~~~json
{
    "slots": [
        { "from": "09:00", "to": "17:00", "days": [0, 1, 2, 3, 4, 5, 6] },
        { "from": "00:00", "to": "00:00", "dates": [
            1741906800000,  // March 14, 2025
            1741993200000,  // March 15, 2025
            1742079600000   // March 16, 2025
        ]}
    ]
}
~~~

**Step 3. Timezone Conversion**

Ensure that the timestamps are converted from global time to the local time of the user's timezone before sending them to Booking. This ensures correct slot display in the Booking widget.


## Example 

The snippet below demonstrates how to convert doctor schedules into booking slots. The doctors' schedules that include recurring and single-time events are fetched from the Scheduler widget via the `/doctors/worktime` URL, while the final booking slots generated from the scheduler data are provided by the `/units` URL. The slots are generated on the server-side. Please, also refer to [backend](https://github.com/DHTMLX/scheduler-booking-go).

<iframe src="https://snippet.dhtmlx.com/d5zbq3g3?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="800"></iframe>





