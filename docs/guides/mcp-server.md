---
sidebar_label: DHTMLX MCP server
title: DHTMLX Booking MCP server explains slots and reservations
description: For DHTMLX Booking cards, slots, filters, and the confirm handler, the MCP server keeps AI assistants on the current API instead of a training snapshot.
---

# DHTMLX Booking MCP server: slot rules, not guesswork

DHTMLX Booking packs a few settings that quietly override each other. [Slot rules](guides/configuration.md#fill-cards-with-slots) follow a strict priority order, [`cardShape`](api/config/booking-cardshape.md) and [`cardTemplate`](api/config/booking-cardtemplate.md) both control the same card layout, and [`usedSlots`](guides/configuration.md#mark-slots-as-used) and [`availableSlots`](guides/configuration.md#mark-slots-as-available) decide what a user can click in different ways. Training data rarely captures these details: an assistant might merge `cardShape` into a `cardTemplate` function, miss that `availableSlots` replaces the slot list rather than filtering it, or wire [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) to an event name the API renamed since.

Query the DHTMLX MCP server instead: it surfaces the current [slot configuration](guides/configuration.md#fill-cards-with-slots) rules, the [confirm handler](guides/saving-reservations.md#save-slot-reservations-to-the-server) contract, and the [filter setup](guides/configuration.md#configure-the-filter), so the assistant works from today's API rather than last year's.

**MCP endpoint**

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

:::note
The DHTMLX MCP server covers all major DHTMLX products, not only DHTMLX Booking. The same endpoint and configuration instructions work regardless of which DHTMLX component you are building with.
:::

## Booking questions the MCP server is built to answer

DHTMLX Booking's cards, slots, and server-sync logic all live in the MCP server's searchable index. Frequent lookups include:

- Looking up the current API for [methods](api/overview/booking-methods-overview.md), [events](api/overview/booking-events-overview.md), and [properties](api/overview/booking-properties-overview.md), including the [Event Bus](api/overview/booking-internal-eventbus-overview.md) and [state](api/overview/booking-internal-state-overview.md) methods.
- Generating ready-to-run [initialization](guides/initialization.md) code for a new Booking instance from a description of the required cards and slots.
- Toggling or replacing card fields with [`cardShape`](api/config/booking-cardshape.md) and [`cardTemplate`](api/config/booking-cardtemplate.md), and doing the same for the booking dialog's info block with [`infoShape`](api/config/booking-infoshape.md) and [`infoTemplate`](api/config/booking-infotemplate.md).
- Working out [slot rules](guides/configuration.md#fill-cards-with-slots) (size, gap, days, and dates) and their priority order, plus marking slots [used or available](guides/configuration.md#mark-slots-as-used-or-available).
- Configuring the [filter bar](guides/configuration.md#configure-the-filter): text fields, time ranges, and `autoApply` mode.
- Wiring [server sync](guides/saving-reservations.md): loading card data with [`setConfig()`](api/methods/booking-setconfig-method.md) and posting reservations through [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md).
- Handling [Booking events](api/overview/booking-events-overview.md) such as `select-slot`, `confirm-slot`, and `filter-data`, or intercepting them with [`api.intercept()`](api/internal/booking-intercept.md).
- [Localizing](guides/localization.md) the widget with a built-in or custom [`locale`](api/config/booking-locale.md), and [styling](guides/styling.md) it through `--wx-booking-*` CSS variables.
- Integrating Booking with [React](guides/integration-with-react.md), [Vue](guides/integration-with-vue.md), [Angular](guides/integration-with-angular.md), and [Svelte](guides/integration-with-svelte.md), or converting events from [Scheduler](guides/integration-with-scheduler.md) and [Event Calendar](guides/integration-with-eventcalendar.md) into Booking slots.

## What the MCP server does with a Booking prompt

Think of the MCP server as offering two speeds of help: fetch the paperwork and read it yourself, or ask someone who already has. That choice comes down to two workflows, *Search* and *Inference*, and the assistant picks one per request rather than running both on every query. A shared Retrieval-Augmented Generation (RAG) index of the Booking documentation backs both workflows, accessed through the single Model Context Protocol (MCP) endpoint.

Take the prompt *"How do I set up a confirm handler that posts a reservation and resolves it once the server responds?"* The assistant sends it to *Search* because writing that handler means generating code: the workflow matches it against the server-integration documentation, returns the reference pages, and the assistant builds the handler from the `confirm`, `slot`, and `data` fields those pages describe. A narrower question, such as which parameter carries the booked slot's start time, goes to *Inference* instead: the workflow reads the same pages and hands back the parameter name directly, skipping the code-writing step entirely.

## Plugging the MCP endpoint into your AI tool

Most Booking teams register the MCP endpoint once, right when they scaffold the reservation backend, then reuse that registration across every project after. Only the mechanics differ from tool to tool: a CLI command for some, a JSON configuration file for others.

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

Below are setup instructions for commonly used tools.

### Claude Code

:::info
The [official documentation](https://code.claude.com/docs/en/mcp) lists every way Claude Code connects to an MCP server.
:::

To register the server from the command line, run:

~~~jsx
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
~~~

For manual setup, add the following to your `mcp.json`:

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
The [official documentation](https://cursor.com/en-US/docs/mcp) covers every way to configure MCP in Cursor.
:::

Steps to add the server:

1. Open Settings (`Cmd+Shift+J` on Mac, `Ctrl+Shift+J` on Windows/Linux)
2. Go to **Tools & MCP**
3. Click **Add Custom MCP**
4. Paste the following config:

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
For complete details on MCP integration in Antigravity, check the [official documentation](https://antigravity.google/docs/mcp).
:::

These are the steps to complete for connecting DHTMLX MCP server with Google Antigravity:

1. Open the command palette
2. Type "mcp add"
3. Select "HTTP"
4. Provide the following values:
- Name:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~

#### Antigravity CLI

:::info
Coming from Gemini CLI? The [related guide](https://antigravity.google/docs/gcli-migration#mcp-config-formatting-changes) explains the migration to Antigravity CLI.
:::

To connect the DHTMLX MCP server to Antigravity CLI, create `mcp_config.json` in one of these locations:

- Global: `~/.gemini/config/mcp_config.json`
- Workspace: `.agents/mcp_config.json`

Add the following configuration:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "serverUrl": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

Then run `agy` in the terminal.

### ChatGPT

:::info
ChatGPT documents its MCP connector setup in full in the [official documentation](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt).
:::

Steps to configure the connector:

1. Go to **Settings** → **Apps & Connectors**
2. Click **Advanced settings**
3. Enable **Developer mode**
4. Return to **Apps & Connectors** and click "Create"
5. Fill in the connector details:
- Name:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~
- Authentication: `No authentication`
6. Click **Create**

After you create the connector, ChatGPT pulls documentation from the MCP server during conversations.

:::info
For intensive coding workflows, other MCP-aware tools may be a better fit.
:::

### Other tools

If your tool isn't listed above, check its settings for "Model Context Protocol" or "Context Sources" and add `https://docs.dhtmlx.com/mcp` as a custom source.

## Data handling behind the MCP server

The MCP server is a hosted service: nothing runs on your machine, no files from your environment are read, and no personal user data is stored.

Queries may be logged for debugging and service improvement purposes.

Teams that require stricter privacy guarantees can request a commercial deployment with query logging disabled. Contact us at `info@dhtmlx.com` for details.

## Prompts to try when building with Booking

Name the object before you ask: a card, a slot, the filter, or the confirm handler. The prompts below do exactly that, grouped by task.

**Cards and slots**

~~~
How do I hide the price and review fields on a card using cardShape in DHTMLX Booking? Use the docs.
~~~
~~~
How do I define a 45-minute slot duration for Tuesdays and Fridays only, using the slots array?
~~~
~~~
How do I mark a slot as already booked with usedSlots in DHTMLX Booking?
~~~

**Filtering**

~~~
How do I add a custom time range labeled "Urgent" to the DHTMLX Booking filter bar?
~~~
~~~
How do I enable autoApply so the filter runs without clicking the Search button?
~~~

**Reservations and server sync**

~~~
How do I use setConfirmHandler to post a reservation and call confirm.done() once the server responds?
~~~
~~~
How do I load card data from a REST endpoint and apply it to an existing Booking instance with setConfig?
~~~
~~~
How do I listen for the confirm-slot event without replacing the default confirm handler in DHTMLX Booking?
~~~

**Localization and styling**

~~~
How do I switch DHTMLX Booking to the German locale with setLocale?
~~~
~~~
How do I override the --wx-booking-slots-width variable for a narrower layout?
~~~

## Prompt habits useful for Booking

- **Name the exact property.** `cardShape`, `cardTemplate`, `infoShape`, `infoTemplate`, `filterShape`, and `formShape` all configure different parts of the widget. State which one you mean instead of "the card config" so the assistant retrieves the matching reference.
- **Name the slot property you mean.** `slots` defines availability rules, `usedSlots` hides already-booked times, and `availableSlots` replaces the rules with an explicit list. Naming the one you want prevents the assistant from mixing them into one property.
- **Distinguish the public API from the Event Bus.** `setConfig()` and `setConfirmHandler()` cover most day-to-day configuration, while `api.on()`, `api.exec()`, `api.intercept()`, and `api.setNext()` reach the internal Event Bus. State which layer you mean when a prompt touches events.
- **Mention the timezone.** Booking works in local time, so a prompt involving server data should say whether timestamps arrive in UTC and need conversion before they reach the widget.
