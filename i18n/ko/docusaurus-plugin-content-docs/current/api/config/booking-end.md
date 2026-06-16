---
sidebar_label: end
title: end
description: DHTMLX JavaScript Booking 라이브러리 문서에서 종료 날짜에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 실행해 보세요. DHTMLX Booking 30일 무료 평가판도 다운로드할 수 있습니다.
---

# end

### 설명 {#description}

@short: 선택 사항입니다. 예약 가능한 슬롯을 표시할 종료 날짜를 정의합니다

### 사용법 {#usage}

~~~jsx {}
end?: Date;
~~~

### 파라미터 {#parameters}

- `end` - (선택 사항) 예약 가능한 슬롯을 표시할 종료 날짜입니다. 기본값은 현재 날짜로부터 1년 후입니다.

### 예제 {#example}

~~~jsx {}
new booking.Booking("#root", {
    data,
    end: new Date(2025, 11, 11),
    // 기타 파라미터
});
~~~

아래 스니펫은 [시작](api/config/booking-start.md) 및 종료 날짜를 설정하는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/cc28whe7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
