---
sidebar_label: start
title: start
description: DHTMLX JavaScript Booking 라이브러리 문서에서 시작 날짜에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 사용해 보세요. DHTMLX Booking의 30일 무료 평가판을 다운로드할 수 있습니다.
---

# start

### 설명 {#description}

@short: 선택 사항입니다. 사용 가능한 슬롯을 표시하기 시작할 날짜를 정의합니다.

### 사용법 {#usage}

~~~jsx {}
start?: Date;
~~~

### 매개변수 {#parameters}

- `Date` - (선택 사항) 사용 가능한 슬롯을 표시하기 시작할 날짜입니다. 기본값은 현재 날짜입니다.

### 예제 {#example}

~~~jsx {}
new booking.Booking("#root", {
    data,
    start: new Date(2024, 10, 10),
    // 기타 매개변수
});
~~~

아래 스니펫은 시작 날짜와 [종료](api/config/booking-end.md) 날짜를 설정하는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/cc28whe7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
