---
sidebar_label: cardShape
title: cardShape
description: DHTMLX JavaScript Booking 라이브러리 문서에서 cardShape 설정에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 실행해 보세요. DHTMLX Booking 30일 무료 평가판도 다운로드할 수 있습니다.
---

# cardShape

### 설명 {#description}

@short: 선택 사항. 각 카드 왼쪽에 표시되는 정보를 관리하는 설정 객체

### 사용법 {#usage}

~~~jsx {}
cardShape?: {
    category?: boolean,
    details?: boolean,
    preview?: boolean,
    price?: boolean,
    review?: boolean,
    subtitle?: boolean,
    title?: boolean
};
~~~

### Parameters {#parameters}

`cardShape` 객체에서 다음 parameters(필드)를 지정할 수 있습니다:

- `category` - (선택 사항) 카테고리 이름 표시/숨김
- `details` - (선택 사항) 세부 정보 표시/숨김
- `preview` - (선택 사항) 미리보기 이미지 표시/숨김
- `price` - (선택 사항) 가격 표시/숨김
- `review` - (선택 사항) 평점 정보 표시/숨김
- `subtitle` - (선택 사항) 카드 부제목 표시/숨김
- `title` - (선택 사항) 카드 제목 표시/숨김

### 기본 설정 {#default-config}

~~~jsx {}
const defaultCardShape = {
    category: true,
    details: true,
    preview: true,
    price: true,
    review: true,
    subtitle: true,
    title: true
};
~~~

### 예제 {#example}

~~~jsx {}
const cardShape = {
    review: false,
    subtitle: false,
    price: false
};

new booking.Booking("#root", {
    cardShape,
    // 기타 parameters
});
~~~

아래 스니펫은 카드 왼쪽에 표시할 필드를 구성하는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/6mxd7918?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
[`cardTemplate`](api/config/booking-cardtemplate.md) 속성을 사용하여 카드의 외관을 구성할 수도 있습니다. `cardTemplate`과 `cardShape`이 모두 적용된 경우, `cardTemplate`이 `cardShape` 설정을 재정의합니다.
:::

**관련 문서**:

- [카드 구조 정의하기](guides/configuration.md#define-the-structure-of-cards)
- [`cardTemplate`](api/config/booking-cardtemplate.md)
