---
sidebar_label: filterShape
title: filterShape
description: DHTMLX JavaScript Booking 라이브러리 문서에서 filterShape 설정에 대해 알아볼 수 있습니다. 개발자 가이드 및 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking 30일 무료 평가판도 다운로드할 수 있습니다.
---

# filterShape

### 설명 {#description}

@short: 선택 사항. 필터 기능을 관리하기 위한 설정 객체

### 사용법 {#usage}

~~~jsx {}
filterShape: {
    text?: boolean | [{
        id: string,
        label?: string,
        suggest?: boolean
    }],
    date?: boolean,
    time?: boolean | [{
        from: number | string,
        to: number | string,
        label?: string
    }],
    autoApply?: boolean
};
~~~

### Parameters {#parameters}

- `text` - (선택 사항) `true`이면 텍스트 입력 필드가 표시됩니다(기본값). `false`이면 텍스트 필드가 숨겨집니다.
  - `id` - (필수) 필터링할 카드 필드의 이름 (`data` 속성으로, 예: `category` 또는 `title`)
  - `suggest` - (선택 사항) `true`이면 자동 완성이 활성화되어 사용자 입력 텍스트와 일치하는 값([`data`](api/config/booking-data.md) 객체의 값)이 표시됩니다.
  - `label` - (선택 사항) `data` 객체 속성의 레이블. 아래 [기본 설정](#default-config)을 참조하세요.
- `date` - (선택 사항) 날짜 필드를 표시하거나 숨깁니다. 기본값은 `true`입니다(필드가 표시됨).
- `time` - (선택 사항) 시간 필드를 표시하거나 숨깁니다. `true`로 설정하면 슬롯의 기본 시간 옵션 객체 배열을 사용합니다. 각 객체에는 다음 parameters를 지정할 수 있습니다:
  - `from` - (필수) 슬롯의 시작 시간. 0에서 24 사이의 숫자로 시간을 지정하거나(예: 9는 9:00, 8.5는 8:30) "h:m" 형식의 문자열(예: "8:30")로 지정할 수 있습니다.
  - `to` - (필수) 슬롯의 종료 시간. 0에서 24 사이의 숫자로 시간을 지정하거나(예: 9는 9:00, 8.5는 8:30) "h:m" 형식의 문자열(예: "8:30")로 지정할 수 있습니다.
  - `label` - (선택 사항) 시간 필드의 placeholder
`time` parameters가 설정되지 않은 경우 기본값이 적용됩니다. 아래 [기본 설정](#default-config)을 참조하세요.
- `autoApply` - (선택 사항) `true`이면 검색 기준이 자동으로 적용됩니다(버튼 클릭 없이 검색 시작). 기본값은 `false`입니다.

### 기본 설정 {#default-config}

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

### 예제 {#example}

~~~jsx {}
const filterShape = {
    date: false,
    autoApply: true,
    time: [
        { from: 8, to: 11, label: "Morning" },
        { from: 12, to: 18, label: "Afternoon" },
        { from: 18, to: 21, label: "Evening" }
    ]
};

new booking.Booking("#root", {
    data,
    filterShape,
    // other parameters
});
~~~

아래 snippet은 필터 구성 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/b5uj78bs?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
