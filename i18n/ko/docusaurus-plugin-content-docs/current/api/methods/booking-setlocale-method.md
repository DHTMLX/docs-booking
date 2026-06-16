---
sidebar_label: setLocale()
title: setLocale() 메서드
description: DHTMLX JavaScript Booking 라이브러리 문서에서 setLocale() 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking의 무료 30일 평가판도 다운로드할 수 있습니다.
---

# setLocale()

### 설명 {#description}

@short: Booking에 새 로케일을 적용합니다

### 사용법 {#usage}

~~~jsx
setLocale(locale?: object | null): void;
~~~

### 매개변수 {#parameters}

- `null` - (선택 사항) 기본 로케일(영어)로 초기화합니다
- `locale` - (선택 사항) 적용할 새 로케일 데이터 객체

### 예제 {#example}

~~~jsx {}
// Booking 생성
const widget = new booking.Booking("#root", {
    data,
    // 초기 구성 매개변수
});

// Booking에 "de" 로케일 적용
widget.setLocale(booking.locales.de);

// Booking에 기본 로케일 적용
widget.setLocale(); // 또는 setLocale(null);
~~~

**관련 문서**:
- [locale](api/config/booking-locale.md)
- [로컬라이제이션](guides/localization.md)
