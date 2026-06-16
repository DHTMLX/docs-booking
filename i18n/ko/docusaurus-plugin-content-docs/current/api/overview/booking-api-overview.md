---
sidebar_label: API 개요
title: API 개요
description: DHTMLX JavaScript Booking 라이브러리 문서에서 JavaScript Booking의 API 개요를 확인할 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking의 30일 무료 평가판도 다운로드할 수 있습니다.
---

# API 개요 {#api-overview}

## Booking 생성자 {#booking-constructor}

~~~jsx {}
new booking.Booking("#root", {
    // 초기 구성 파라미터
});
~~~

**파라미터**:

- HTML 컨테이너 또는 해당 ID 선택자 (`HTMLElement | string`)
- 구성 파라미터 객체 ([여기서 확인](#booking-properties))

## Booking 메서드 {#booking-methods}

| 이름                                               | 설명                                               |
| -------------------------------------------------- | --------------------------------------------------------- |
| [](api/methods/booking-serialize-method.md)         | @getshort(../methods/booking-serialize-method.md)         |
| [](api/methods/booking-setconfig-method.md)         | @getshort(../methods/booking-setconfig-method.md)         |
| [](api/methods/booking-setconfirmhandler-method.md) | @getshort(../methods/booking-setconfirmhandler-method.md) |
| [](api/methods/booking-setlocale-method.md)         | @getshort(../methods/booking-setlocale-method.md)         |

## Booking 내부 API {#booking-internal-api}

### Event Bus 메서드 {#event-bus-methods}

| 이름                                     | 설명                                     |
| ---------------------------------------- | ----------------------------------------------- |
| [](api/internal/booking-detach.md)    | @getshort(../internal/booking-detach.md)            |
| [](api/internal/booking-exec.md)      | @getshort(../internal/booking-exec.md)              |
| [](api/internal/booking-intercept.md) | @getshort(../internal/booking-intercept.md)         |
| [](api/internal/booking-on.md)        | @getshort(../internal/booking-on.md)                |
| [](api/internal/booking-setnext.md)   | @getshort(../internal/booking-setnext.md)           |

### State 메서드 {#state-methods}

| 이름                                            | 설명                                            |
| ----------------------------------------------- | ------------------------------------------------------ |
| [](api/internal/booking-getreactivestate.md) | @getshort(../internal/booking-getreactivestate.md) |
| [](api/internal/booking-getstate.md)         | @getshort(../internal/booking-getstate.md)         |

## Booking 이벤트 {#booking-events}

| 이름                                      | 설명                                      |
| ----------------------------------------- | ------------------------------------------------ |
| [](api/events/booking-confirmslot-event.md)  | @getshort(../events/booking-confirmslot-event.md)  |
| [](api/events/booking-filterdata-event.md)  | @getshort(../events/booking-filterdata-event.md)    |
| [](api/events/booking-selectitem-event.md)  | @getshort(../events/booking-selectitem-event.md)    |
| [](api/events/booking-selectitemdate-event.md)  | @getshort(../events/booking-selectitemdate-event.md) |
| [](api/events/booking-selectslot-event.md)   | @getshort(../events/booking-selectslot-event.md)   |

## Booking 속성 {#booking-properties}

| 이름                                  | 설명                                        |
| ------------------------------------- | -------------------------------------------------- |
| [](api/config/booking-data.md)         | @getshort(../config/booking-data.md)               |
| [](api/config/booking-end.md)          | @getshort(../config/booking-end.md)                |
| [](api/config/booking-cardshape.md)    | @getshort(../config/booking-cardshape.md)          |
| [](api/config/booking-cardtemplate.md) | @getshort(../config/booking-cardtemplate.md)       |
| [](api/config/booking-filtershape.md)  | @getshort(../config/booking-filtershape.md)        |
| [](api/config/booking-formshape.md)    | @getshort(../config/booking-formshape.md)          |
| [](api/config/booking-infoshape.md)    | @getshort(../config/booking-infoshape.md)          |
| [](api/config/booking-infotemplate.md) | @getshort(../config/booking-infotemplate.md)       |
| [](api/config/booking-locale.md)       | @getshort(../config/booking-locale.md)             |
| [](api/config/booking-rendertype.md)   | @getshort(../config/booking-rendertype.md)         |
| [](api/config/booking-slotgap.md)      | @getshort(../config/booking-slotgap.md)            |
| [](api/config/booking-slotsize.md)     | @getshort(../config/booking-slotsize.md)           |
| [](api/config/booking-start.md)        | @getshort(../config/booking-start.md)              |
