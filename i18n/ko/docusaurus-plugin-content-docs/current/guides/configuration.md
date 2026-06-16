---
sidebar_label: 구성
title: 구성
description: DHTMLX JavaScript Booking 라이브러리의 구성에 대해 문서에서 확인할 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. 또한 DHTMLX Booking의 무료 30일 평가판을 다운로드할 수 있습니다.
---

# 구성

## 카드에 데이터 불러오기 {#load-data-for-cards}

카드 객체를 Booking 구성의 [`data`](api/config/booking-data.md) 배열에 전달합니다. 전체 데이터 형식과 불러오기 시나리오에 대해서는 [데이터 불러오기](guides/loading-data.md) 가이드를 참조하세요.

## 카드 구조 정의하기 {#define-the-structure-of-cards}

각 카드의 왼쪽에는 고정된 데이터 필드 세트가 표시됩니다. 표시할 필드를 제어하거나 기본 레이아웃을 완전히 교체하려면 다음 속성 중 하나를 사용하세요:

- [`cardShape`](api/config/booking-cardshape.md) — 기본 필드의 표시 여부 전환
- [`cardTemplate`](api/config/booking-cardtemplate.md) — 기본 레이아웃을 커스텀 HTML로 교체

:::info
`cardTemplate` 속성은 커스텀 HTML을 통해 카드의 외관을 완전히 커스터마이즈하며, 레이아웃, 디자인, 콘텐츠를 완전히 제어할 수 있습니다. `cardShape` 속성은 기본 템플릿의 필드를 숨기거나 표시하는 것만 가능합니다. 두 속성을 모두 적용하면 `cardTemplate`이 `cardShape` 설정을 재정의합니다.
:::

### 기본 카드 필드 전환하기 {#toggle-default-card-fields}

카드의 왼쪽에는 기본적으로 다음 필드가 표시됩니다:

- `preview` — 카드 이미지
- `review` — 별점 수(5점 만점)와 리뷰 수를 포함한 평점 정보
- `category` — 카테고리 이름(예: 전문가의 직종)
- `title` — 카드 제목(예: 전문가의 이름)
- `subtitle` — 카드 부제목(예: 경력 상세 정보)
- `price` — 서비스 가격
- `details` — 카드의 기타 상세 정보

필드를 숨기려면 [`cardShape`](api/config/booking-cardshape.md) 속성의 해당 파라미터를 `false`로 설정합니다.

아래 예제는 카드의 `details` 필드를 숨깁니다:

~~~jsx {24}
const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Allergist",
        subtitle: "2 years of experience",
        details: "Lexington Avenue 54\nWheatfields, Hungary",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "27 $",
        review: {
        stars: 4,
        count: 120
    },
        slots: [
            {
                from: 9,
                to: 21
            }
        ]
    }
];

const cardShape = {
    details: false
};

new booking.Booking("#root", {
    data,
    cardShape,
    // 기타 파라미터
});
~~~

:::info
[snippet tool](https://snippet.dhtmlx.com/6mxd7918)에서 예제를 확인하세요.
:::

### 커스텀 카드 템플릿 적용하기 {#apply-a-custom-card-template}

[`cardTemplate`](api/config/booking-cardtemplate.md) 속성은 카드의 기본 왼쪽 블록을 커스텀 HTML로 교체합니다.

카드 객체를 받아 HTML 문자열을 반환하는 함수를 작성합니다. 카드 항목의 속성을 커스텀 스타일을 적용한 HTML 블록으로 구성합니다.

다음 코드 예제는 미리보기 이미지, 카테고리, 제목, 가격이 포함된 카드의 HTML을 반환하는 `cardPreviewTemplate`을 정의합니다:

~~~html {}
<style>
    .custom-preview {
        display: flex;
        width: 100%;
        height: 100%;
        gap: 30px;
    }

    .preview-left {
        width: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    /* 기타 스타일 */
</style>

<script>
    const { Booking, template } = booking;

    function cardPreviewTemplate({ item }) {
        return `
            <div class="custom-preview" data-action="preview-click">
                <div class="preview-left">
                    <div
                        style="background-image: url(${item.preview})"
                        class="card-photo"
                    ></div>
                    <!-- <div class="card-photo-empty" /> -->
                    </div>

                    <div class="preview-right">
                    <div class="category">${item.category}</div>
                    <div class="title">${item.title}</div>
                    <div class="price">${item.price}</div>
                </div>
            </div>
            `;
    }
</script>
~~~

`template` 헬퍼를 가져와 커스텀 함수를 `cardTemplate` 속성에 할당합니다.

다음 코드 예제는 `cardPreviewTemplate`을 Booking 구성에 연결합니다:

~~~jsx
const { Booking, template } = booking;

const widget = new Booking("#root", {
	data,
	cardTemplate: template(cardPreviewTemplate),
    // 기타 파라미터
});
~~~

:::info
[snippet tool](https://snippet.dhtmlx.com/k2v01vng)에서 예제를 확인하세요.
:::

## 카드에 슬롯 채우기 {#fill-cards-with-slots}

슬롯은 예약 가능한 시간 단위입니다. 위젯은 현재 날짜 또는 필터에서 선택한 시작 날짜부터 6일(좁은 화면에서는 4일)의 가용 슬롯을 표시합니다.

### 예약 슬롯 추가하기 {#add-slots-for-booking}

카드에 예약 슬롯을 추가하려면 [`data`](api/config/booking-data.md) 속성의 `slots` 배열에 객체를 추가합니다.

아래 예제는 화요일과 금요일 12:00~18:00에 슬롯을 추가합니다. 각 슬롯은 30분이며 슬롯 사이에 10분의 간격이 있습니다:

~~~jsx {15-22}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                from: 12,
                to: 18,
                size: 30,
                gap: 10,
                days: [2, 5]
            },
            {...}, //기타 슬롯
        ]
    }
];

new booking.Booking("#root", {
    data,
    // 기타 파라미터
});
~~~

### 슬롯 규칙 정의하기 {#define-slot-rules}

[`data`](api/config/booking-data.md) 속성의 `slots` 배열에 있는 각 객체는 다음을 지정합니다:

- 슬롯 시작 및 종료 시간
- 슬롯 크기(분 단위 지속 시간)
- 슬롯 간격(슬롯 사이의 간격)
- 규칙이 적용되는 요일 또는 날짜

카드의 모든 요일에 단일 공통 규칙을 적용하거나, 선택한 요일이나 특정 날짜에 다른 파라미터를 사용하기 위해 여러 규칙을 조합할 수 있습니다.

슬롯 크기와 간격은 다음 세 가지 우선순위 수준(높은 순서부터)으로 설정합니다:

- [`data`](api/config/booking-data.md) slots 배열의 객체 내 `size`와 `gap` — 해당 특정 슬롯 규칙에 적용
- [`data`](api/config/booking-data.md) 속성의 카드 객체 내 `slotSize`와 `slotGap` — 해당 카드의 모든 슬롯에 적용
- 위젯 수준의 [`slotSize`](api/config/booking-slotsize.md)와 [`slotGap`](api/config/booking-slotgap.md) — 모든 카드에 적용

:::info
공통 규칙과 특정 규칙을 혼합할 경우, 위젯은 다음과 같이 처리합니다:
- 특정 요일에 정의된 슬롯 파라미터는 모든 요일에 정의된 공통 파라미터를 재정의합니다.
- 날짜에 지정된 슬롯 파라미터는 특정 요일과 모든 요일에 정의된 파라미터를 재정의합니다.
- 여러 슬롯 객체가 동일한 요일을 대상으로 하는 경우, `size` 또는 `gap`이 다른 시간 범위(`from`과 `to`)는 겹치지 않아야 합니다. 그렇지 않으면 위젯이 해당 요일의 모든 슬롯 데이터를 건너뜁니다.
:::

표시되는 슬롯의 범위를 제한하려면 위젯 수준에서 [`start`](api/config/booking-start.md) 날짜와 [`end`](api/config/booking-end.md) 날짜를 설정합니다.

#### 모든 요일에 하나의 규칙 적용하기 {#apply-one-rule-to-all-days}

카드의 모든 요일에 동일한 지속 시간과 시간 범위의 슬롯을 추가하려면 `slots` 배열에 객체 하나를 추가합니다.

다음 코드 예제는 14:00~17:00, 30분 슬롯, 10분 간격으로 모든 요일에 공통 규칙을 정의합니다:

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                //모든 요일에 대한 공통 규칙
                from: 14, //슬롯 시작 시간
                to: 17, // 슬롯 종료 시간
                size: 30, // 각 슬롯 지속 시간(분)
                gap: 10 // 슬롯 사이의 간격
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // 기타 파라미터
});
~~~

#### 요일 또는 날짜별로 다른 규칙 적용하기 {#apply-different-rules-per-day-or-date}

선택한 요일이나 특정 날짜에 다른 파라미터를 사용하려면 `slots` 배열에 여러 객체를 추가하고 각 규칙에 `days` 또는 `dates` 파라미터를 설정합니다.

다음 코드 예제는 세 가지 규칙을 조합합니다 — 공통 규칙, 화요일과 금요일에 대한 요일 규칙, 수요일, 목요일 및 특정 날짜 하나에 대한 규칙:

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // 아래 나열된 요일을 제외한 모든 요일에 대한 공통 규칙
                from: 14,
                to: 17,
                size: 30,
                gap: 10
            },
            {
                // 화요일과 금요일에 적용됨(다음 규칙에 나열된 금요일 제외)
                from: 12,
                to: 17,
                size: 50,
                gap: 20,
                days: [2, 5]
            },
            {
                // 수요일, 목요일 및 특정 날짜 하나에 적용됨
                from: 18,
                to: 20,
                size: 45,
                gap: 20,
                days: [3, 4],
                dates: [ 1683234000000 ] // 2023년 5월 5일, 금요일
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // 기타 파라미터
});
~~~

위젯의 모든 슬롯에 [지속 시간](api/config/booking-slotsize.md)과 [간격](api/config/booking-slotgap.md)을 설정하는 방법은 [snippet tool을 열어](https://snippet.dhtmlx.com/pw8xsl1p) 확인하세요.

### 슬롯을 사용됨 또는 가용으로 표시하기 {#mark-slots-as-used-or-available}

[`data`](api/config/booking-data.md) 카드 객체의 두 파라미터가 사용자가 보거나 예약할 수 있는 슬롯을 제어합니다:

- `usedSlots` — 예약된 슬롯을 사용자에게 숨김
- `availableSlots` — 예약 가능한 슬롯의 명시적 목록을 표시하고 `slots` 배열 규칙을 무시

#### 슬롯을 사용됨으로 표시하기 {#mark-slots-as-used}

예약된 슬롯을 숨기려면 `usedSlots` 파라미터를 슬롯 시작 타임스탬프 배열로 설정합니다.

다음 코드 예제는 이미 예약된 슬롯 하나를 숨깁니다:

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // 모든 요일에 대한 공통 규칙
                from: 14, // 슬롯 시작 시간
                to: 17,   // 슬롯 종료 시간
                size: 30, // 슬롯 지속 시간(분)
                gap: 10   // 슬롯 사이의 간격
            }
        ],
        usedSlots: [ 1683234000000 ] // 예약된 슬롯의 타임스탬프(밀리초)
    }
];

new booking.Booking("#root", {
    data,
    // 기타 파라미터
});
~~~

#### 슬롯을 가용으로 표시하기 {#mark-slots-as-available}

예약 가능한 슬롯의 명시적 목록을 표시하려면 [`data`](api/config/booking-data.md) 속성의 `availableSlots` 파라미터를 사용합니다. `availableSlots`를 설정하면 위젯은 `slots` 배열의 모든 항목을 무시합니다.

다음 코드 예제는 두 개의 타임스탬프를 카드의 유일한 예약 가능 슬롯으로 노출합니다:

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // 모든 요일에 대한 공통 규칙
                from: 14, // 슬롯 시작 시간
                to: 17,   // 슬롯 종료 시간
                size: 30, // 슬롯 지속 시간(분)
                gap: 10   // 슬롯 사이의 간격
            }
        ],
        availableSlots: [ 1693325145000, 1693584345000 ] // 가용 슬롯의 타임스탬프(밀리초)
    }
];

new booking.Booking("#root", {
    data,
    // 기타 파라미터
});
~~~

## Booking 대화상자 구성하기 {#configure-the-booking-dialog}

Booking 대화상자에는 두 가지 구성 가능한 부분이 있습니다: 사용자가 예약 세부 정보를 입력하는 양식 필드와 왼쪽의 정보 블록입니다. 각 부분을 제어하려면 다음 속성을 사용하세요:

- [`formShape`](api/config/booking-formshape.md) — 양식 필드 구성
- [`infoShape`](api/config/booking-infoshape.md) — 정보 블록의 기본 필드 전환
- [`infoTemplate`](api/config/booking-infotemplate.md) — 정보 블록을 커스텀 HTML 템플릿으로 교체

### 양식 필드 구성하기 {#configure-form-fields}

필드 설명자 배열을 [`formShape`](api/config/booking-formshape.md) 속성에 전달합니다. 각 설명자는 필드 유형, 식별자, 레이블, 선택적 `required` 플래그를 설정합니다.

다음 코드 예제는 세 개의 양식 필드를 정의하며 `contact` 필드를 필수로 표시합니다:

~~~jsx {}
const formShape = [
    {
        comp: "text",
        key: "name",
        label: "Your name"
    },
    {
        comp: "text",
        key: "contact",
        label: "Mobile",
        required: true
    },
    {
        comp: "textarea",
        key: "description",
        label: "Details"
    }
];

new booking.Booking("#root", {
    formShape,
    // 기타 파라미터
});
~~~

:::info
[snippet tool](https://snippet.dhtmlx.com/yeqkuzx7)에서 예제를 확인하세요.
:::

### 기본 정보 필드 전환하기 {#toggle-default-information-fields}

[`infoShape`](api/config/booking-infoshape.md) 속성은 정보 블록의 기본 필드를 숨기거나 표시합니다. 필드를 `false`로 설정하면 숨길 수 있습니다.

다음 코드 예제는 정보 블록의 `details` 필드를 숨깁니다:

~~~jsx {1-7,11}
const infoShape = {
    preview: true,
    category: true,
    title: true,
    price: true,
    details: false
};

new booking.Booking("#root", {
    data,
    infoShape,
    // 기타 파라미터
});
~~~

:::info
[snippet tool](https://snippet.dhtmlx.com/pd6wp1xc)에서 예제를 확인하세요.
:::

### 커스텀 정보 템플릿 적용하기 {#apply-a-custom-information-template}

[`infoTemplate`](api/config/booking-infotemplate.md) 속성을 사용하여 기본 정보 블록을 커스텀 HTML로 완전히 교체합니다. `infoTemplate`과 `infoShape`를 모두 적용하면 `infoTemplate`이 `infoShape` 설정을 재정의합니다.

`item`(카드 객체)과 `slot`(슬롯 타임스탬프)을 받아 HTML 문자열을 반환하는 함수를 정의합니다. 카드 항목 속성을 커스텀 스타일을 적용한 HTML 블록으로 구성합니다.

다음 코드 예제는 선택한 슬롯의 사진, 제목, 카테고리, 형식화된 날짜를 렌더링하는 `cardInfoTemplate`을 정의합니다:

~~~html
<style>
	.custom-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.info-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding: 34px;
		background: rgba(128, 128, 155, 0.12);
		border-radius: 8px;
	}
    /* 기타 스타일 */
</style>

<script>
    const { Booking, template } = booking;

    function cardInfoTemplate({
        item,
        slot,
    }) {
            return `
                <div class="custom-info">
                    <div class="info-wrapper">
                        <div class="photo-wrapper">
                            ${getPhotoElement(item.preview, "info")}
                        </div>
                        <span class="info-title">${item.title}</span>
                        <span class="info-category">${item.category}</span>
                        <div class="date" data-action="reset-slot">
                            <i class="icon wxi-calendar"></i>
                            <span>${formatDate(slot, { dateFormat, timeFormat })}</span>
                        </div>
                    </div>
                </div>
            `;
        }
</script>
~~~

`template` 헬퍼를 가져와 커스텀 함수를 `infoTemplate` 속성에 할당합니다.

다음 코드 예제는 `cardInfoTemplate`을 Booking 구성에 연결합니다:

~~~jsx
const { Booking, template } = booking;

const widget = new Booking("#root", {
    data,
    infoTemplate: template(cardInfoTemplate),
    // 기타 파라미터
});
~~~

:::info
[snippet tool](https://snippet.dhtmlx.com/byb94ipu)에서 예제를 확인하세요.
:::

## 필터 구성하기 {#configure-the-filter}

[`filterShape`](api/config/booking-filtershape.md) 속성을 사용하여 표시할 필터 입력과 각 동작 방식을 제어합니다. 기본 구성은 세 개의 텍스트 필드, 날짜 선택기, 세 개의 시간 범위를 활성화합니다:

~~~jsx {}
const defaultTimeRanges = [
    { from: 8, to: 12, label: "Morning" },
    { from: 12, to: 17, label: "Afternoon" },
    { from: 17, to: 20, label: "Evening" }
];

const defaultFilterShape = {
    text: [
        { id: "category", label: "speciality", suggest: true },
        { id: "title", label: "specialist", suggest: true },
        { id: "details", label: "location" }
    ],
    date: true,
    time: defaultTimeRanges,
    autoApply: false
};
~~~

### 필터 입력 필드 숨기기 {#hide-filter-input-fields}

위젯은 기본적으로 모든 입력 필드(텍스트, 시간, 날짜)를 표시합니다. 필드를 숨기려면 [`filterShape`](api/config/booking-filtershape.md) 속성의 해당 파라미터를 `false`로 설정합니다.

다음 코드 예제는 날짜 필터를 숨깁니다:

~~~jsx {}
const filterShape = {
    date: false,
};

new booking.Booking("#root", {
    data,
    filterShape,
    // 기타 파라미터
});
~~~

### 텍스트 필터 필드 구성하기 {#configure-text-filter-fields}

텍스트 필드에서 자동 완성을 활성화하려면 `suggest` 파라미터를 `true`로 설정합니다. 그러면 위젯이 [`data`](api/config/booking-data.md) 배열에서 사용자 입력과 일치하는 값을 표시합니다. `label` 파라미터를 사용하여 플레이스홀더를 추가합니다.

다음 코드 예제는 세 개의 텍스트 필드에 자동 완성과 커스텀 레이블을 활성화합니다:

~~~jsx {}
const filterShape = {
    text: [
        { id: "category", label: "specialization", suggest: true },
        { id: "title", label: "doctor", suggest: true },
        { id: "details", label: "location", suggest: true }
    ],
};

new booking.Booking("#root", {
    data,
    filterShape,
    // 기타 파라미터
});
~~~

### 시간 범위 구성하기 {#configure-time-ranges}

시간 필터링 옵션을 정의하려면 [`filterShape`](api/config/booking-filtershape.md) 속성의 `time` 파라미터에 객체 배열을 전달합니다. 각 객체는 다음 키를 허용합니다:

- `from` — 슬롯 시작 시간, 0~24의 숫자(예: `9`는 9:00, `8.5`는 8:30) 또는 `"h:m"` 형식의 문자열(예: `"8:30"`)
- `to` — 슬롯 종료 시간, `from`과 동일한 형식
- `label` — 시간 범위의 플레이스홀더

다음 코드 예제는 커스텀 레이블이 있는 네 개의 시간 범위를 정의합니다:

~~~jsx {}
const filterShape = {
    time: [
        { from: "8:30", to: "11:50", label: "Morning" },
        { from: "12:30", to: "16:50", label: "Afternoon" },
        { from: "17:00", to: "19:50", label: "Evening" },
        { from: "20:00", to: "22:50", label: "Urgent" }
    ]
};

new booking.Booking("#root", {
    data,
    filterShape,
    // 기타 파라미터
});
~~~

### autoApply 모드 활성화하기 {#enable-autoapply-mode}

**Search** 버튼을 숨기고 필터 입력을 즉시 적용하려면 [`filterShape`](api/config/booking-filtershape.md) 속성의 `autoApply` 파라미터를 `true`로 설정합니다.

다음 코드 예제는 필터에 대한 auto-apply를 활성화합니다:

~~~jsx {}
const filterShape = {
    autoApply: true,
};

new booking.Booking("#root", {
    data,
    filterShape,
    // 기타 파라미터
});
~~~

### 필터 예제 {#filter-example}

아래 snippet은 완전한 필터 구성을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/b5uj78bs?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

## 대용량 데이터셋의 렌더링 최적화하기 {#optimize-rendering-of-large-datasets}

Booking 위젯은 기본적으로 불러온 모든 카드를 렌더링합니다. 대용량 데이터셋의 경우 지연 렌더링을 활성화하면 위젯이 보이는 카드만 렌더링합니다. [`renderType`](api/config/booking-rendertype.md) 속성을 사용하여 모드를 전환합니다.

다음 코드 예제는 카드의 지연 렌더링을 활성화합니다:

~~~jsx {}
new booking.Booking("#root", {
    data,
    renderType: "lazy",
    // 기타 파라미터
});
~~~
