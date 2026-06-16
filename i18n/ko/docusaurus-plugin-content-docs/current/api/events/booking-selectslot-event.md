---
sidebar_label: select-slot
title: select-slot 이벤트
description: DHTMLX JavaScript Booking 라이브러리 문서에서 select-slot 이벤트에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험하며, DHTMLX Booking 무료 30일 평가판을 다운로드하세요.
---

# select-slot

### 설명 {#description}

@short: 슬롯을 선택할 때 발생합니다

### 사용법 {#usage}

~~~jsx {}
"select-slot": ({
    id: string | number,
    time:[ number, number ]
}) => void;
~~~

### 파라미터 {#parameters}

`select-slot` 이벤트의 callback은 다음 파라미터를 포함하는 객체를 받을 수 있습니다:

- `id` - (필수) 선택된 슬롯이 속한 카드의 ID
- `time` - (필수) 슬롯 시작 시간(밀리초)과 슬롯 지속 시간(분)으로 구성된 배열 (시작 시간은 밀리초 단위이며 로컬 벽시계 시간을 나타냅니다)

### 예제 {#example}

~~~jsx {7-10}
// Booking 생성
const widget = new booking.Booking("#root", {
    data,
    // 기타 구성 파라미터
});

// 선택된 슬롯의 id 출력
widget.api.on("select-slot", (obj) => {
    console.log(obj.id);
});
~~~
