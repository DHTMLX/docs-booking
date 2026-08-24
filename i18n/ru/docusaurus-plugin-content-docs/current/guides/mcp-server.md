---
sidebar_label: DHTMLX MCP server
title: Интеграция DHTMLX Booking с MCP для слотов и бронирований
description: Для карточек, слотов, фильтров и обработчика подтверждения DHTMLX Booking MCP-сервер удерживает AI-ассистентов на актуальном API вместо снимка обучающих данных.
---

# DHTMLX Booking MCP-сервер: слоты, фильтры и бронирования {#dhtmlx-booking-mcp-server-slots-filters-and-reservations}

DHTMLX Booking предоставляет детальную конфигурацию виджета бронирования. Вы можете задавать [правила слотов](guides/configuration.md#fill-cards-with-slots) вплоть до дня недели или конкретной даты, менять раскладку карточки (для этого достаточно [переключить её поля по умолчанию](api/config/booking-cardshape.md) или [подставить пользовательский шаблон](api/config/booking-cardtemplate.md)) и полностью настраивать [обработчик бронирования](api/methods/booking-setconfirmhandler-method.md), который завершает процесс бронирования. Приоритет правил слотов, подход к раскладке и контракт бронирования в Booking должны соответствовать тому, что поставляется сегодня, а не догадке на основе обучающих данных.

Обращайтесь вместо этого к DHTMLX MCP-серверу, который предоставляет актуальные правила [конфигурации слотов](guides/configuration.md#fill-cards-with-slots), контракт [обработчика подтверждения](guides/saving-reservations.md#save-slot-reservations-to-the-server) и [настройку фильтра](guides/configuration.md#configure-the-filter). Ассистент работает с текущим API, а не с устаревшим.

### MCP-эндпоинт {#mcp-endpoint}

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

:::note
DHTMLX MCP-сервер охватывает все основные продукты DHTMLX, а не только DHTMLX Booking. Один и тот же эндпоинт и те же инструкции по настройке работают независимо от того, с каким компонентом DHTMLX вы работаете.
:::

## Вопросы о Booking, на которые рассчитан MCP-сервер {#booking-questions-the-mcp-server-is-built-to-answer}

Карточки, слоты и логика синхронизации с сервером в DHTMLX Booking входят в поисковый индекс MCP-сервера. Чаще всего запрашивают следующее:

- Поиск актуального API для [методов](api/overview/booking-methods-overview.md), [событий](api/overview/booking-events-overview.md) и [свойств](api/overview/booking-properties-overview.md), включая методы [Event Bus](api/overview/booking-internal-eventbus-overview.md) и [state](api/overview/booking-internal-state-overview.md).
- Генерация готового к запуску кода [инициализации](guides/initialization.md) нового экземпляра Booking по описанию нужных карточек и слотов.
- Переключение или замена полей карточки через [`cardShape`](api/config/booking-cardshape.md) и [`cardTemplate`](api/config/booking-cardtemplate.md), а также то же самое для информационного блока диалога бронирования через [`infoShape`](api/config/booking-infoshape.md) и [`infoTemplate`](api/config/booking-infotemplate.md).
- Разбор [правил слотов](guides/configuration.md#fill-cards-with-slots) (размер, промежуток, дни и даты) и порядка их приоритета, а также пометка слотов как [занятых или доступных](guides/configuration.md#mark-slots-as-used-or-available).
- Настройка [панели фильтра](guides/configuration.md#configure-the-filter): текстовые поля, диапазоны времени и режим `autoApply`.
- Подключение [синхронизации с сервером](guides/saving-reservations.md): загрузка данных карточек через [`setConfig()`](api/methods/booking-setconfig-method.md) и отправка бронирований через [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md).
- Обработка [событий Booking](api/overview/booking-events-overview.md), таких как `select-slot`, `confirm-slot` и `filter-data`, или их перехват через [`api.intercept()`](api/internal/booking-intercept.md).
- [Локализация](guides/localization.md) виджета через встроенную или пользовательскую [`locale`](api/config/booking-locale.md) и [настройка стилей](guides/styling.md) через CSS-переменные `--wx-booking-*`.
- Интеграция Booking с [React](guides/integration-with-react.md), [Vue](guides/integration-with-vue.md), [Angular](guides/integration-with-angular.md) и [Svelte](guides/integration-with-svelte.md) или конвертация событий из [Scheduler](guides/integration-with-scheduler.md) и [Event Calendar](guides/integration-with-eventcalendar.md) в слоты Booking.

## Что MCP-сервер делает с запросом о Booking {#what-the-mcp-server-does-with-a-booking-prompt}

За вопросом о Booking стоит конвейер Retrieval-Augmented Generation (RAG), который DHTMLX MCP-сервер выполняет поверх Model Context Protocol (MCP). Сервер передаёт каждый запрос в один из двух сценариев: *Search*, который возвращает подходящие страницы справочника, или *Inference*, который читает эти страницы и отвечает самостоятельно. Поскольку запросы о Booking часто смешивают вопрос по коду с деталями собственного бэкенда пользователя, ассистент обрабатывает эти части по отдельности: он выделяет ту, для которой нужна документация, а на остальное отвечает сам.

Проследите путь запроса *«Как настроить обработчик подтверждения, который отправляет бронирование во внутренний API управления бронированиями моей компании и разрешает его, как только тот ответит?»* по этому процессу:

1. В MCP попадает узкая часть: как построить обработчик подтверждения на полях `confirm`, `slot` и `data`.
2. Сервер сопоставляет её с документацией по интеграции с сервером.
3. Написание обработчика подтверждения требует кода, поэтому запрос забирает *Search*. Более узкий вопрос, например о том, какой параметр содержит время начала забронированного слота, ушёл бы в *Inference*.
4. *Search* достаёт подходящие страницы из векторного индекса, построенного по актуальной документации Booking.
5. Эти страницы возвращаются ассистенту в качестве контекста.
6. Ассистент собирает обработчик подтверждения из полей `confirm`, `slot` и `data`, описанных на этих страницах, а затем дописывает конкретную обработку запроса и ответа для целевого бэкенда, опираясь на собственные знания.

Так предложения по Booking остаются привязанными к актуальным правилам слотов и логике бронирования виджета.

## Настройка MCP: инструмент за инструментом {#mcp-setup-tool-by-tool}

Большинство команд, работающих с Booking, регистрируют MCP-эндпоинт один раз, при настройке бэкенда бронирований, а затем переиспользуют эту регистрацию во всех последующих проектах. Механика различается от инструмента к инструменту: где-то это команда CLI, где-то файл конфигурации JSON, но все они указывают на один адрес:

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

Выберите свой инструмент ниже, чтобы увидеть точные шаги настройки.

### Claude Code

:::info
В [официальной документации](https://code.claude.com/docs/en/mcp) перечислены все способы подключения Claude Code к MCP-серверу.
:::

Чтобы зарегистрировать сервер из командной строки, выполните:

~~~jsx
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
~~~

Предпочитаете обойтись без CLI? Тогда добавьте в свой `.mcp.json` следующую запись:

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
[Официальная документация](https://cursor.com/en-US/docs/mcp) описывает все способы настройки MCP в Cursor.
:::

Шаги для добавления сервера:

1. Откройте Settings (`Cmd+Shift+J` на Mac, `Ctrl+Shift+J` на Windows/Linux)
2. Перейдите в **Tools & MCP**
3. Нажмите **Add Custom MCP**
4. Вставьте следующую конфигурацию:

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
Полные сведения об интеграции MCP в Antigravity приведены в [официальной документации](https://antigravity.google/docs/mcp).
:::

Чтобы подключить DHTMLX MCP-сервер к Google Antigravity, выполните следующие шаги:

1. Откройте палитру команд
2. Введите «mcp add»
3. Выберите «HTTP»
4. Укажите следующие значения:
- Имя:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~

#### Antigravity CLI

:::info
Переходите с Gemini CLI? [Соответствующее руководство](https://antigravity.google/docs/gcli-migration#mcp-config-formatting-changes) описывает миграцию на Antigravity CLI.
:::

Чтобы подключить DHTMLX MCP-сервер к Antigravity CLI, создайте файл `mcp_config.json` в одном из следующих мест:

- Глобально: `~/.gemini/config/mcp_config.json`
- В рабочей области: `.agents/mcp_config.json`

Добавьте следующую конфигурацию:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "serverUrl": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

Затем выполните в терминале `agy`.

### ChatGPT

:::info
ChatGPT полностью описывает настройку MCP-коннектора в [официальной документации](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt).
:::

Шаги для настройки коннектора:

1. Перейдите в **Settings** → **Apps & Connectors**
2. Нажмите **Advanced settings**
3. Включите **Developer mode**
4. Вернитесь в **Apps & Connectors** и нажмите «Create»
5. Заполните данные коннектора:
- Имя:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~
- Аутентификация: `No authentication`
6. Нажмите **Create**

После создания коннектора ChatGPT подтягивает документацию с MCP-сервера во время диалогов.

:::info
Для интенсивной работы с кодом другие инструменты с поддержкой MCP могут подойти лучше.
:::

### Другие инструменты {#other-tools}

Если вашего инструмента нет в списке выше, поищите в его настройках «Model Context Protocol» или «Context Sources» и добавьте `https://docs.dhtmlx.com/mcp` как пользовательский источник.

## Как MCP-сервер обращается с данными {#data-handling-behind-the-mcp-server}

DHTMLX MCP-сервер работает полностью вне вашей машины: он не обращается к локальным файлам и не хранит никакой персональной информации.

Логируются только те запросы, которые помогают в отладке или улучшении сервиса.

Коммерческое развёртывание полностью отключает логирование запросов для команд, которым нужна дополнительная гарантия. Договориться о нём можно по адресу `info@dhtmlx.com`.

## Запросы, которые стоит попробовать при работе с Booking {#prompts-to-try-when-building-with-booking}

Называйте объект прежде, чем задать вопрос: карточка, слот, фильтр или обработчик подтверждения. Запросы ниже делают именно это и сгруппированы по задачам.

**Карточки и слоты**

~~~
Как скрыть поля цены и отзывов на карточке Booking? Используй документацию.
~~~
~~~
Как задать длительность слота в 45 минут только для вторников и пятниц в DHTMLX Booking?
~~~
~~~
Как пометить слот как уже забронированный в DHTMLX Booking?
~~~

**Фильтрация**

~~~
Как добавить пользовательский диапазон времени с меткой «Срочно» в панель фильтра DHTMLX Booking?
~~~
~~~
Как сделать, чтобы фильтр Booking применялся автоматически, без нажатия кнопки Search?
~~~

**Бронирования и синхронизация с сервером**

~~~
Как отправить бронирование на мой сервер и разрешить его, как только сервер ответит?
~~~
~~~
Как загрузить данные карточек с REST-эндпоинта и применить их к существующему экземпляру Booking?
~~~
~~~
Как отреагировать на подтверждённое бронирование, не заменяя обработчик подтверждения по умолчанию в DHTMLX Booking?
~~~

**Локализация и стилизация**

~~~
Как переключить DHTMLX Booking на немецкую локаль?
~~~
~~~
Как сделать колонку слотов Booking уже?
~~~

## Полезные привычки при составлении запросов о Booking {#prompt-habits-useful-for-booking}

- **Называйте конкретное свойство.** `cardShape`, `cardTemplate`, `infoShape`, `infoTemplate`, `filterShape` и `formShape` настраивают разные части виджета. Указывайте, какое именно вы имеете в виду, вместо «конфигурация карточки», чтобы ассистент нашёл подходящую страницу справочника.
- **Называйте нужное свойство слотов.** `slots` задаёт правила доступности, `usedSlots` скрывает уже забронированное время, а `availableSlots` заменяет правила явным списком. Называя нужное, вы не дадите ассистенту смешать их в одно свойство.
- **Различайте публичный API и Event Bus.** `setConfig()` и `setConfirmHandler()` покрывают большую часть повседневной настройки, тогда как `api.on()`, `api.exec()`, `api.intercept()` и `api.setNext()` обращаются к внутреннему Event Bus. Указывайте, какой уровень вы имеете в виду, если запрос касается событий.
- **Упоминайте часовой пояс.** Booking работает в локальном времени, поэтому в запросе, затрагивающем серверные данные, стоит указать, приходят ли метки времени в UTC и нужно ли их конвертировать перед передачей в виджет.
