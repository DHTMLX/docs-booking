---
sidebar_label: serialize()
title: serialize() 메서드
description: DHTMLX JavaScript Booking 라이브러리 문서에서 serialize() 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 실행해 보세요. DHTMLX Booking 무료 30일 평가판도 다운로드하실 수 있습니다.
---

# serialize()

### 설명 {#description}

@short: Booking 데이터를 JSON 배열로 직렬화합니다

### 사용법 {#usage}

~~~jsx
serialize(): object[];
~~~

### 반환값 {#returns}

[데이터](api/config/booking-data.md) 배열을 반환합니다.

### 예제 {#example}

~~~jsx {}
// Booking 생성
const widget = new booking.Booking("#root", {
    data,
    // configuration parameters
});

console.log(widget.serialize());
~~~
