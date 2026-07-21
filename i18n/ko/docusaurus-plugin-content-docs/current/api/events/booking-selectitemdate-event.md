---
sidebar_label: select-item-date
title: select-item-date 이벤트
description: DHTMLX JavaScript Booking 라이브러리의 문서에서 select-item-date 이벤트에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 사용해 보세요. DHTMLX Booking의 무료 30일 평가판을 다운로드할 수도 있습니다.
---

# select-item-date

### 설명 {#description}

@short: 항목에 대한 날짜가 선택될 때 발생합니다

### 사용법 {#usage}

~~~jsx {}
"select-item-date": ({
    id: string|number,
    date: number
}) => void;
~~~

### 매개변수 {#parameters}

`select-item-date` 이벤트의 callback은 다음 매개변수를 포함하는 객체를 받을 수 있습니다:

- `id` - (필수) 항목의 id
- `date` - (필수) 선택된 항목에 설정된 날짜 (밀리초 단위)

### 예제 {#example}

~~~jsx {7-10}
// Booking 생성
const widget = new booking.Booking("#root", {
    data,
    // 기타 구성 매개변수
});

// 날짜 출력
widget.api.on("select-item-date", (ev) => {
    console.log(ev.date);
});
~~~
