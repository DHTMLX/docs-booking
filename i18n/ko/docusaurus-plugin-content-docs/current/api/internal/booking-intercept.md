---
sidebar_label: api.intercept()
title: intercept() 메서드
description: DHTMLX JavaScript Booking 라이브러리 문서에서 intercept 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking의 무료 30일 평가판을 다운로드하실 수 있습니다.
---

# api.intercept()

### 설명 {#description}

@short: 내부 이벤트를 가로채거나 방지할 수 있습니다

### 사용법 {#usage}

~~~jsx {}
api.intercept(
    event: string,
    callback: function,
    config?: { tag?: number | string }
): void;
~~~

### 파라미터 {#parameters}

- `event` - (필수) 발생시킬 이벤트
- `callback` - (필수) 실행할 callback (callback 인수는 발생하는 이벤트에 따라 달라집니다)
- `config` - (선택) callback에 대한 추가 설정 객체:
  - `tag` - (선택) callback을 식별하는 태그로, 나중에 [`api.detach()`](api/internal/booking-detach.md) 메서드를 통해 제거할 수 있습니다

:::info
Booking 내부 이벤트의 전체 목록은 [**여기**](api/overview/booking-events-overview.md)에서 확인할 수 있습니다.
액션을 수정하지 않고 수신만 하려면 [`api.on()`](api/internal/booking-on.md) 메서드를 사용하세요. 액션을 변경하려면 `api.intercept()` 메서드를 사용하세요.
:::

### 예제 {#example}

~~~jsx {7-11}
// Booking 생성
const widget = new booking.Booking("#root", {
    data,
    // 기타 구성 파라미터
});

// filter-data 이벤트가 발생할 때마다 오전 시간대의 슬롯만 표시합니다
widget.api.intercept("filter-data", data => {
    data.time = [{ from: 9, to: 12 }];
});
~~~
