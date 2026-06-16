---
sidebar_label: cardTemplate
title: cardTemplate
description: DHTMLX JavaScript Booking 라이브러리 문서에서 cardTemplate 설정에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking의 무료 30일 평가판도 다운로드할 수 있습니다.
---

# cardTemplate

### 설명 {#description}

@short: 선택 사항. 카드의 왼쪽 블록에 템플릿을 적용할 수 있습니다

이 속성은 각 카드 블록(카드의 왼쪽 영역)의 HTML 구조와 레이아웃을 지정합니다. 즉, 표시할 필드, 필드의 배치 방식, 그리고 시각적 스타일을 직접 제어할 수 있습니다.

:::info
[`cardShape`](api/config/booking-cardshape.md) 속성을 사용하여 표시할 필드를 지정할 수도 있습니다
:::

### 사용법 {#usage}

~~~jsx {}
cardTemplate?: ({item: obj}) => string;
~~~

### 파라미터 {#parameters}

`cardTemplate`는 `item`(카드) 객체를 입력으로 받아 카드의 표시 방식을 정의하는 HTML 문자열을 반환하는 함수를 받습니다.

### 예제 {#example}

아래 예제에서는 `item`(카드) 객체를 받아 미리보기 이미지(item.preview), 카테고리(item.category), 제목(item.title), 가격(item.price)이 포함된 카드 HTML을 반환하는 함수를 만듭니다. 카드에 적용할 HTML 템플릿을 직접 작성하고 `template` 헬퍼를 import해야 합니다. 그런 다음 해당 함수를 `cardTemplate` 속성에 할당하여 Booking 설정에 전달합니다.

~~~html {}
<style>
    .custom-preview {
        display: flex;
        width: 100%;
        height: 100%;
        gap: 30px;
    }

    .preview-left {
        width: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    /* 기타 스타일 */
</style>

<script>
    const { Booking, template } = booking; //template 헬퍼 import

    function cardPreviewTemplate({ item }) {
        return `
            <div class="custom-preview" data-action="preview-click">
                <div class="preview-left">
                    <div
                        style="background-image: url(${item.preview})"
                        class="card-photo"
                    ></div>
                    <!-- <div class="card-photo-empty" /> -->
                    </div>

                    <div class="preview-right">
                    <div class="category">${item.category}</div>
                    <div class="title">${item.title}</div>
                    <div class="price">${item.price}</div>
                </div>
            </div>
            `;
    }

    const widget = new Booking("#root", {
	    data,
	    cardTemplate: template(cardPreviewTemplate), // Booking 설정에 함수 전달
    });
    // 기타 파라미터
</script>
~~~

아래 스니펫은 카드 왼쪽 블록에 템플릿을 적용하는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/k2v01vng?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**관련 문서**:

- [카드 구조 정의](guides/configuration.md#define-the-structure-of-cards)
- [`cardShape`](api/config/booking-cardshape.md)
