---
sidebar_label: renderType
title: renderType
description: DHTMLX JavaScript Booking 라이브러리 문서에서 renderType에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking의 30일 무료 평가판도 다운로드할 수 있습니다.
---

# renderType

### 설명 {#description}

@short: 선택 사항. 카드가 렌더링되는 방식을 정의합니다

이 속성은 많은 수의 카드를 다룰 때 성능을 최적화하는 데 도움을 줍니다.

### 사용법 {#usage}

~~~jsx {}
renderType?: "default" | "lazy";
~~~

### 매개변수 {#parameters}

- `default` - 위젯에 로드된 모든 카드를 렌더링합니다 (기본값으로 설정됨)
- `lazy` - 화면에 보이는 카드만 렌더링합니다

### 예제 {#example}

~~~jsx {}
new booking.Booking("#root", {
    data,
    renderType: "lazy",
    // 기타 매개변수
});
~~~

아래 스니펫은 대용량 데이터 세트의 렌더링을 처리하는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/fb9a5a3b?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
