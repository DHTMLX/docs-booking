---
sidebar_label: 서버와 연동하기
title:  서버와 연동하기
description: DHTMLX JavaScript Booking 라이브러리 문서에서 서버 연동 방법을 알아보세요. 개발자 가이드와 API 참조를 살펴보고, 코드 예제와 라이브 데모를 직접 실행해 보거나 DHTMLX Booking 30일 무료 평가판을 다운로드하세요.
---

# 서버와 연동하기

Booking 위젯은 두 가지 주요 작업을 통해 백엔드와 연동됩니다: 서버에서 카드 데이터를 불러오는 것과 슬롯 예약 정보를 서버로 전송하는 것입니다. 이 가이드에서는 두 가지 흐름과 서버 데이터가 다른 시간대를 사용할 때 필요한 UTC 변환 방법을 다룹니다.

## 서버에서 데이터 불러오기 {#load-data-from-the-server}

네이티브 `fetch` API(또는 동등한 HTTP 클라이언트)로 카드 데이터를 가져온 후, 파싱된 JSON을 [`setConfig()`](api/methods/booking-setconfig-method.md) 메서드를 통해 위젯에 전달합니다.

다음 코드 스니펫은 빈 Booking 인스턴스를 초기화하고, 응답이 도착하면 데이터셋을 불러옵니다:

~~~jsx {}
const widget = new booking.Booking("#booking", { data: [] });
const server = "https://some-backend-url";

fetch(server + "/data")
    .then((res) => res.json())
    .then((data) => {
        widget.setConfig({ data });
    });
~~~

## 슬롯 예약을 서버에 저장하기 {#save-slot-reservations-to-the-server}

백엔드에서 슬롯 예약을 처리하려면, [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) 메서드로 확인 핸들러를 등록합니다.

핸들러는 세 가지 필드를 포함하는 이벤트 객체를 받습니다:

- `slot` — 예약된 슬롯: `id` (카드 ID)와 `time` (`[timestamp, duration]`)
- `data` — [`formShape`](api/config/booking-formshape.md) 필드 ID를 키로 하는 양식 값 (기본값: `name`, `email`, `description`)
- `confirm` — 서버 응답 콜백: 성공 시 `done()`, 실패 시 `error()`

다음 코드 스니펫은 예약 정보를 서버에 전송하고 응답에 따라 예약을 처리합니다:

~~~jsx {}
// 예약 로직을 처리합니다
const handleSlotReservation = (event) => {
    const { confirm, slot, data } = event;

    // 페이로드를 구성합니다
    const info = {
        item: slot.id,
        start: slot.time[0],
        data
    };

    // 페이로드를 서버에 전송합니다
    fetch("/server/url", {
        method: "POST",
        body: JSON.stringify(info),
    // 응답에 따라 예약을 처리하거나 거부합니다
    }).then((response) => {
        if (response.ok) confirm.done();
        else confirm.error();
    });
};

// Booking을 생성합니다
const widget = new booking.Booking("#root", {
    data: [],
    // 구성 파라미터
});

// 서버에서 데이터셋을 가져옵니다
fetch("/server/url")
    .then((res) => res.json())
    .then((items) => {
        // 가져온 항목을 위젯에 불러옵니다
        widget.setConfig({ data: items });
        // 예약 핸들러를 등록합니다
        widget.setConfirmHandler(handleSlotReservation);
    });
~~~

:::info
[`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) 메서드는 내부적으로 `widget.api.on("confirm-slot", handler)`를 통해 [`confirm-slot`](api/events/booking-confirmslot-event.md) 이벤트를 구독하는 단축 메서드입니다. 두 방식 모두 동일한 콜백 형태로 핸들러를 등록합니다. 여러 구독자를 추가해야 할 경우에는 `widget.api.on("confirm-slot", handler)`를 직접 호출하세요.
:::

## UTC 데이터를 로컬 시간대로 변환하기 {#convert-utc-data-to-the-local-timezone}

위젯은 로컬 시간대를 기준으로 동작합니다. 서버가 UTC 타임스탬프를 반환하는 경우, 위젯에 전달하기 전에 각 타임스탬프를 변환하고, 예약 정보를 전송하기 전에 다시 UTC로 변환해야 합니다.

아래 헬퍼 함수들이 양방향 변환을 처리합니다:

- `g2l` — UTC 타임스탬프를 로컬 시간대로 변환합니다 (들어오는 `usedSlots` 및 `slots.dates`에 적용)
- `l2g` — 로컬 타임스탬프를 UTC로 변환합니다 (서버로 전송하기 전 `slot.time[0]`에 적용)

다음 코드 스니펫은 두 헬퍼를 결합하여 완전한 데이터 불러오기 및 예약 흐름을 구현합니다:

~~~jsx
const serverURL = "https://some-backend-url";

function g2l(v) {
    const utcDate = new Date(v);
    return new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
        utcDate.getUTCHours(),
        utcDate.getUTCMinutes(),
        utcDate.getUTCSeconds(),
        utcDate.getUTCMilliseconds(),
    ).valueOf();
}

function l2g(v) {
    const date = new Date(v);
    return Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
    );
}

const handleSlotReservation = event => {
    const { confirm, slot, data } = event;

    const info = {
        doctor: slot.id,
        date: l2g(slot.time[0]),
        form: {
            name: data.name,
            email: data.email,
            details: data.description,
        },
    };

    fetch( serverURL + "/doctors/reservations", {
        method: "POST",
        body: JSON.stringify(info),
    }).then(response => {
        if (response.ok) confirm.done();
        else confirm.error();
    });
};

// 위젯 초기화
const widget = new booking.Booking("#root", {
    data: [],
});

// 데이터 불러오기
fetch( serverURL + "/units")
    .then(res => res.json())
    .then(units => {
        units.forEach(unit => {
            if (unit.usedSlots) unit.usedSlots = unit.usedSlots.map(g2l);
            if (unit.slots) {
                unit.slots = unit.slots.map(slot => {
                    if (slot.dates) {
                        return {
                            ...slot,
                            dates: slot.dates.map(g2l)
                        };
                    }
                    return slot;
                });
            };
        });

        widget.setConfig({ data: units });
        widget.setConfirmHandler(handleSlotReservation);
    });
~~~


## 예제 {#example}

아래 스니펫은 완전한 서버 측 예약 흐름을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**관련 문서**:

- [`confirm-slot`](api/events/booking-confirmslot-event.md) — 사용자가 슬롯을 확인할 때 발생하는 이벤트
- [`setConfig()`](api/methods/booking-setconfig-method.md) — 가져온 데이터로 위젯 구성을 업데이트합니다
- [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) — 슬롯 예약 핸들러를 등록합니다
