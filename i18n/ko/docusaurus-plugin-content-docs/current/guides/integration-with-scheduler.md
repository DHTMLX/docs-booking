---
sidebar_label: Scheduler와의 통합
title: DHTMLX Scheduler와의 통합
description: DHTMLX JavaScript Booking 라이브러리 문서에서 DHTMLX Scheduler와의 통합에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 시험해 보세요. DHTMLX Booking 무료 30일 평가판도 다운로드하실 수 있습니다.
---

# DHTMLX Scheduler와의 통합

이 가이드는 DHTMLX Booking 위젯을 [DHTMLX Scheduler](https://docs.dhtmlx.com/scheduler/)와 통합하는 방법을 설명합니다. 통합은 서버 측에서 Scheduler 이벤트를 Booking 슬롯으로 변환합니다.

## 주요 개념 이해 {#understand-the-main-concepts}

통합의 핵심은 Scheduler 이벤트를 Booking 슬롯으로 변환하는 것입니다. 시작하기 전에 다음 사항을 숙지하세요.

**Scheduler 이벤트 vs. Booking 슬롯.** Scheduler는 단일 이벤트와 반복 이벤트를 모두 처리합니다. Booking은 해당 이벤트로부터 예약 가능한 시간 슬롯을 생성합니다. [아래 예제](#example)는 서버 측에서 JSON 데이터를 변환하여 의사의 일정으로부터 예약 슬롯을 생성합니다.

**반복 이벤트 제한.** Booking은 Scheduler에서 `INTERVAL=1;FREQ=WEEKLY`로 정의된 주간 반복 이벤트만 지원합니다. Scheduler는 모든 반복 패턴을 처리하므로, Scheduler 설정에서 다른 반복 옵션을 제한하세요.

**타임존 처리.** Booking은 타임스탬프를 로컬 타임존으로 해석합니다. 글로벌 타임스탬프를 사용하는 경우, Booking에 전달하기 전에 로컬 타임존으로 변환하고, 저장하기 전에 UTC로 다시 변환하세요. 변환 방법은 [UTC 데이터를 로컬 타임존으로 변환](guides/saving-reservations.md#convert-utc-data-to-the-local-timezone)을 참조하세요.

**Booking 슬롯 전략.** 일정을 구성하는 두 가지 방법 중 하나를 선택하세요:

- [`slots`](api/config/booking-data.md)와 [`usedSlots`](api/config/booking-data.md) — 일정을 구성하고 예약된 슬롯을 제외합니다(여기서 다루는 전략)
- [`availableSlots`](api/config/booking-data.md) — 예약 가능한 슬롯을 명시적으로 나열하며, 반복이 없는 이벤트에 적합합니다

## 예제 {#example}

아래 예제는 의사의 일정을 예약 슬롯으로 변환하여 Booking과 Scheduler를 통합합니다. 통합에는 네 가지 데이터 엔드포인트가 사용됩니다:

- `/doctors/worktime` — 반복 이벤트와 단일 이벤트가 포함된 Scheduler 데이터(의사 일정); Booking 시간 슬롯의 소스
- `/units` — 서버 측에서 `worktime` 데이터로부터 생성된 최종 Booking 슬롯; [백엔드 예제](https://github.com/DHTMLX/scheduler-booking-go) 참조
- `/doctors/reservations` — 타임라인 뷰에서 `usedSlots`를 시각화하는 보조 컬렉션; Booking 폼에서 이미 예약된 슬롯을 보관
- `/doctors` — 이름과 ID를 포함한 전체 의사 목록; Scheduler와 Booking 위젯 모두에 의사 정보를 제공

이벤트-슬롯 변환이 통합의 핵심입니다. [다음 섹션](#convert-scheduler-events-to-booking-slots)에서 변환 규칙을 설명합니다.

<iframe src="https://snippet.dhtmlx.com/d5zbq3g3?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="800"></iframe>

## Scheduler 이벤트를 Booking 슬롯으로 변환 {#convert-scheduler-events-to-booking-slots}

아래 규칙은 서버 측에서 JSON 데이터를 변환하여 의사의 일정으로부터 예약 슬롯을 생성합니다. 모든 예제는 2025-03-13부터 2027-03-13까지의 다음 기간 일정을 기준으로 합니다.

### 규칙 1. 단일 이벤트로부터 슬롯 생성 {#rule-1-create-a-slot-from-a-single-event}

단일 이벤트마다 시작 시간과 종료 시간을 Booking 슬롯으로 변환하세요. `slots` 배열에 항목을 추가하고 `dates` 배열에 이벤트 날짜를 포함하세요.

다음 코드는 단일 Scheduler 이벤트를 보여줍니다:

~~~json
{
   "doctor_id": 1,
   "start_date": "2025-03-18 02:00:00",
   "end_date": "2025-03-18 06:00:00"
}
~~~

다음 코드는 변환된 Booking 슬롯을 보여줍니다:

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
         1742256000000 // 2025-03-18 00:00:00 (타임스탬프)
       ]
     }
   ]
}
~~~

### 규칙 2. 반복 이벤트 변환 {#rule-2-convert-a-recurring-event}

반복 이벤트를 주간 패턴으로 매핑하세요. Scheduler에서 반복 이벤트의 시작일과 종료일은 Booking의 [`start`](api/config/booking-start.md)와 [`end`](api/config/booking-end.md) 날짜와 일치해야 합니다. 일치하지 않을 경우, 반복 이벤트 이전과 이후 날짜에 대한 플레이스홀더를 생성하세요([규칙 7](#rule-7-handle-events-that-start-after-the-booking-start-date) 참조).

다음 코드는 평일(월요일부터 금요일)에 매주 반복되는 Scheduler 이벤트를 보여줍니다:

~~~json
{
   "doctor_id": 1,
   "start_date": "2025-03-13 09:00:00",
   "end_date": "2027-03-13 00:00:00",
   "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
   "duration": 28800
}
~~~

Booking은 주간 일정을 모든 평일에 동일한 시작 및 종료 시간을 가진 단일 규칙으로 표현합니다.

다음 코드는 변환된 Booking 슬롯을 보여줍니다:

~~~json
{
   "id": 1,
   "slotSize": 20,
   "slotGap": 5,
   "slots": [
     {
       "from": "09:00",
       "to": "17:00",
       "days": [1, 2, 3, 4, 5] // 월요일부터 금요일
     }
   ]
}
~~~

### 규칙 3. 여러 날에 걸친 이벤트 분리 {#rule-3-split-an-event-that-spans-multiple-days}

Booking은 하루 내에서 슬롯을 생성합니다. 이벤트가 이틀에 걸쳐 있는 경우(예: 오후 8시 시작, 오전 4시 종료), 각 날에 대한 슬롯 두 개로 분리하세요.

예를 들어, 토요일 저녁에 시작하여 일요일 아침까지 이어지는 의사의 교대 근무는 토요일과 일요일 각각에 대한 두 개의 규칙으로 분리됩니다.

다음 코드는 여러 날에 걸친 Scheduler 이벤트를 보여줍니다:

~~~json
{
   "doctor_id": 2,
   "start_date": "2025-03-13 20:00:00",
   "end_date": "2027-03-13 00:00:00",
   "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=SA",
   "duration": 28800
}
~~~

다음 코드는 각 날에 대한 두 개의 Booking 슬롯을 보여줍니다:

~~~json
{
   "id": 2,
   "slotSize": 45,
   "slotGap": 5,
   "slots": [
     {
       "from": "20:00",
       "to": "24:10",
       "days": [6] // 토요일
     },
     {
       "from": "00:10",
       "to": "04:00",
       "days": [0] // 일요일
     }
   ]
}
~~~

### 규칙 4. 반복 일정에 단일 이벤트 추가 {#rule-4-add-a-single-event-to-a-recurring-schedule}

단일 이벤트가 반복 일정을 확장하는 경우, 두 이벤트 모두에 대한 슬롯을 생성하세요. 단일 이벤트 날짜를 반복 규칙의 `dates` 배열에 추가하세요.

이 예제는 두 개의 Scheduler 이벤트를 결합합니다:

- 반복 이벤트 — 평일 오전 9시부터 오후 5시까지의 의사 가용 시간
- 단일 이벤트 — 3월 18일과 19일 오전 2시부터 6시까지의 추가 가용 시간

다음 코드는 두 개의 Scheduler 이벤트를 보여줍니다:

~~~json
[
    // 반복 이벤트
   {
     "doctor_id": 1,
     "start_date": "2025-03-13 09:00:00",
     "end_date": "2027-03-13 00:00:00",
     "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
     "duration": 28800
   },

   // 단일 이벤트
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

Booking은 반복 이벤트와 단일 이벤트를 하나의 규칙으로 병합합니다. 단일 이벤트 날짜(3월 18일과 19일)는 우선순위가 높으며 반복 규칙의 `dates` 배열에 추가됩니다. 우선순위 순서에 대해서는 [슬롯 규칙 정의](guides/configuration.md#define-slot-rules)를 참조하세요.

다음 코드는 병합된 Booking 슬롯을 보여줍니다:

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

### 규칙 5. 반복 이벤트의 단일 인스턴스 수정 {#rule-5-modify-a-single-instance-of-a-recurring-event}

반복 이벤트의 단일 인스턴스가 변경된 경우(예: 특정 날짜의 시간 변경), 업데이트된 시간으로 새 슬롯을 생성하세요. 해당 날짜를 `dates` 배열에 추가하면, 그 날짜에 대해 `days` 배열보다 우선 적용됩니다.

다음 코드는 반복 이벤트와 수정된 인스턴스를 보여줍니다:

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

다음 코드는 반복 규칙과 수정된 날짜에 대한 재정의를 보여줍니다:

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
         1741910400000 // 2025-03-14 03:00:00 (수정됨)
       ]
     }
   ]
}
~~~

### 규칙 6. 반복 이벤트의 단일 인스턴스 삭제 {#rule-6-delete-a-single-instance-of-a-recurring-event}

반복 이벤트에서 단일 발생을 제거할 때, Booking 규칙에 해당 삭제를 반영하세요. 삭제된 날짜에 대해 빈 시간 구간과 `dates` 속성을 가진 규칙을 생성하세요. `dates`는 `days`보다 우선순위가 높습니다.

다음 코드는 반복 이벤트와 삭제된 발생을 보여줍니다:

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

다음 코드는 반복 규칙과 삭제된 날짜를 제거하는 빈 구간을 보여줍니다:

~~~json
{
    "id": 5,
    "slotSize":60,
    "slotGap":10,
    "slots":[
        {
            "from": "09:00",
            "to": "17:00",
            "days": [4, 5, 6, 0] // 목요일부터 일요일
        },
        {
            "from": "00:00",
            "to": "00:00",
            "dates": [
                1742688000000 // 2025-03-23 00:00:00 (삭제된 발생)
            ]
        }
    ]
}
~~~

### 규칙 7. Booking 시작일 이후에 시작하는 이벤트 처리 {#rule-7-handle-events-that-start-after-the-booking-start-date}

반복 이벤트가 Booking 시작일(기본값은 오늘, 예제에서는 2025-03-13) 이후에 시작하는 경우, 이벤트 시작 전의 날짜에 대해 빈 시간 구간을 가진 규칙을 생성하세요. 이를 통해 해당 날짜들이 반복 패턴에서 제외됩니다.

다음 코드는 Booking 시작일로부터 4일 후에 시작하는 반복 이벤트를 보여줍니다:

~~~json
{
    "doctor_id": 5,
    "start_date": "2025-03-17 09:00:00",
    "end_date": "2027-03-13 00:00:00",
    "rrule": "INTERVAL=1;FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA",
    "duration": 28800
}
~~~

다음 코드는 반복 규칙과 이벤트 시작 전 4일에 대한 빈 구간을 보여줍니다:

~~~json
{
    "id": 5,
    "slotSize":60,
    "slotGap":10,
    "slots": [
        { "from": "09:00", "to": "17:00", "days": [0, 1, 2, 3, 4, 5, 6] },
        { "from": "00:00", "to": "00:00", "dates": [
            1741820400000,  // 2025년 3월 13일
            1741906800000,  // 2025년 3월 14일
            1741993200000,  // 2025년 3월 15일
            1742079600000   // 2025년 3월 16일
        ]}
    ]
}
~~~
