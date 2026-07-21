---
sidebar_label: api.exec()
title: exec() 메서드
description: DHTMLX JavaScript Booking 라이브러리 문서에서 exec 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking의 무료 30일 평가판도 다운로드할 수 있습니다.
---

# api.exec()

### 설명 {#description}

@short: 내부 이벤트를 트리거할 수 있습니다

이 메서드는 비동기적으로 동작하며, 처리된 이벤트 config로 resolve되는 Promise를 반환합니다.

### 사용법 {#usage}

~~~jsx {}
api.exec(
    event: string,
    config: object
): Promise<any>;
~~~

### 매개변수 {#parameters}

- `event` - (필수) 실행할 이벤트
- `config` - (필수) 매개변수가 포함된 config 객체 (실행할 이벤트를 참조하세요)

### 이벤트 {#events}

:::info
Booking 내부 이벤트의 전체 목록은 [**여기**](api/overview/booking-events-overview.md)에서 확인할 수 있습니다.
:::

### 예제 {#example}

아래 예제는 초기화 시 필터를 적용하는 방법을 보여줍니다:

~~~jsx {5-19}
const widget = new booking.Booking("#root", {
    data,
    //다른 구성 매개변수
});
widget.api.exec("filter-data", {
    text: "Allergist",
    date: {
        start: new Date,
        end: new Date(2025, 2, 12)
    },
    time: [
        {
            from: 12,
            to: 20
        }
    ]
});
~~~
