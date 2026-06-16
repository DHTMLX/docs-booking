---
sidebar_label: select-item
title: select-item 이벤트
description: DHTMLX JavaScript Booking 라이브러리의 공식 문서에서 select-item 이벤트에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking의 무료 30일 평가판도 다운로드하실 수 있습니다.
---

# select-item

### 설명 {#description}

@short: 항목이 선택될 때 발생합니다

### 사용법 {#usage}

~~~jsx {}
"select-item": ({
    id: string|number
}) => void;
~~~

### 파라미터 {#parameters}

`select-item` 이벤트의 callback은 다음 파라미터를 포함하는 객체를 받을 수 있습니다:

- `id` - (필수) 항목의 id

### 예제 {#example}

~~~jsx {7-10}
// Booking 생성
const widget = new booking.Booking("#root", {
    data,
    // 기타 구성 파라미터
});

// 선택된 항목의 id 출력
widget.api.on("select-item", (ev) => {
    console.log(ev.id);
});
~~~
