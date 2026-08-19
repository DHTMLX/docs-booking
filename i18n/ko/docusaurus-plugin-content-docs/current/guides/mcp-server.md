---
sidebar_label: DHTMLX MCP server
title: 슬롯과 예약을 위한 DHTMLX Booking MCP 연동
description: DHTMLX Booking의 카드, 슬롯, 필터, 확인 핸들러에 대해 MCP 서버는 AI 어시스턴트가 학습 시점의 스냅샷이 아닌 현재 API를 사용하도록 유지합니다.
---

# DHTMLX Booking MCP 서버: 슬롯, 필터, 예약 {#dhtmlx-booking-mcp-server-slots-filters-and-reservations}

DHTMLX Booking은 예약 위젯을 위한 세밀한 구성을 제공합니다. [슬롯 규칙](guides/configuration.md#fill-cards-with-slots)을 요일 단위 또는 특정 날짜 단위까지 정의할 수 있고, [기본 필드를 전환](api/config/booking-cardshape.md)하거나 [커스텀 템플릿으로 교체](api/config/booking-cardtemplate.md)하여 카드 레이아웃을 조정할 수 있으며, 예약 흐름을 마무리하는 [예약 핸들러](api/methods/booking-setconfirmhandler-method.md)를 완전히 커스터마이즈할 수 있습니다. Booking의 슬롯 규칙 우선순위, 레이아웃 방식, 예약 계약은 학습 시점의 추측이 아니라 현재 실제로 배포된 내용과 일치해야 합니다.

대신 DHTMLX MCP 서버에 질의하세요. 현재의 [슬롯 구성](guides/configuration.md#fill-cards-with-slots) 규칙, [확인 핸들러](guides/saving-reservations.md#save-slot-reservations-to-the-server) 계약, [필터 설정](guides/configuration.md#configure-the-filter)을 제공하므로, 어시스턴트가 오래된 API가 아닌 현재 API를 기준으로 작동합니다.

### MCP 엔드포인트 {#mcp-endpoint}

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

:::note
DHTMLX MCP 서버는 DHTMLX Booking뿐 아니라 모든 주요 DHTMLX 제품을 다룹니다. 어떤 DHTMLX 컴포넌트로 개발하든 동일한 엔드포인트와 구성 방법이 그대로 적용됩니다.
:::

## MCP 서버가 답하도록 만들어진 Booking 질문 {#booking-questions-the-mcp-server-is-built-to-answer}

DHTMLX Booking의 카드, 슬롯, 서버 동기화 로직은 모두 MCP 서버의 검색 가능한 인덱스에 들어 있습니다. 자주 조회되는 항목은 다음과 같습니다:

- [Event Bus](api/overview/booking-internal-eventbus-overview.md) 및 [state](api/overview/booking-internal-state-overview.md) 메서드를 포함해 [메서드](api/overview/booking-methods-overview.md), [이벤트](api/overview/booking-events-overview.md), [속성](api/overview/booking-properties-overview.md)의 현재 API 조회.
- 필요한 카드와 슬롯에 대한 설명으로부터 새 Booking 인스턴스의 실행 가능한 [초기화](guides/initialization.md) 코드 생성.
- [`cardShape`](api/config/booking-cardshape.md)와 [`cardTemplate`](api/config/booking-cardtemplate.md)로 카드 필드를 전환하거나 교체하고, [`infoShape`](api/config/booking-infoshape.md)와 [`infoTemplate`](api/config/booking-infotemplate.md)로 예약 대화상자의 정보 블록에 대해 동일하게 처리.
- [슬롯 규칙](guides/configuration.md#fill-cards-with-slots)(크기, 간격, 요일, 날짜)과 그 우선순위 정리, 그리고 슬롯을 [사용됨 또는 가용](guides/configuration.md#mark-slots-as-used-or-available)으로 표시.
- [필터 바](guides/configuration.md#configure-the-filter) 구성: 텍스트 필드, 시간 범위, `autoApply` 모드.
- [서버 동기화](guides/saving-reservations.md) 연결: [`setConfig()`](api/methods/booking-setconfig-method.md)로 카드 데이터를 불러오고 [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md)로 예약을 전송.
- `select-slot`, `confirm-slot`, `filter-data` 같은 [Booking 이벤트](api/overview/booking-events-overview.md) 처리 또는 [`api.intercept()`](api/internal/booking-intercept.md)로 가로채기.
- 내장 또는 커스텀 [`locale`](api/config/booking-locale.md)로 위젯 [현지화](guides/localization.md)하기, `--wx-booking-*` CSS 변수로 [스타일링](guides/styling.md)하기.
- Booking을 [React](guides/integration-with-react.md), [Vue](guides/integration-with-vue.md), [Angular](guides/integration-with-angular.md), [Svelte](guides/integration-with-svelte.md)와 통합하거나, [Scheduler](guides/integration-with-scheduler.md) 및 [Event Calendar](guides/integration-with-eventcalendar.md)의 이벤트를 Booking 슬롯으로 변환.

## MCP 서버가 Booking 프롬프트를 처리하는 방식 {#what-the-mcp-server-does-with-a-booking-prompt}

Booking 질문 뒤에는 DHTMLX MCP 서버가 Model Context Protocol(MCP) 위에서 실행하는 검색 증강 생성(RAG) 파이프라인이 있습니다. 서버는 각 요청을 두 가지 워크플로 중 하나로 넘깁니다. 하나는 일치하는 레퍼런스 페이지를 반환하는 *Search*, 다른 하나는 해당 페이지를 읽고 스스로 답하는 *Inference*입니다. Booking 프롬프트는 코딩 질문과 사용자의 자체 백엔드에 대한 세부 사항이 섞이는 경우가 많으므로, 어시스턴트는 이 둘을 분리해 처리합니다. 문서가 필요한 부분을 떼어내고, 나머지는 스스로 답합니다.

*"회사 내부 예약 관리 API로 예약을 전송하고 응답이 오면 이를 완료 처리하는 확인 핸들러는 어떻게 설정하나요?"* 라는 프롬프트가 이 과정을 어떻게 거치는지 따라가 보겠습니다:

1. MCP에 전달되는 것은 좁은 범위입니다. `confirm`, `slot`, `data` 필드를 사용해 확인 핸들러를 구성하는 방법입니다.
2. 서버는 이를 서버 연동 문서로 연결합니다.
3. 확인 핸들러 작성에는 코드가 필요하므로 *Search*가 이를 담당합니다(예약된 슬롯의 시작 시각을 담는 매개변수가 무엇인지와 같은 더 좁은 질문이라면 *Inference*로 갑니다).
4. *Search*는 현재 Booking 문서로 구축된 벡터 인덱스에서 일치하는 페이지를 가져옵니다.
5. 해당 페이지들이 컨텍스트로 어시스턴트에 전달됩니다.
6. 어시스턴트는 그 페이지들이 설명하는 `confirm`, `slot`, `data` 필드로 확인 핸들러를 구성한 다음, 대상 백엔드에 맞는 구체적인 요청 및 응답 처리를 자체 지식으로 채워 넣습니다.

이런 방식으로 Booking 관련 제안은 위젯의 현재 슬롯 규칙 및 예약 처리 방식에 계속 맞춰집니다.

## 도구별 MCP 설정 {#mcp-setup-tool-by-tool}

대부분의 Booking 팀은 예약 백엔드를 구축할 때 MCP 엔드포인트를 한 번 등록하고, 이후 모든 프로젝트에서 그 등록을 재사용합니다. 방식은 도구마다 달라서 어떤 도구는 CLI 명령이고 어떤 도구는 JSON 구성 파일이지만, 모두 다음 주소를 가리킵니다:

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

정확한 설정 단계는 아래에서 사용하는 도구를 선택해 확인하세요.

### Claude Code

:::info
[공식 문서](https://code.claude.com/docs/en/mcp)에 Claude Code가 MCP 서버에 연결하는 모든 방법이 정리되어 있습니다.
:::

명령줄에서 서버를 등록하려면 다음을 실행합니다:

~~~jsx
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
~~~

CLI를 사용하지 않으려면, 대신 `.mcp.json`에 다음 항목을 추가하세요:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "type": "http",
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

### Cursor

:::info
[공식 문서](https://cursor.com/en-US/docs/mcp)에서 Cursor의 MCP 구성 방법을 모두 다룹니다.
:::

서버를 추가하는 단계:

1. Settings를 엽니다(Mac에서는 `Cmd+Shift+J`, Windows/Linux에서는 `Ctrl+Shift+J`)
2. **Tools & MCP**로 이동합니다
3. **Add Custom MCP**를 클릭합니다
4. 다음 구성을 붙여 넣습니다:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

### Google Antigravity

#### Antigravity 2.0

:::info
Antigravity의 MCP 연동에 대한 자세한 내용은 [공식 문서](https://antigravity.google/docs/mcp)를 참고하세요.
:::

DHTMLX MCP 서버를 Google Antigravity에 연결하려면 다음 단계를 수행합니다:

1. 명령 팔레트를 엽니다
2. "mcp add"를 입력합니다
3. "HTTP"를 선택합니다
4. 다음 값을 입력합니다:
- 이름:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~

#### Antigravity CLI

:::info
Gemini CLI에서 넘어오셨나요? [관련 가이드](https://antigravity.google/docs/gcli-migration#mcp-config-formatting-changes)에서 Antigravity CLI로의 마이그레이션을 설명합니다.
:::

DHTMLX MCP 서버를 Antigravity CLI에 연결하려면 다음 위치 중 하나에 `mcp_config.json`을 생성합니다:

- 전역: `~/.gemini/config/mcp_config.json`
- 워크스페이스: `.agents/mcp_config.json`

다음 구성을 추가합니다:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "serverUrl": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

그런 다음 터미널에서 `agy`를 실행합니다.

### ChatGPT

:::info
ChatGPT는 MCP 커넥터 설정 방법을 [공식 문서](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt)에 전부 정리해 두었습니다.
:::

커넥터를 구성하는 단계:

1. **Settings** → **Apps & Connectors**로 이동합니다
2. **Advanced settings**를 클릭합니다
3. **Developer mode**를 활성화합니다
4. **Apps & Connectors**로 돌아가 "Create"를 클릭합니다
5. 커넥터 세부 정보를 입력합니다:
- 이름:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~
- 인증: `No authentication`
6. **Create**를 클릭합니다

커넥터를 생성하고 나면 ChatGPT는 대화 중에 MCP 서버에서 문서를 가져옵니다.

:::info
코딩 작업이 많은 워크플로에서는 다른 MCP 지원 도구가 더 적합할 수 있습니다.
:::

### 기타 도구 {#other-tools}

사용하는 도구가 위 목록에 없다면, 해당 도구의 설정에서 "Model Context Protocol" 또는 "Context Sources" 항목을 찾아 `https://docs.dhtmlx.com/mcp`를 커스텀 소스로 추가하세요.

## MCP 서버의 데이터 처리 방식 {#data-handling-behind-the-mcp-server}

DHTMLX MCP 서버는 전적으로 사용자의 컴퓨터 외부에서 실행됩니다. 로컬 파일에 접근하지 않으며, 어떤 개인 정보도 저장하지 않습니다.

기록되는 쿼리는 디버깅이나 서비스 개선에 도움이 되는 것뿐입니다.

추가적인 보장이 필요한 팀을 위해 상용 배포에서는 쿼리 로깅을 완전히 끕니다. 도입 문의는 `info@dhtmlx.com`으로 하시면 됩니다.

## Booking 개발 시 시도해 볼 프롬프트 {#prompts-to-try-when-building-with-booking}

질문하기 전에 대상을 먼저 지목하세요. 카드, 슬롯, 필터, 확인 핸들러 중 무엇인지 밝히면 됩니다. 아래 프롬프트는 바로 그렇게 작성한 예시이며 작업별로 묶어 두었습니다.

**카드와 슬롯**

~~~
Booking 카드에서 가격과 리뷰 필드를 숨기려면 어떻게 하나요? 문서를 참고해 주세요.
~~~
~~~
DHTMLX Booking에서 화요일과 금요일에만 45분 슬롯을 정의하려면 어떻게 하나요?
~~~
~~~
DHTMLX Booking에서 슬롯을 이미 예약된 것으로 표시하려면 어떻게 하나요?
~~~

**필터링**

~~~
DHTMLX Booking 필터 바에 "긴급"이라는 이름의 커스텀 시간 범위를 추가하려면 어떻게 하나요?
~~~
~~~
Search 버튼을 누르지 않아도 Booking 필터가 자동으로 적용되게 하려면 어떻게 하나요?
~~~

**예약과 서버 동기화**

~~~
예약을 서버로 전송하고 서버가 응답하면 완료 처리하려면 어떻게 하나요?
~~~
~~~
REST 엔드포인트에서 카드 데이터를 불러와 기존 Booking 인스턴스에 적용하려면 어떻게 하나요?
~~~
~~~
DHTMLX Booking에서 기본 확인 핸들러를 교체하지 않고 확정된 예약에 반응하려면 어떻게 하나요?
~~~

**현지화와 스타일링**

~~~
DHTMLX Booking을 독일어 로케일로 전환하려면 어떻게 하나요?
~~~
~~~
Booking 슬롯 열의 너비를 더 좁게 만들려면 어떻게 하나요?
~~~

## Booking에 유용한 프롬프트 작성 습관 {#prompt-habits-useful-for-booking}

- **정확한 속성 이름을 밝히세요.** `cardShape`, `cardTemplate`, `infoShape`, `infoTemplate`, `filterShape`, `formShape`는 각각 위젯의 다른 부분을 구성합니다. "카드 설정"이라고 뭉뚱그리지 말고 어떤 속성을 말하는지 밝혀야 어시스턴트가 맞는 레퍼런스를 찾아옵니다.
- **어떤 슬롯 속성인지 밝히세요.** `slots`는 가용성 규칙을 정의하고, `usedSlots`는 이미 예약된 시간을 숨기며, `availableSlots`는 규칙을 명시적인 목록으로 대체합니다. 원하는 속성을 지목하면 어시스턴트가 이들을 하나로 뒤섞지 않습니다.
- **공개 API와 Event Bus를 구분하세요.** `setConfig()`와 `setConfirmHandler()`는 일상적인 구성 대부분을 담당하고, `api.on()`, `api.exec()`, `api.intercept()`, `api.setNext()`는 내부 Event Bus에 접근합니다. 프롬프트가 이벤트를 다룰 때는 어느 계층을 말하는지 밝히세요.
- **시간대를 언급하세요.** Booking은 로컬 시간을 기준으로 동작하므로, 서버 데이터가 관련된 프롬프트에서는 타임스탬프가 UTC로 도착하는지, 위젯에 전달되기 전에 변환이 필요한지 밝히는 것이 좋습니다.
