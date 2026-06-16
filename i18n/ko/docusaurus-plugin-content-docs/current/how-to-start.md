---
sidebar_label: 시작하는 방법
title: 시작하는 방법
description: DHTMLX JavaScript Booking 라이브러리 문서에서 DHTMLX Booking 사용을 시작하는 방법을 살펴볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 탐색하고, 코드 예제와 라이브 데모를 체험하며, DHTMLX Booking의 무료 30일 평가판을 다운로드하세요.
---

# 시작하는 방법 {#how-to-start}

이 튜토리얼은 페이지에서 완전히 동작하는 Booking 애플리케이션을 구축하기 위해 필요한 단계를 안내합니다.

![main](assets/main.png)

## 1단계. 패키지 다운로드 및 설치 {#step-1-downloading-and-installing-packages}

[패키지를 다운로드](https://dhtmlx.com/docs/products/dhtmlxBooking/)한 후 프로젝트의 폴더에 압축을 해제하세요.

`yarn` 또는 `npm` 패키지 매니저를 사용하여 JavaScript Booking을 프로젝트에 가져올 수 있습니다.

#### npm 또는 yarn을 통한 트라이얼 Booking 설치 {#installing-trial-booking-via-npm-or-yarn}

:::info
Booking 트라이얼 버전을 사용하려면 트라이얼 [booking 패키지](https://dhtmlx.com/docs/products/dhtmlxBooking/)를 다운로드하고 *README* 파일에 명시된 단계를 따르세요. 트라이얼 booking은 30일 동안만 사용 가능합니다.
:::

#### npm 또는 yarn을 통한 PRO Booking 설치 {#installing-pro-booking-via-npm-or-yarn}

:::info
[Client's Area](https://dhtmlx.com/clients/)에서 **npm** 로그인 및 비밀번호를 생성하여 DHTMLX 비공개 **npm**에 직접 접근할 수 있습니다. 자세한 설치 가이드도 해당 페이지에서 확인할 수 있습니다. 비공개 **npm** 접근은 유효한 Booking 라이선스가 있는 동안에만 가능합니다.
:::

## 2단계. 소스 파일 포함 {#step-2-including-source-files}

먼저 HTML 파일을 생성하고 *index.html*로 이름을 지정합니다. 그런 다음 생성한 파일에 Booking 소스 파일을 포함시킵니다.

필요한 파일은 두 가지입니다:

- booking JS 파일
- booking CSS 파일

~~~html {5-6} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Booking</title>
        <script src="./dist/booking.js"></script>
        <link href="./dist/booking.css" rel="stylesheet">
    </head>
    <body>
        <script>
        // 여기에 코드를 작성하세요
        </script>
    </body>
</html>
~~~

:::tip
JavaScript Booking을 React, Angular 또는 Vue 프로젝트에 통합하려면 [**CodeSandbox 예제**](https://codesandbox.io/u/DHTMLX)를 참조하세요.
:::

## 3단계. booking 생성 {#step-3-creating-booking}

이제 페이지에 booking을 추가할 준비가 되었습니다. 먼저 Booking을 위한 DIV 컨테이너를 생성합니다.

~~~html {} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Booking</title>
        <script src="./dist/booking.js"></script>
        <link href="./dist/booking.css" rel="stylesheet">
    </head>
    <body>
        <div id="root"></div>
        <script>
            const widget = new booking.Booking("#root", {
                // 구성 속성
            });
        </script>
    </body>
</html>
~~~

## 4단계. Booking 구성 {#step-4-configuring-booking}

Booking을 시작하려면 먼저 초기 데이터를 제공한 후, 초기화 시 적용할 다른 구성 속성을 추가할 수 있습니다. 아래 예제는 두 개의 카드로 Booking을 생성합니다:

- [`data`](api/config/booking-data.md) 속성을 사용하면 제목, 이미지, 평점 데이터, 예약 슬롯 등 각 카드에 데이터를 추가할 수 있습니다
- [`cardShape`](api/config/booking-cardshape.md) 속성은 카드에 표시할 데이터 필드를 구성하는 데 도움이 됩니다

~~~jsx {}
const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "$35",
        review: {
            stars: 4,
            count: 120
        },
        slots: [
            {
                from: 9,
                to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10,
                to: 18,
                days: [6, 0]
            }
        ]
    },
    {
        id: "5c9b64ad-1830-4e5b-a5f9-8acea10706df",
        title: "James Anderson",
        category: "Allergist",
        subtitle: "3 years of experience",
        details: "UCLA Medical Center\n57 Westwood Plaza",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/11.jpg",
        price: "$30",
        review: {
            stars: 4,
            count: 64
        },
        slotSize: 45,
        slotGap: 10,
        slots: [
            {
                from: "9:15",
                to: 17,
                days: [1, 2, 3, 4, 5]
            }
        ]
    }
];

const cardShape = {
    review: false,
    subtitle: false,
    price: false
};

new booking.Booking("#root", {
    data,
    cardShape,
    // 기타 매개변수
});
~~~

## 다음 단계 {#whats-next}

페이지에 간단한 Booking을 생성하기 위해 필요한 모든 것이 준비되었습니다. 이제 Booking API를 살펴보세요:

- [가이드](/category/guides) 페이지에서는 설치, 데이터 로드, 스타일링 및 Booking 구성을 원활하게 진행하는 데 도움이 되는 기타 유용한 팁에 대한 지침을 제공합니다
- [API 레퍼런스](api/overview/booking-api-overview.md)는 Booking 기능에 대한 설명을 제공합니다
