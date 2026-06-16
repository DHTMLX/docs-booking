---
sidebar_label: confirm-slot
title: confirm-slot 이벤트
description: DHTMLX JavaScript Booking 라이브러리 문서에서 confirm-slot 이벤트에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 사용해 보고, DHTMLX Booking의 무료 30일 평가판을 다운로드하세요.
---

# confirm-slot

### 설명 {#description}

@short: 슬롯 예약을 확인할 때 발생합니다

### 사용법 {#usage}

~~~jsx {}
"confirm-slot": ({
    slot:{
        id:string|number,
        time: [ number, number ]
    },
    data:{
        [key]: string
    },
    confirm:{
        promise:Promise,
        done: (value:any) => void,
        error: (error: Error) => void
    }
}) => void;
~~~

### 매개변수 {#parameters}

`confirm-slot` 이벤트의 callback은 다음 매개변수를 가진 객체를 받을 수 있습니다:

- `slot` - (필수) 다음 슬롯 매개변수를 가진 객체:
    - `id` - (필수) 슬롯 예약이 확인되는 카드의 ID
    - `time` - (필수) 슬롯 시작 시간(밀리초)과 슬롯 지속 시간(분)이 담긴 배열 (시작 시간은 밀리초 단위이며 로컬 벽시계 시간을 나타냅니다)
- `data` - (필수) 각 필드에 대한 다음 매개변수를 가진 예약 화면 필드 객체:
    - `key` - (필수) 폼 필드 ID ([`formShape`](api/config/booking-formshape.md)에서 가져옴). 기본적으로 *name*, *email*, *description* 세 가지 필드가 추가됩니다
- `confirm` - (필수) 다음 매개변수를 가진 객체:
    - `promise` - (필수) 확인 상태를 나타내는 promise. 슬롯 예약 확인의 비동기 작업을 나타내는 JavaScript Promise 객체입니다. 예약 프로세스의 결과에 따라 promise가 이행되거나 거부됩니다. 이 promise에 `.then` 및 `.catch` 핸들러를 연결하여 예약의 성공 또는 실패를 처리할 수 있습니다.
    - `done` - (필수) 예약이 성공적으로 확인되었을 때 호출해야 하는 callback 함수. 이 함수를 호출하면 promise가 이행되어 예약이 성공했음을 나타냅니다. 서버에서 긍정적인 응답을 받은 후 이 함수를 호출할 수 있습니다.
    - `error` - (필수) 예약이 실패했을 때 호출해야 하는 callback 함수. 이 함수를 호출하면 promise가 거부되어 예약이 실패했음을 나타냅니다. 서버에서 부정적인 응답을 받은 후 이 함수를 호출할 수 있습니다.

### 예제 {#example}

~~~jsx {7-10}
// Booking 생성
const widget = new booking.Booking("#root", {
    data,
    // 기타 구성 매개변수
});

widget.api.on("confirm-slot", (obj) => {
    console.log("예약이 확인된 슬롯 ID:", obj.slot.id);
});
~~~

**관련 문서**: [`setConfirmHandler`](api/methods/booking-setconfirmhandler-method.md) 메서드
