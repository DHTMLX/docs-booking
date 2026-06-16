---
sidebar_label: 초기화
title: 초기화
description: DHTMLX JavaScript Booking 라이브러리 문서에서 초기화에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험하며, DHTMLX Booking의 무료 30일 평가판을 다운로드하세요.
---

# 초기화 {#initialization}

이 가이드는 페이지에 Booking 인스턴스를 생성하는 과정을 안내합니다. 다음 단계를 따라 컴포넌트를 사용할 수 있도록 준비하세요:

1. [Booking 소스 파일 포함](#include-source-files).
2. [컨테이너 생성](#create-a-container).
3. [생성자로 Booking 초기화](#initialize-booking).

## 소스 파일 포함 {#include-source-files}

Booking 위젯은 페이지에 로드하는 두 개의 파일로 제공됩니다.

[패키지를 다운로드](https://dhtmlx.com/docs/products/dhtmlxBooking/)하여 프로젝트 폴더에 압축을 해제하세요. 페이지에 다음 파일을 추가합니다:

- *booking.js* — Booking 소스 코드
- *booking.css* — Booking 스타일시트

소스 파일에 대한 올바른 상대 경로를 설정하세요.

다음 코드 스니펫은 *dist/* 폴더에서 Booking 파일을 포함합니다:

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>
<link rel="stylesheet" href="./dist/booking.css">
~~~

## 컨테이너 생성 {#create-a-container}

Booking 위젯을 호스팅할 HTML 요소를 추가하고 ID를 지정합니다. 예를 들어 *root*로 설정합니다.

다음 코드 스니펫은 ID가 *root*인 컨테이너를 생성합니다:

~~~jsx title="index.html"
<div id="root"></div>
~~~

## Booking 초기화 {#initialize-booking}

두 개의 매개변수를 사용하여 `booking.Booking` 생성자를 호출합니다:

- container — 위젯을 호스팅하는 HTML 컨테이너의 선택자 또는 ID
- config — 구성 속성을 포함하는 객체 ([구성 속성](#configuration-properties) 참조)

다음 코드 스니펫은 `#root` 컨테이너 안에 Booking을 초기화합니다:

~~~jsx title="index.html"
// Booking 생성
new booking.Booking("#root", {
    // 구성 속성
});
~~~

### 구성 속성 {#configuration-properties}

:::info
Booking을 구성하는 데 사용되는 전체 속성 목록은 [속성 개요](api/overview/booking-properties-overview.md)를 참조하세요.
:::

## 예제 {#example}

아래 스니펫은 초기 속성 세트와 함께 Booking을 초기화합니다:

<iframe src="https://snippet.dhtmlx.com/6it4ohez?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
