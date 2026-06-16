---
sidebar_label: infoTemplate
title: infoTemplate
description: DHTMLX JavaScript Booking 라이브러리 문서에서 infoTemplate 설정에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 체험해 보세요. DHTMLX Booking의 무료 30일 평가판도 다운로드할 수 있습니다.
---

# infoTemplate

### 설명 {#description}

@short: 선택 사항. Booking 대화 상자의 정보 블록에 템플릿을 적용할 수 있습니다

### 사용법 {#usage}

~~~jsx {}
infoTemplate?: ({item: obj, slot: number}) => string;
~~~

### 파라미터 {#parameters}

`infoTemplate`은 `card` 항목 객체와 선택된 `slot` 타임스탬프를 입력으로 받아 HTML 문자열을 반환합니다.


### 예제 {#example}

아래 예제에서는 정보 블록에 대한 커스텀 HTML을 생성하는 `cardInfoTemplate` 함수를 정의합니다. 이 함수는 입력 파라미터로 `item`(카드 객체)과 `slot`(슬롯 타임스탬프)을 받습니다. 함수는 이미지, 카테고리, 제목, 포맷된 날짜를 포함하여 선택된 예약 항목의 정보 블록을 나타내는 div 컨테이너를 반환합니다. 또한 `template` 헬퍼를 import하고 커스텀 함수를 `infoTemplate`에 할당해야 합니다.

~~~html
<style>
	.custom-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.info-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding: 34px;
		background: rgba(128, 128, 155, 0.12);
		border-radius: 8px;
	}
    /* 기타 스타일 */
</style>

<script>
    const { Booking, template } = booking; // template 헬퍼 import

    function cardInfoTemplate({
        item,
        slot,
    }) {
            return `
                <div class="custom-info">
                    <div class="info-wrapper">
                        <div class="photo-wrapper">
                            ${getPhotoElement(item.preview, "info")}
                        </div>
                        <span class="info-title">${item.title}</span>
                        <span class="info-category">${item.category}</span>
                        <div class="date" data-action="reset-slot">
                            <i class="icon wxi-calendar"></i>
                            <span>${formatDate(slot, { dateFormat, timeFormat })}</span>
                        </div>
                    </div>
                </div>
            `;
        }

    const widget = new Booking("#root", {
	    data,
	    infoTemplate: template(cardInfoTemplate), // 위젯 설정에 함수 전달
    });
</script>
~~~

아래 스니펫은 사용자가 시간 슬롯 버튼을 클릭할 때 나타나는 Booking 대화 상자의 정보 블록에 템플릿을 적용하는 방법을 보여줍니다.

<iframe src="https://snippet.dhtmlx.com/byb94ipu?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
[`infoShape`](api/config/booking-infoshape.md) 속성을 사용하여 Booking 대화 상자의 정보 블록에 표시할 필드를 제어할 수도 있습니다. 단, 두 속성이 모두 적용된 경우 `infoTemplate`이 `infoShape` 설정을 재정의합니다.
:::

**관련 문서**:

- [Booking 대화 상자 구성하기](guides/configuration.md#configure-the-booking-dialog)
- [`infoShape`](api/config/booking-infoshape.md)
