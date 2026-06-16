---
sidebar_label: locale
title: locale
description: DHTMLX JavaScript Booking 라이브러리 문서에서 locale에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 탐색하고, 코드 예제와 라이브 데모를 사용해 보세요. DHTMLX Booking의 무료 30일 평가판도 다운로드할 수 있습니다.
---

# locale

### 설명 {#description}

@short: 선택 사항. Booking의 커스텀 로케일 객체

### 사용법 {#usage}

~~~jsx
locale?: object;
~~~

### 기본 설정 {#default-config}

기본적으로 Booking은 [영어](guides/localization.md#default-locale) 로케일을 사용합니다. 커스텀 로케일로 변경할 수도 있습니다.

:::tip
현재 로케일을 동적으로 변경하려면 [`setLocale()`](api/methods/booking-setlocale-method.md) 메서드를 사용할 수 있습니다.
:::

### 예제 {#example}

~~~jsx
const { data } = getData();
const widget = new booking.Booking("#root", {
    data,
    locale: booking.locales.de
});
~~~

**관련 문서**:
- [setLocale()](api/methods/booking-setlocale-method.md)
- [지역화](guides/localization.md)
