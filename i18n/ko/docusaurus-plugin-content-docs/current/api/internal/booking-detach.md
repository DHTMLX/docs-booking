---
sidebar_label: api.detach()
title: detach() 메서드
description: DHTMLX JavaScript Booking 라이브러리 문서에서 detach 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 참조를 탐색하고, 코드 예제와 라이브 데모를 사용해 보세요. DHTMLX Booking 무료 30일 평가판을 다운로드하세요.
---

# api.detach()

### 설명 {#description}

@short: 이벤트 핸들러를 제거/분리할 수 있습니다

### 사용법 {#usage}

~~~jsx {}
api.detach(tag: number | string ): void;
~~~

### Parameters {#parameters}

- `tag` - (필수) 액션 태그의 이름

### 예제 {#example}

아래 예제에서는 [`api.on()`](api/internal/booking-on.md) 핸들러에 `tag` 속성을 포함한 객체를 추가한 다음, `api.detach()` 메서드를 사용하여 [`select-slot`](api/events/booking-selectslot-event.md) 이벤트 로깅을 중지합니다.

~~~jsx {6-20}
const widget = new booking.Booking("#root", {
    data,
    //기타 구성 parameters
});

// 핸들러 추가
if (widget.api) {
    widget.api.on(
        "select-slot",
        ({ id }) => {
            console.log("Selected: " + id);
        },
        { tag: "track" }
    );
}

// 핸들러 분리
function stop() {
    widget.api.detach("track");
}

const button = document.createElement("button");

button.addEventListener("click", stop);
button.textContent = "Stop logging";

document.body.appendChild(button);
~~~
