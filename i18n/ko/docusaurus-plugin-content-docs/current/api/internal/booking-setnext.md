---
sidebar_label: api.setNext()
title: setNext() 메서드
description: DHTMLX JavaScript Booking 라이브러리 문서에서 setNext 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking 무료 30일 평가판도 다운로드할 수 있습니다.
---

# api.setNext()

### 설명 {#description}

@short: 위젯의 Event Bus 체인 끝에 커스텀 핸들러를 추가합니다

### 사용법 {#usage}

~~~jsx {}
api.setNext(next: any): void;
~~~

### 매개변수 {#parameters}

- `next` - (필수) **Event Bus** 순서에 포함될 동작

### 예제 {#example}

아래 예제는 `api.setNext()` 메서드를 사용하여 커스텀 클래스를 Event Bus 순서에 통합하는 방법을 보여줍니다:

~~~jsx {}
const widget = new booking.Booking("#root", { data: [] });
const server = "https://some-backend-url";

// 사용자 정의 서버 서비스 클래스 someServerService가 있다고 가정합니다
const someServerService = new ServerDataService(server);

fetch(server + "/data").then((res) => res.json()).then((data) => {
    widget.setConfig({data});
});
// someServerService를 위젯의 Event Bus 순서에 통합합니다
widget.api.setNext(someServerService);
~~~

**관련 문서**: [데이터 로딩](guides/loading-data.md)
