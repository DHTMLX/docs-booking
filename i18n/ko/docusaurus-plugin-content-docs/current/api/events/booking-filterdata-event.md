---
sidebar_label: filter-data
title: filter-data 이벤트
description: DHTMLX JavaScript Booking 라이브러리의 filter-data 이벤트에 대한 문서입니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking 30일 무료 평가판도 다운로드할 수 있습니다.
---

# filter-data

### 설명 {#description}

@short: 필터가 적용될 때 발생합니다

### 사용법 {#usage}

~~~jsx {}
"filter-data": ({
    text: string,
    date:{
        start: Date | null,
        end: Date | null
    },
    time:[{
        from: number | string,
        to: number | string,
        label?: string
    }]
 }) => void;
~~~

### 매개변수 {#parameters}

`filter-data` 이벤트의 callback은 다음 매개변수를 포함하는 객체를 받을 수 있습니다:

- `text` - (선택) 검색 필드의 텍스트
- `date` - (선택) 슬롯의 시작 날짜와 종료 날짜를 포함하는 객체:
    - `start` - 슬롯 시작 날짜 (`Date | null`)
    - `end` - 슬롯 종료 날짜 (`Date | null`)
- `time` - (선택) 슬롯의 시간 옵션을 포함하는 객체 배열. 각 객체에는 다음 매개변수를 지정할 수 있습니다:
    - `from` - (필수) 슬롯의 시작 시간. 0~24 사이의 숫자로 시간을 지정하거나(예: 9는 9:00, 8.5는 8:30을 의미), "h:m" 형식의 문자열(예: "8:30")을 사용할 수 있습니다
    - `to` - (필수) 슬롯의 종료 시간. 0~24 사이의 숫자로 시간을 지정하거나(예: 9는 9:00, 8.5는 8:30을 의미), "h:m" 형식의 문자열(예: "8:30")을 사용할 수 있습니다
    - `label` - (선택) 시간 범위에 대한 플레이스홀더

### 예제 {#example}

아래 예제는 [`api.exec()`](api/internal/booking-exec.md) 메서드를 사용하여 초기화 시 필터를 적용하는 방법을 보여줍니다:

~~~jsx {6-18}
// Booking 생성
const widget = new booking.Booking("#root", {
    data,
    // 기타 구성 매개변수
});
widget.api.exec("filter-data", {
    text: "Allergist",
    date: {
        start: new Date,
        end: new Date(2025, 4, 10)
    },
    time: [
        {
            from: 12,
            to: 20
        }
    ]
});
~~~
