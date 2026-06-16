---
sidebar_label: infoShape
title: infoShape
description: DHTMLX JavaScript Booking 라이브러리 문서에서 infoShape 설정에 대해 알아볼 수 있습니다. 개발자 가이드 및 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 사용해 보세요. DHTMLX Booking 무료 30일 평가판도 다운로드할 수 있습니다.
---

# infoShape

### 설명 {#description}

@short: 선택 사항. Booking 대화 상자 왼쪽에 표시되는 정보를 관리하는 설정 객체

### 사용법 {#usage}

~~~jsx {}
infoShape?: {
    preview?: boolean,
    category?: boolean,
    title?: boolean,
    price?: boolean,
    details?: boolean
};
~~~

### 매개변수 {#parameters}

객체에는 다음 매개변수가 있습니다:

- `preview` - (선택 사항) Booking 대화 상자의 정보 블록(왼쪽)에서 미리보기 이미지를 표시하거나 숨깁니다
- `category` - (선택 사항) Booking 대화 상자 왼쪽에서 카테고리 이름을 표시하거나 숨깁니다 (예: 전문가의 직종)
- `title` - (선택 사항) Booking 대화 상자의 정보 블록에서 제목을 표시하거나 숨깁니다 (예: 전문가의 이름)
- `price` - (선택 사항) Booking 대화 상자의 정보 블록에서 가격을 표시하거나 숨깁니다
- `details` - (선택 사항) Booking 대화 상자의 정보 블록에서 세부 정보를 표시하거나 숨깁니다

### 기본 설정 {#default-config}

~~~jsx {}
const defaultInfoShape = {
    preview: true,
    category: true,
    title: true,
    price: true,
    details: true
};
~~~

### 예제 {#example}

~~~jsx {}
const infoShape = {
    preview: false,
    price: false
};

new booking.Booking("#root", {
    data,
    infoShape,
    // other parameters
});
~~~

아래 스니펫은 Booking 대화 상자의 왼쪽에 표시할 항목을 구성하는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/pd6wp1xc?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
[`infoTemplate`](api/config/booking-infotemplate.md) 속성을 사용하여 Booking 대화 상자의 정보 블록에 표시할 필드를 제어할 수도 있습니다. 단, 두 속성이 모두 적용되면 `infoTemplate`이 `infoShape` 설정을 재정의합니다.
:::

**관련 문서**:

- [Booking 대화 상자 구성하기](guides/configuration.md#configure-the-booking-dialog)
- [`infoTemplate`](api/config/booking-infotemplate.md)
