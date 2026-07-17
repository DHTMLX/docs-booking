# Translation Glossary — All documentation template phrases

Purpose: a single reference for translations of recurring template phrases in the documentation
([../docs/](../docs/)). Consult it when translating new articles and when reviewing localizations —
the wording and markdown markup (`**...**`, `### ...`, full-width `：` for zh) must match verbatim.

The **canonical** (most frequent) variant is given.

---

## 1. Section labels (bold lead before a list)

The colon stays **outside** the bold markers (`**...**:`); zh uses a full-width colon `：`.

| EN | ru | de | ko | zh |
|---|---|---|---|---|
| `**Related articles**:` | `**Связанные статьи**:` | `**Verwandte Artikel**:` | `**관련 문서**:` | `**相关文章**：` |

## 2. Section headings

Headings keep the original English slug as a `{#...}` anchor (e.g. `### Описание {#description}`) so
cross-page `#anchor` links stay valid — only the visible title is translated.

**API-page template:**

| EN | ru | de | ko | zh |
|---|---|---|---|---|
| `### Description` | `### Описание` | `### Beschreibung` | `### 설명` | `### 描述` |
| `### Usage` | `### Использование` | `### Verwendung` | `### 사용법` | `### 用法` |
| `### Example` | `### Пример` | `### Beispiel` | `### 예제` | `### 示例` |
| `### Parameters` | `### Параметры` | `### Parameter` | `### 파라미터` | `### 参数` |
| `### Returns` | `### Возвращает` | `### Rückgabewert` | `### 반환값` | `### 返回值` |
| `### Default config` | `### Конфигурация по умолчанию` | `### Standardkonfiguration` | `### 기본 설정` | `### 默认配置` |

ko: `파라미터` is canonical; the variants `매개변수` and untranslated `Parameters` also occur and
should be normalized to `파라미터`.

**Changelog headings (`news/whats_new.md`):**

| EN | ru | de | ko | zh |
|---|---|---|---|---|
| `### New functionality` | `### Новая функциональность` | `### Neue Funktionalität` | `### 새로운 기능` | `### 新功能` |
| `### Initial functionality` | `### Начальная функциональность` | `### Initiale Funktionalität` | `### 초기 기능` | `### 初始功能` |
| `### Fixes` | `### Исправления` | `### Fehlerbehebungen` | `### 수정 사항` | `### 修复` |

**Navigation heading:**

| EN | ru | de | ko | zh |
|---|---|---|---|---|
| `## What's next` | `## Что дальше` | `## Wie geht es weiter?` | `## 다음 단계` | `## 下一步` |

## 3. Admonition block titles (`:::note`, `:::tip` …)

The titles of these blocks come **not from markdown**, but from the `theme.admonition.*` keys in
`i18n/<locale>/code.json` (in EN — Docusaurus built-in defaults). In `.md` the block type (`:::note`,
`:::tip`, …) is not translated — only the `message` in `code.json` changes.

The Docusaurus theme renders the title with `text-transform: uppercase`, so for ru/de the visible
title is always UPPERCASE, while ko/zh have no letter case. Canon: **capitalized first letter**, with
words distinct between types (no `caution`/`warning` duplicates).

| Type | ru | de | ko | zh |
|---|---|---|---|---|
| `:::note` | `Примечание` | `Hinweis` | `노트` | `备注` |
| `:::tip` | `Подсказка` | `Tipp` | `팁` | `提示` |
| `:::info` | `К сведению` | `Info` | `정보` | `信息` |
| `:::warning` | `Предупреждение` | `Warnung` | `경고` | `警告` |
| `:::caution` | `Осторожно` | `Vorsicht` | `주의` | `注意` |
| `:::danger` | `Опасно` | `Gefahr` | `위험` | `危险` |
