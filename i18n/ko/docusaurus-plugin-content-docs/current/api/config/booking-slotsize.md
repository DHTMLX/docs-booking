---
sidebar_label: slotSize
title: slotSize
description: DHTMLX JavaScript Booking 라이브러리 문서에서 slotSize에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking 무료 30일 평가판도 다운로드할 수 있습니다.
---

# slotSize

### 설명 {#description}

@short: 선택 사항. 모든 카드의 예약 슬롯 지속 시간을 정의합니다

:::note
이 값은 [`data`](api/config/booking-data.md) 속성 내의 `size` 또는 `slotSize` 파라미터에 size 값이 설정되지 않은 경우에 적용됩니다.
:::

### 사용법 {#usage}

~~~jsx {}
slotSize?: number;
~~~

### 파라미터 {#parameters}

- `number` - (선택 사항) 예약 슬롯의 지속 시간(분 단위); 기본값은 60분입니다

### 예제 {#example}

~~~jsx {}
const slotSize = 45;

new booking.Booking("#root", {
    slotSize,
    // 다른 파라미터
});
~~~

아래 스니펫은 모든 슬롯에 대해 지속 시간과 [gap](api/config/booking-slotgap.md)을 설정하는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/pw8xsl1p?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
