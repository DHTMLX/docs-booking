---
sidebar_label: formShape
title: formShape
description: DHTMLX JavaScript Booking 라이브러리의 formShape 설정에 대해 알아볼 수 있습니다. 개발자 가이드와 API 참조를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking 30일 무료 평가판도 다운로드하실 수 있습니다.
---

# formShape

### 설명 {#description}

@short: 선택 사항입니다. Booking 대화상자의 필드 구성 설정을 담은 객체 배열입니다.

### 사용법 {#usage}

~~~jsx {}
formShape: [{
    comp: "text" | "textarea",
    key: string,
    label?: string,
    required?: boolean,
    validation?: (value: any) => boolean,
    errorMessage?: string
}];
~~~

### 파라미터 {#parameters}

각 필드에 대해 다음 파라미터를 지정할 수 있습니다:

- `comp` - (필수) 필드 유형(`text` 또는 `textarea`)
- `key` - (필수) 필드의 ID
- `label` - (선택 사항) 필드 레이블
- `required` - (선택 사항) 값이 `true`로 설정되면 해당 필드는 비워 둘 수 없으며 예약 양식을 제출하기 위해 반드시 입력해야 합니다. `false`인 경우 필드를 비워 둘 수 있습니다.
- `validation` - (선택 사항) 필드 값을 인수로 받아 boolean을 반환하는 함수입니다. 함수가 `true`를 반환하면 해당 필드는 유효한 것으로 간주됩니다.
- `errorMessage` - (선택 사항) 값이 유효성 검사를 통과하지 못했을 때 표시되는 메시지

### 기본 구성 {#default-config}

~~~jsx {}
const defaultFormShape = [
    {
        comp: "text",
        key: "name",
        label: "Name",
        required: true,
        validation: val => {
            return !!val.replace(/\s/g, "");
        },
        errorMessage: " should not be empty"
    },
    {
        comp: "text",
        key: "email",
        label: "Email",
        required: true,
        validation: val => {
            const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return val && regEx.test(val);
        },
        errorMessage: " should contain valid email address"
    },
    {
        comp: "textarea",
        key: "description",
        label: "Description"
    }
];
~~~

### 예제 {#example}

~~~jsx {1-17,21}
const formShape = [
    {
        comp: "text",
        key: "name",
        label: "Name"
    },
    {
        comp: "text",
        key: "contact",
        label: "Mobile"
    },
    {
        comp: "textarea",
        key: "description",
        label: "Details"
    },
];

new booking.Booking("#root", {
    data,
    formShape,
    // 기타 파라미터
});
~~~

아래 스니펫은 Booking 대화상자의 필드를 구성하는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/yeqkuzx7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
