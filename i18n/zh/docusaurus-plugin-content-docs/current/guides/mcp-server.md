---
sidebar_label: DHTMLX MCP server
title: 面向时间段与预订的 DHTMLX Booking MCP 集成
description: 针对 DHTMLX Booking 的卡片、时间段、过滤器和确认处理函数，MCP 服务器让 AI 助手基于当前 API 而非训练时的快照作答。
---

# DHTMLX Booking MCP 服务器：时间段、过滤器与预订 {#dhtmlx-booking-mcp-server-slots-filters-and-reservations}

DHTMLX Booking 为预约控件提供了细致的配置能力：您可以将[时间段规则](guides/configuration.md#fill-cards-with-slots)精确定义到星期几或具体日期，通过[切换默认字段](api/config/booking-cardshape.md)或[换用自定义模板](api/config/booking-cardtemplate.md)来调整卡片布局，并完全自定义结束预约流程的[预订处理函数](api/methods/booking-setconfirmhandler-method.md)。Booking 的时间段规则优先级、布局方式和预订约定都必须与当前实际发布的版本一致，而不是训练时的猜测。

请改为查询 DHTMLX MCP 服务器：它会给出当前的[时间段配置](guides/configuration.md#fill-cards-with-slots)规则、[确认处理函数](guides/saving-reservations.md#save-slot-reservations-to-the-server)约定以及[过滤器设置](guides/configuration.md#configure-the-filter)，因此助手基于当前 API 工作，而不是过时的版本。

### MCP 端点 {#mcp-endpoint}

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

:::note
DHTMLX MCP 服务器覆盖所有主要 DHTMLX 产品，而不仅仅是 DHTMLX Booking。无论您使用哪个 DHTMLX 组件进行开发，端点和配置说明都完全相同。
:::

## MCP 服务器专门用于解答的 Booking 问题 {#booking-questions-the-mcp-server-is-built-to-answer}

DHTMLX Booking 的卡片、时间段和服务器同步逻辑全部收录在 MCP 服务器的可检索索引中。常见的查询包括：

- 查询[方法](api/overview/booking-methods-overview.md)、[事件](api/overview/booking-events-overview.md)和[属性](api/overview/booking-properties-overview.md)的当前 API，包括 [Event Bus](api/overview/booking-internal-eventbus-overview.md) 和 [state](api/overview/booking-internal-state-overview.md) 方法。
- 根据所需卡片和时间段的描述，为新的 Booking 实例生成可直接运行的[初始化](guides/initialization.md)代码。
- 使用 [`cardShape`](api/config/booking-cardshape.md) 和 [`cardTemplate`](api/config/booking-cardtemplate.md) 切换或替换卡片字段，并用 [`infoShape`](api/config/booking-infoshape.md) 和 [`infoTemplate`](api/config/booking-infotemplate.md) 对预约对话框的信息区块做同样的处理。
- 梳理[时间段规则](guides/configuration.md#fill-cards-with-slots)（大小、间隔、星期与日期）及其优先级顺序，并将时间段标记为[已用或可用](guides/configuration.md#mark-slots-as-used-or-available)。
- 配置[过滤栏](guides/configuration.md#configure-the-filter)：文本字段、时间范围和 `autoApply` 模式。
- 打通[服务器同步](guides/saving-reservations.md)：用 [`setConfig()`](api/methods/booking-setconfig-method.md) 加载卡片数据，并通过 [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) 提交预订。
- 处理 `select-slot`、`confirm-slot` 和 `filter-data` 等 [Booking 事件](api/overview/booking-events-overview.md)，或用 [`api.intercept()`](api/internal/booking-intercept.md) 拦截它们。
- 使用内置或自定义的 [`locale`](api/config/booking-locale.md) 对控件进行[本地化](guides/localization.md)，并通过 `--wx-booking-*` CSS 变量进行[样式设置](guides/styling.md)。
- 将 Booking 与 [React](guides/integration-with-react.md)、[Vue](guides/integration-with-vue.md)、[Angular](guides/integration-with-angular.md) 和 [Svelte](guides/integration-with-svelte.md) 集成，或把 [Scheduler](guides/integration-with-scheduler.md) 和 [Event Calendar](guides/integration-with-eventcalendar.md) 的事件转换为 Booking 时间段。

## MCP 服务器如何处理 Booking 提示词 {#what-the-mcp-server-does-with-a-booking-prompt}

每个 Booking 问题背后，都是 DHTMLX MCP 服务器基于 Model Context Protocol（MCP）运行的检索增强生成（RAG）流程。服务器会把每个请求交给两种工作流之一：*Search* 返回匹配的参考页面，*Inference* 则阅读这些页面并自行作答。由于 Booking 提示词经常把编码问题和用户自有后端的细节混在一起，助手会把两者分开处理：拆出需要查文档的部分，其余部分自行回答。

以提示词 *“如何设置一个确认处理函数，将预订提交到公司内部的预约管理 API，并在其响应后完成该预订？”* 为例，看看它如何经过整个流程：

1. 进入 MCP 的内容范围很窄：如何用 `confirm`、`slot` 和 `data` 字段构建确认处理函数。
2. 服务器将其定位到服务器集成相关文档。
3. 编写确认处理函数需要代码，因此由 *Search* 接手（如果是更窄的问题，比如哪个参数携带已预订时间段的开始时间，则会交给 *Inference*）。
4. *Search* 从基于当前 Booking 文档构建的向量索引中取出匹配页面。
5. 这些页面作为上下文返回给助手。
6. 助手根据这些页面描述的 `confirm`、`slot` 和 `data` 字段组装确认处理函数，再凭自身知识补上目标后端所需的具体请求与响应处理。

这样一来，关于 Booking 的建议始终与控件当前的时间段规则和预订处理方式保持一致。

## 各工具的 MCP 配置 {#mcp-setup-tool-by-tool}

多数 Booking 团队在搭建预订后端时注册一次 MCP 端点，此后在每个项目中复用该注册。不同工具的操作方式各异，有的是一条 CLI 命令，有的是一个 JSON 配置文件，但它们都指向同一个地址：

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

请在下方选择您使用的工具，查看具体配置步骤。

### Claude Code

:::info
[官方文档](https://code.claude.com/docs/en/mcp)列出了 Claude Code 连接 MCP 服务器的全部方式。
:::

要从命令行注册服务器，请运行：

~~~jsx
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
~~~

不想使用 CLI？那就改为在 `.mcp.json` 中添加以下条目：

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
[官方文档](https://cursor.com/en-US/docs/mcp)介绍了在 Cursor 中配置 MCP 的所有方式。
:::

添加服务器的步骤：

1. 打开 Settings（Mac 上为 `Cmd+Shift+J`，Windows/Linux 上为 `Ctrl+Shift+J`）
2. 进入 **Tools & MCP**
3. 点击 **Add Custom MCP**
4. 粘贴以下配置：

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
关于 Antigravity 中 MCP 集成的完整说明，请查阅[官方文档](https://antigravity.google/docs/mcp)。
:::

将 DHTMLX MCP 服务器连接到 Google Antigravity 需要完成以下步骤：

1. 打开命令面板
2. 输入 “mcp add”
3. 选择 “HTTP”
4. 填入以下值：
- 名称：
~~~jsx
dhtmlx-mcp
~~~
- URL：
~~~jsx
https://docs.dhtmlx.com/mcp
~~~

#### Antigravity CLI

:::info
从 Gemini CLI 迁移过来？[相关指南](https://antigravity.google/docs/gcli-migration#mcp-config-formatting-changes)说明了迁移到 Antigravity CLI 的方法。
:::

要将 DHTMLX MCP 服务器连接到 Antigravity CLI，请在以下位置之一创建 `mcp_config.json`：

- 全局：`~/.gemini/config/mcp_config.json`
- 工作区：`.agents/mcp_config.json`

添加以下配置：

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "serverUrl": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

然后在终端中运行 `agy`。

### ChatGPT

:::info
ChatGPT 在[官方文档](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt)中完整说明了其 MCP 连接器的配置方法。
:::

配置连接器的步骤：

1. 进入 **Settings** → **Apps & Connectors**
2. 点击 **Advanced settings**
3. 启用 **Developer mode**
4. 返回 **Apps & Connectors** 并点击 “Create”
5. 填写连接器信息：
- 名称：
~~~jsx
dhtmlx-mcp
~~~
- URL：
~~~jsx
https://docs.dhtmlx.com/mcp
~~~
- 认证方式：`No authentication`
6. 点击 **Create**

创建连接器后，ChatGPT 会在对话过程中从 MCP 服务器获取文档。

:::info
对于高强度的编码工作流，其他支持 MCP 的工具可能更合适。
:::

### 其他工具 {#other-tools}

如果上面没有列出您使用的工具，请在其设置中查找 “Model Context Protocol” 或 “Context Sources”，并将 `https://docs.dhtmlx.com/mcp` 添加为自定义来源。

## MCP 服务器背后的数据处理 {#data-handling-behind-the-mcp-server}

DHTMLX MCP 服务器完全运行在您的机器之外：它从不接触本地文件，也不存储任何个人信息。

它记录的查询仅限于有助于调试或改进服务的那些。

对于需要额外保障的团队，商业部署会完全关闭查询日志记录。可通过 `info@dhtmlx.com` 洽谈。

## 使用 Booking 开发时可以试试的提示词 {#prompts-to-try-when-building-with-booking}

提问前先点明对象：卡片、时间段、过滤器还是确认处理函数。下面的提示词正是这样做的，并按任务分组。

**卡片与时间段**

~~~
如何隐藏 Booking 卡片上的价格和评价字段？请参考文档。
~~~
~~~
在 DHTMLX Booking 中，如何只为周二和周五定义 45 分钟的时间段时长？
~~~
~~~
在 DHTMLX Booking 中，如何把某个时间段标记为已被预订？
~~~

**过滤**

~~~
如何在 DHTMLX Booking 的过滤栏中添加一个名为“紧急”的自定义时间范围？
~~~
~~~
如何让 Booking 过滤器无需点击 Search 按钮就自动应用？
~~~

**预订与服务器同步**

~~~
如何把预订提交到我的服务器，并在服务器响应后完成该预订？
~~~
~~~
如何从 REST 端点加载卡片数据，并把它应用到已有的 Booking 实例上？
~~~
~~~
在 DHTMLX Booking 中，如何在不替换默认确认处理函数的前提下响应已确认的预订？
~~~

**本地化与样式**

~~~
如何把 DHTMLX Booking 切换到德语 locale？
~~~
~~~
如何把 Booking 的时间段列调窄一些？
~~~

## 对 Booking 有用的提示词习惯 {#prompt-habits-useful-for-booking}

- **点明具体属性。** `cardShape`、`cardTemplate`、`infoShape`、`infoTemplate`、`filterShape` 和 `formShape` 配置的是控件的不同部分。请说明您指的是哪一个，而不是笼统地说“卡片配置”，这样助手才能检索到对应的参考页面。
- **点明所指的时间段属性。** `slots` 定义可用性规则，`usedSlots` 隐藏已被预订的时间，`availableSlots` 则用一份显式列表取代规则。指明您要用的那一个，助手就不会把它们混成一个属性。
- **区分公开 API 与 Event Bus。** `setConfig()` 和 `setConfirmHandler()` 覆盖了日常配置的大部分场景，而 `api.on()`、`api.exec()`、`api.intercept()` 和 `api.setNext()` 访问的是内部的 Event Bus。当提示词涉及事件时，请说明您指的是哪一层。
- **提及时区。** Booking 以本地时间工作，因此涉及服务器数据的提示词应说明时间戳是否以 UTC 形式传入、在进入控件前是否需要转换。
