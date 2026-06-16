---
sidebar_label: api.getState()
title: getState() 메서드
description: DHTMLX JavaScript Booking 라이브러리 문서에서 getState 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 사용해 보세요. DHTMLX Booking의 무료 30일 평가판을 다운로드할 수도 있습니다.
---

# api.getState()

### 설명 {#description}

@short: Booking의 StateStore 속성이 담긴 객체를 반환합니다

### 사용법 {#usage}

~~~jsx {}
api.getState(): object;
~~~

### 반환값 {#returns}

이 메서드는 다음과 같은 state 필드를 포함하는 객체를 반환합니다:

~~~jsx {}
{
    data: [], // 카드 객체 배열
    cardShape: {}, // 카드 설정 객체
    filteredData: [], // 필터링된 데이터 배열
    filterShape: {}, // 필터 설정 객체
    filterValues: {}, // 필터 값 객체 (텍스트, 날짜, 시간)
    formShape: [], // Booking 편집기 대화상자 설정 객체 배열
    infoShape: {}, // Booking 편집기 좌측 영역 설정 객체
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

~~~jsx {7-11}
// Booking 생성
const widget = new booking.Booking("#root", {
    data,
    cardShape
});

// Booking의 State를 가져와 콘솔에 출력
const state = widget.api.getState();
console.log(state);
~~~
