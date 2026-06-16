---
sidebar_label: 데이터 로드
title: 데이터 로드
description: DHTMLX JavaScript Booking 라이브러리 문서에서 Booking에 데이터를 로드하는 방법을 확인할 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 사용해 보세요. DHTMLX Booking 30일 무료 평가판도 다운로드할 수 있습니다.
---

# 데이터 로드 {#loading-data}

Booking 위젯은 구성 객체를 통해 하나의 데이터 배열을 받습니다:

- [`data`](api/config/booking-data.md) — 슬롯 규칙이 포함된 카드 객체 배열

:::tip
대용량 데이터셋의 경우, [`renderType`](api/config/booking-rendertype.md) 속성을 사용하여 지연 렌더링을 활성화하면 위젯이 보이는 카드만 렌더링합니다.
:::

## 샘플 데이터셋 준비 {#prepare-a-sample-dataset}

카드 데이터를 별도 파일에 보관하면 페이지와 테스트 전반에서 데이터셋을 공유할 수 있습니다. 각 카드 객체에는 식별 필드, 표시 필드, 그리고 가용성 규칙을 정의하는 `slots` 배열이 포함됩니다.

아래 코드 스니펫은 *data.js* 모듈에 세 개의 카드 객체를 정의합니다. `getDate(addDays, hours, minutes)` 헬퍼는 오늘을 기준으로 한 날짜의 타임스탬프를 반환합니다(예: `getDate(0, 12)`는 현지 시간으로 오늘 12:00):

~~~jsx title="data.js"
// "오늘 + addDays"의 지정된 hours:minutes(현지 시간)에 대한 타임스탬프를 반환합니다
function getDate(addDays, hours = 0, minutes = 0) {
    const date = new Date();
    date.setDate(date.getDate() + addDays);
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
}

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
                from: 9, to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10, to: 18,
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
                from: "9:15", to: 17,
                days: [1, 2, 3, 4, 5]
            }
        ]
    },
    {
        id: "9b037564-77be-429f-b719-eebbe499027a",
        title: "Emma Johnson",
        category: "Cardiologist",
        subtitle: "2 years of experience",
        details: "Stanford Health Care\n1468 Madison Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/03.jpg",
        price: "$25",
        review: {
            stars: 5,
            count: 10
        },
        slots: [
            {
                from: 14, to: 17,
                size: 30, gap: 10
            },
            {
                from: 12, to: 19,
                size: 50, gap: 20,
                days: [2], dates: [getDate(0)]
            },
            {
                from: "18:30", to: 20,
                size: 20, gap: 20,
                days: [3, 4, 5]
            },
        ],
        usedSlots: [getDate(0, 12), getDate(0, 18)]
    }
];
~~~

## 로컬 파일에서 데이터 로드 {#load-data-from-a-local-file}

헬퍼 함수를 통해 데이터셋을 노출하여 별도의 JavaScript 파일에서 카드 데이터를 로드합니다.

아래 코드 스니펫은 `data`와 `cardShape` 구성을 모두 반환하는 `getData()`를 정의합니다:

~~~jsx {}
function getData() {
    return {
        data,
        cardShape
    };
}

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
                from: 9, to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10, to: 18,
                days: [6, 0]
            }
        ]
    },
    // 다른 카드들
];

const cardShape = {
    preview: true,
    review: true,
    category: true,
    title: true,
    subtitle: true,
    price: true,
    details: true
};
~~~

Booking 소스 파일 다음에 데이터 파일을 페이지에 포함합니다.

아래 코드 스니펫은 *data.js* 모듈을 *index.html*에 연결합니다:

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>
<link rel="stylesheet" href="./dist/booking.css">

<script src="./common/data.js"></script>
~~~

`getData()`가 반환한 데이터셋을 Booking 생성자에 전달합니다.

아래 코드 스니펫은 로드된 데이터로 Booking 인스턴스를 생성합니다:

~~~jsx {}
const { data } = getData();
const widget = new booking.Booking("#root", { data });
~~~

## 초기화 이후 데이터 업데이트 {#update-data-after-initialization}

Booking이 초기화된 후 데이터셋을 교체하려면, 새로운 `data` 배열과 함께 [`setConfig()`](api/methods/booking-setconfig-method.md) 메서드를 호출합니다. 이 메서드는 병합된 구성으로 위젯을 재초기화합니다.

아래 코드 스니펫은 서버에서 새로운 데이터셋을 가져와 기존 Booking 인스턴스에 적용합니다:

~~~jsx {}
fetch("/api/cards")
    .then(res => res.json())
    .then(data => {
        widget.setConfig({ data });
    });
~~~

예약의 서버 측 저장에 대해서는 [서버에 예약 저장](guides/saving-reservations.md) 가이드를 참조하세요.

---

**관련 문서**:

- [`confirm-slot`](api/events/booking-confirmslot-event.md) — 슬롯 예약 확인 처리
- [`setConfig()`](api/methods/booking-setconfig-method.md) — 초기화 이후 위젯 구성 업데이트
- [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) — 슬롯 확인 핸들러 정의
- [`renderType`](api/config/booking-rendertype.md) — 기본 렌더링과 지연 렌더링 간 전환
- [서버에 예약 저장](guides/saving-reservations.md) — 서버 측 예약 저장
