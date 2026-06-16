---
sidebar_label: api.getReactiveState()
title: getReactiveState() 메서드
description: DHTMLX JavaScript Booking 라이브러리 문서에서 getReactiveState 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험하며, DHTMLX Booking 30일 무료 평가판을 다운로드하세요.
---

# api.getReactiveState()

### 설명 {#description}

@short: Booking의 반응형 속성을 담은 객체를 반환합니다

### 사용법 {#usage}

~~~jsx {}
api.getReactiveState(): object;
~~~

### 반환값 {#returns}

이 메서드는 각 필드가 해당 상태 값을 래핑하는 반응형 쓰기 가능 스토어(`IPublicWritable`)인 객체를 반환합니다. `.subscribe(callback)`을 사용하여 스토어를 구독하면 변경 사항에 반응할 수 있습니다. 기본 값은 다음과 같습니다:

~~~jsx {}
{
    data: [], // 카드 객체의 배열
    cardShape: {}, // 카드 설정 객체
    filteredData: [], // 필터링된 데이터 배열
    filterShape: {}, // 필터 설정 객체
    filterValues: {}, // 필터 값 객체 (텍스트, 날짜, 시간)
    formShape: [], // Booking 편집기 다이얼로그 설정 객체의 배열
    infoShape: {}, // Booking 편집기 왼쪽 영역 설정 객체
    selectedItem: {}, // 단일 데이터 항목
    selectedSlot: {}, // 슬롯 id와 시간이 담긴 객체 ([타임스탬프, 분 단위 지속 시간])
    slotGap: number, // 슬롯 간격 (분)
    slotSize: number, // 슬롯 크기 (분)
    start: Date, // 표시 범위의 시작 날짜
    end: Date, // 표시 범위의 종료 날짜
    renderType: "default" | "lazy" // 카드 렌더링 모드
}
~~~

### 예제 {#example}

~~~jsx {7-9,11-14}
// Booking 생성
const widget = new booking.Booking("#root", {
    data,
    //other properties
});

// Booking의 Reactive State를 가져와 콘솔에 출력
const state = widget.api.getReactiveState();
console.log(state);

// 카드 변경을 구독하고 카드 배열을 출력
state.data.subscribe((data) => {
    console.log(data);
});
~~~
