---
sidebar_label: api.on()
title: on() 메서드
description: DHTMLX JavaScript Booking 라이브러리의 on 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking 무료 30일 평가판도 다운로드할 수 있습니다.
---

# api.on()

### 설명 {#description}

@short: 내부 이벤트에 핸들러를 연결할 수 있습니다

### 사용법 {#usage}

~~~jsx {}
api.on(
    event: string,
    handler: function,
    config?: { tag?: number | string }
): void;
~~~

### 파라미터 {#parameters}

- `event` - (필수) 실행될 이벤트
- `handler` - (필수) 연결할 핸들러 (핸들러 인수는 실행되는 이벤트에 따라 달라집니다)
- `config` - (선택) 핸들러에 대한 추가 설정 객체:
  - `tag` - (선택) 핸들러를 식별하는 태그로, 이후 [`api.detach()`](api/internal/booking-detach.md) 메서드를 통해 핸들러를 제거할 때 사용합니다

:::info
Booking 내부 이벤트의 전체 목록은 [**여기**](api/overview/booking-events-overview.md)에서 확인할 수 있습니다.
액션을 수정하지 않고 감지만 하려면 `api.on()` 메서드를 사용하세요. 액션을 변경하려면 [`api.intercept()`](api/internal/booking-intercept.md) 메서드를 사용하세요.
:::

### 예제 {#example}

~~~jsx {7-10}
// Booking 생성
const widget = new booking.Booking("#root", {
    data,
    // 기타 구성 파라미터
});

// 선택된 슬롯 id와 시간을 출력
widget.api.on("select-slot", (obj) => {
    console.log("The selected slot", obj.id, "and time", obj.time);
});
~~~
