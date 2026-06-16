---
sidebar_label: setConfig()
title: setConfig() 메서드
description: DHTMLX JavaScript Booking 라이브러리 문서에서 setConfig() 메서드에 대해 알아볼 수 있습니다. 개발자 가이드 및 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking 30일 무료 평가판을 다운로드할 수 있습니다.
---

# setConfig()

### 설명 {#description}

@short: Booking 위젯의 현재 구성을 업데이트합니다

이 메서드는 Booking 위젯의 현재 구성을 업데이트하는 데 사용됩니다. 위젯의 기본 데이터 집합을 업데이트해야 할 때 유용합니다.

### 사용법 {#usage}

~~~jsx
setConfig(config: object): void;
~~~

### 파라미터 {#parameters}

- `config` - (필수) Booking 구성 객체. 전체 속성 목록은 [여기](api/overview/booking-properties-overview.md)를 참조하세요

:::info
이 메서드는 최상위 레벨에서 얕은 병합(shallow merge)을 수행합니다. 전달한 각 속성은 기존 속성을 완전히 대체하며, `cardShape`나 `filterShape`와 같은 중첩 객체는 깊은 병합(deep merge)되지 않습니다. 중첩 객체 내의 이전 값을 유지하려면 해당 객체 전체를 다시 전달해야 합니다. 메서드 실행 후 현재 컴포넌트는 소멸되고 새 컴포넌트가 초기화됩니다.
:::

### 예제 {#example}

~~~jsx {}
// Booking 생성
const widget = new booking.Booking("#root", {
    data,
    cardShape: {
        review: false,
        subtitle: false,
        details: false
    },
    filterShape: {
        date: false,
        autoApply: true,
        time: [
            { from: 8, to: 11, label: "Morning" },
            { from: 12, to: 16, label: "Afternoon" },
            { from: 17, to: 20, label: "Evening" }
        ]
    }
});

// 구성 파라미터 업데이트
widget.setConfig({
    cardShape: {
        review: true
    },
    filterShape: {
        date: true,
        autoApply: false,
        time: [
            { from: 9, to: 11, label: "Morning" },
            { from: 13, to: 17, label: "Afternoon" },
            { from: 18, to: 20, label: "Evening" }
        ]
    }
});
~~~

아래 스니펫은 이미 필터링된 데이터를 로드하는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/f77ytme5?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
