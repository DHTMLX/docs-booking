---
sidebar_label: slotGap
title: slotGap
description: DHTMLX JavaScript Booking 라이브러리 문서에서 slotGap에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험하며, DHTMLX Booking의 무료 30일 평가판을 다운로드하세요.
---

# slotGap

### 설명 {#description}

@short: 선택 사항. 모든 카드의 예약 슬롯 사이의 간격을 정의합니다.

:::note
이 값은 [`data`](api/config/booking-data.md) 속성 내 `gap` 또는 `slotGap` 파라미터에 간격 값이 설정되지 않은 경우에 적용됩니다.
:::

### 사용법 {#usage}

~~~jsx {}
slotGap?: number;
~~~

### 파라미터 {#parameters}

- `number` - (선택 사항) 슬롯 사이의 간격(분 단위); 기본값은 0

### 예제 {#example}

~~~jsx {}
const slotGap = 10;

new booking.Booking("#root", {
    slotGap,
    // 다른 파라미터
});
~~~

아래 스니펫은 모든 슬롯에 대해 [지속 시간](api/config/booking-slotsize.md)과 간격을 설정하는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/pw8xsl1p?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
