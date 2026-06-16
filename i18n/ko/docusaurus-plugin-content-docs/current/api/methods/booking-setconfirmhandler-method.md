---
sidebar_label: setConfirmHandler()
title: setConfirmHandler() 메서드
description: DHTMLX JavaScript Booking 라이브러리 문서에서 setConfirmHandler() 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 체험해 보세요. DHTMLX Booking의 무료 30일 평가판도 다운로드할 수 있습니다.
---

# setConfirmHandler()

### 설명 {#description}

@short: confirm-slot 이벤트에 대한 핸들러를 등록합니다

### 사용법 {#usage}

~~~jsx
setConfirmHandler(confirmHandler: (ev) => any): void;
~~~

### 매개변수 {#parameters}

이 메서드는 슬롯 예약을 확정할 때 호출될 `confirmHandler` 함수를 인수로 받습니다. 해당 함수는 [`confirm-slot`](api/events/booking-confirmslot-event.md) 이벤트와 동일한 객체를 매개변수로 받습니다.

### 예제 {#example}

~~~jsx {}
const { data } = getData();
const widget = new booking.Booking("#root", {
    data
});

widget.setConfirmHandler((ev) => {
    console.log("Booking info:", ev);
});
~~~

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**관련 문서**: [서버에 예약 저장하기](guides/saving-reservations.md)
