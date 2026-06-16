---
sidebar_label: data
title: data
description: DHTMLX JavaScript Booking 라이브러리의 문서에서 cards config에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking의 무료 30일 평가판도 다운로드하실 수 있습니다.
---

# data

### 설명 {#description}

@short: 선택 사항. 카드 데이터를 포함하는 객체 배열

### 사용법 {#usage}

~~~jsx {}
data: [
    {
        id: string | number,
        title: string,
        category?: string,
        subtitle?: string,
        details?: string,
        preview?: string, // 이미지 링크
        price?: string,
        review?: {
            stars: number,
            count: number
        },
        slots?: [
            {
                from: number | string, // 0~24시간
                to: number | string, // 0~24시간
                size?: number, // 슬롯 길이(분 단위)
                gap?: number, // 슬롯 간격(분 단위)
                days?: array, // 규칙을 적용할 요일(0~6)
                dates?: array, // 규칙을 적용할 정확한 날짜(타임스탬프)
            }
        ],
        availableSlots?: [number, number][], // 각 슬롯: [타임스탬프, 슬롯 지속 시간(분 단위)]
        usedSlots?: number[], // 타임스탬프
        slotSize?: number, // 분 단위
        slotGap?: number // 분 단위
    }
];
~~~

### 파라미터 {#parameters}

각 카드 객체에 대해 다음 파라미터를 지정할 수 있습니다:

- `id` - (필수) 카드의 ID
- `title` - (필수) 카드의 제목 (예: 전문가 이름)
- `category` - (선택) 카드의 카테고리 이름 (예: 전문가의 직종)
- `subtitle` - (선택) 카드의 부제목
- `details` - (선택) 카드의 기타 세부 정보
- `preview` - (선택) 카드 이미지 링크인 카드 미리보기
- `price` - (선택) 서비스 가격
- `review` - (선택) 다음 파라미터를 포함하는 평점 정보:
  - `stars` - (선택) 평점 별 수 (5점 만점)
  - `count` - (선택) 리뷰 수
- `slots` - (선택) 슬롯 규칙을 정의하는 객체 배열 (예약 가능한 시간을 표시하려면 `slots` 또는 `availableSlots` 중 하나를 제공해야 합니다); 각 슬롯 객체에는 다음 파라미터가 있습니다:
  - `from` - (필수) 슬롯 시작 시간(0~24시간)
  - `to` - (필수) 슬롯 종료 시간(0~24시간)
  - `size` - (선택) 슬롯 하나의 지속 시간(분 단위)
  - `gap` - (선택) 슬롯 간격(분 단위); 기본값은 0
  - `days` - (선택) 슬롯을 예약할 수 있는 요일; 가능한 값: 0(일요일)~6(토요일); 요일을 지정하지 않으면 기본적으로 모든 요일에 적용됩니다; 요일을 지정하면 해당 요일에 정의된 슬롯 파라미터(`to`, `from`, `size`, `gap`)가 적용됩니다
  - `dates` - (선택) 슬롯을 사용할 수 있는 정확한 날짜를 나타내는 밀리초 단위 타임스탬프 배열; 지정된 날짜에 대해 슬롯 파라미터(`to`, `from`, `size`, `gap`)가 적용됩니다 (타임스탬프는 밀리초 단위이며 로컬 시간을 나타내야 합니다)

:::note
요일에 지정된 슬롯 파라미터는 모든 요일에 정의된 공통 파라미터를 재정의합니다.
날짜에 지정된 슬롯 파라미터는 특정 요일 및 모든 요일에 정의된 파라미터를 재정의합니다.
같은 날을 대상으로 하는 여러 슬롯 객체에 `size` 또는 `gap`이 다를 경우, 시간 범위(`from`–`to`)가 겹치지 않아야 합니다. 범위가 겹치면 위젯이 해당 날의 모든 슬롯을 건너뜁니다.
:::

- `availableSlots` - (선택) 사용 가능한 슬롯 배열; 각 슬롯은 `[타임스탬프, 지속시간]` 배열로, 타임스탬프는 밀리초 단위(로컬 시간 기준)이며 지속시간은 슬롯 길이(분 단위)입니다; 여기서 사용 가능한 슬롯을 지정하면 `slots` 배열의 모든 슬롯은 무시됩니다 (즉, 예약 불가 상태가 됩니다)
- `usedSlots` - (선택) 예약된 슬롯의 밀리초 단위 타임스탬프 배열 (타임스탬프는 밀리초 단위이며 로컬 시간을 나타내야 합니다)
- `slotSize` - (선택) 슬롯 지속 시간(분 단위); `slots` 객체 내에 다른 값이 설정되지 않은 경우 이 카드의 모든 슬롯에 적용됩니다; 기본값은 *60*분
- `slotGap` - (선택) 현재 카드의 모든 슬롯에 설정되는 슬롯 간격(분 단위); `slots` 객체 내에 다른 값이 지정되지 않은 경우 이 값이 적용됩니다; 기본값은 0

### 예제 {#example}

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Debra Weeks",
        category: "Allergist",
        subtitle: "7 years of experience",
        details:
                "Silverstone Medical Center (Vanderbilt Avenue 13, Chestnut, New Zealand)",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // 아래 days 및 dates에 지정된 날짜를 제외한 모든 날에 적용되는 공통 슬롯 규칙
                from: 14,
                to: 17,
                size: 30,
                gap: 10
            },
            {
                // 이 규칙은 요일 2와 5(화요일과 금요일)에 적용되며,
                // 아래 슬롯 객체에 지정된 금요일은 제외됩니다
                from: 12,
                to: 17,
                size: 50,
                gap: 20,
                days: [2, 5]
            },
            {
                // 이 규칙은 요일 3과 4(수요일과 목요일) 및 정확한 날짜에 적용됩니다
                from: 18,
                to: 20,
                size: 45,
                gap: 20,
                days: [3, 4],
                dates: [ 1683234000000 ] // 정확한 예정 날짜 (2023년 5월 5일 금요일)
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // 기타 파라미터
});
~~~

**관련 문서**: [슬롯 규칙 정의](guides/configuration.md#define-slot-rules)
