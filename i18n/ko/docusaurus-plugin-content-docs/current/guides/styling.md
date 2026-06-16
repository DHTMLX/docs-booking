---
sidebar_label: 스타일링
title: 스타일링
description: DHTMLX JavaScript Booking 라이브러리 문서에서 스타일링에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking의 무료 30일 평가판을 다운로드할 수 있습니다.
---

# 스타일링 {#styling}

CSS 커스텀 속성을 통해 Booking 위젯을 커스터마이즈합니다. 위젯은 `--wx-booking-*` 네임스페이스 아래에 Booking 전용 레이아웃 토큰을 노출하며, `--wx-*` 네임스페이스 아래에 일반 디자인 토큰(색상, 테두리, 타이포그래피)을 공유합니다.

## 기본 스타일 {#default-style}

Booking 위젯은 레이아웃 치수와 공유 테마 토큰에 CSS 커스텀 속성을 사용합니다. 이러한 변수를 자신의 CSS에서 재정의하여 외관을 커스터마이즈할 수 있습니다.

다음 코드 스니펫은 위젯이 노출하는 Booking 전용 변수의 일부를 보여줍니다(데스크톱 값으로 표시되며, 위젯은 내부적으로 화면 크기에 따라 일부 값을 재정의합니다 — 데스크톱, 태블릿, 모바일):

~~~css
.wx-booking {
    --wx-booking-content-min-width: 984px;
    --wx-booking-content-max-width: 1132px;
    --wx-booking-content-padding: 0 var(--wx-booking-content-h-padding) 28px;
    --wx-booking-slots-width: 602px;
    --wx-booking-slots-padding: 0 30px 0 50px;
    --wx-booking-separator: var(--wx-border);
}
~~~

:::tip 참고
Booking의 이후 버전에서는 변수 이름이 변경될 수 있습니다. 최신 버전으로 업데이트한 후 이름을 확인하고, 표시 문제가 발생하지 않도록 코드를 조정하세요.
:::

## 기본 제공 테마 적용 {#apply-the-built-in-theme}

위젯은 Material 테마라는 하나의 기본 제공 테마를 제공합니다.

위젯 컨테이너에 해당 CSS 클래스를 추가하여 테마를 적용합니다.

다음 코드 스니펫은 Booking 컨테이너에 Material 테마를 적용합니다:

~~~html {}
<!-- Booking 컨테이너 -->
<div id="root" class="wx-material-theme"></div>
~~~

skins 폴더에서 테마 스타일시트를 불러오려면, 페이지에 link 태그를 추가합니다.

다음 코드 스니펫은 Material 테마 스타일시트를 포함합니다:

~~~html {}
<link rel="stylesheet" href="path/to/booking/skins/material.css"/>
~~~

## 기본 제공 테마 커스터마이즈 {#customize-the-built-in-theme}

`.wx-material-theme` 선택자 아래에서 Material 테마 변수를 재정의합니다.

다음 코드 스니펫은 어두운 레이아웃을 위해 Material 테마의 색상을 변경합니다:

~~~html
<style>
    .wx-material-theme {
        color-scheme: dark;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-icon-color-hover: rgba(255, 255, 255, 0.2);
        --wx-background: #949393;
        --wx-booking-background: #c0bbbb;
        --wx-background-alt: #a5a3a3;
        --wx-booking-content-background: #a3a1a1;
        --wx-border: 1px solid #818080;
        --wx-border-medium: 1px solid #9e9e9e;
        --wx-input-background: #d6d3d3;
    }
</style>
~~~

## 커스텀 스타일 적용 {#apply-custom-styles}

프로젝트 디자인에 맞추려면, Booking 컨테이너의 커스텀 클래스 아래에 CSS 변수를 범위 지정합니다.

다음 코드 스니펫은 `.demo` 컨테이너에 대한 커스텀 팔레트를 정의합니다:

~~~html
<div id="root" class="demo"></div>
<style>
    .demo {
        --wx-background: #c4c7e0;
        --wx-color-font: rgba(12, 12, 116, 0.9);
        --wx-color-secondary-font: rgba(34, 33, 33, 0.904);
        --wx-icon-color: rgba(149, 179, 223, 0.7);
        --wx-booking-primary-hover: #194e9e;
        --wx-booking-border-color: 1px solid #818080;
        --wx-border: 1px dashed #818080;
    }
</style>
~~~

다음 코드 스니펫은 카드와 날짜 항목의 배경색을 변경합니다:

~~~html
<style>
    .demo {
        .wx-booking .wx-list > .wx-card,
        .wx-booking .wx-slot-dates > .wx-date-item {
            background-color: #e8f3f7;
        }

        .wx-booking .wx-slot-dates > .wx-date-item.wx-selected {
            background-color: #bfdde7;
        }
    }
</style>
~~~

## 예제 {#example}

아래 스니펫은 커스텀 Booking 스타일을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/d7w3jtqz?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
