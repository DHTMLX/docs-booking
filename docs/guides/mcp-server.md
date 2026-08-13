---
sidebar_label: DHTMLX MCP server
title: DHTMLX Booking MCP integration for slots and reservations
description: For DHTMLX Booking cards, slots, filters, and the confirm handler, the MCP server keeps AI assistants on the current API instead of a training snapshot.
---

# DHTMLX Booking MCP server: slots, filters, and reservations

DHTMLX Booking exposes detailed configuration for a scheduling widget: you can define [slot rules](guides/configuration.md#fill-cards-with-slots) down to the day or the exact date, adjust a card's layout by either [toggling its default fields](api/config/booking-cardshape.md) or [swapping in a custom template](api/config/booking-cardtemplate.md), and fully customize the [reservation handler](api/methods/booking-setconfirmhandler-method.md) that closes out the booking flow. Booking's slot-rule priority, layout approach, and reservation contract all need to match what's actually shipping today, not a training-time guess.

Query the DHTMLX MCP server instead: it surfaces the current [slot configuration](guides/configuration.md#fill-cards-with-slots) rules, the [confirm handler](guides/saving-reservations.md#save-slot-reservations-to-the-server) contract, and the [filter setup](guides/configuration.md#configure-the-filter), so the assistant works from the current API instead of an outdated one.

### MCP endpoint

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

Behind a Booking question sits a Retrieval-Augmented Generation (RAG) pipeline the DHTMLX MCP server runs over the Model Context Protocol (MCP). The server hands each request to one of two workflows: *Search*, which returns matching reference pages, or *Inference*, which reads those pages and answers on its own. Since Booking prompts often mix a coding question with details about the user's own backend, the assistant handles the two separately: it breaks out the part that needs documentation and answers the rest itself.

Follow the prompt *"How do I set up a confirm handler that posts a reservation to my company's internal booking-management API and resolves it once that responds?"* through the process:

1. What lands in MCP is narrow: how to structure a confirm handler using the `confirm`, `slot`, and `data` fields.
2. The server tracks it to the server-integration documentation.
3. Writing a confirm handler calls for code, so *Search* picks it up (a narrower question, like which parameter carries the booked slot's start time, would go to *Inference* instead).
4. *Search* draws the matching pages from a vector index built on the current Booking documentation.
5. Those pages arrive back at the assistant as context.
6. The assistant assembles the confirm handler from the `confirm`, `slot`, and `data` fields those pages describe, then fills in the specific request and response handling for the target backend from its own knowledge.

Booking suggestions stay tied to the widget's current slot rules and reservation handling this way.

## MCP setup, tool by tool

Most Booking teams register the MCP endpoint once, when they set up the reservation backend, then reuse that registration across every project after. The mechanics differ from tool to tool, a CLI command for some, a JSON configuration file for others, but all of them point at this address:

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

Pick your tool below for its exact setup steps.

### Claude Code

:::info
The [official documentation](https://code.claude.com/docs/en/mcp) lists every way Claude Code connects to an MCP server.
:::

To register the server from the command line, run:

~~~jsx
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
~~~

Prefer to skip the CLI? Add the following entry to your `.mcp.json` instead:

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

The DHTMLX MCP server runs entirely off your machine: it never touches local files and does not store any personal information.

The only queries it logs are the ones that help with debugging or improving the service.

A commercial deployment turns query logging off completely for teams that need the extra guarantee. Arrange one through `info@dhtmlx.com`.

## Prompts to try when building with Booking

Name the object before you ask: a card, a slot, the filter, or the confirm handler. The prompts below do exactly that, grouped by task.

**Cards and slots**

~~~
How do I hide the price and review fields on a Booking card? Use the docs.
~~~
~~~
How do I define a 45-minute slot duration for Tuesdays and Fridays only in DHTMLX Booking?
~~~
~~~
How do I mark a slot as already booked in DHTMLX Booking?
~~~

**Filtering**

~~~
How do I add a custom time range labeled "Urgent" to the DHTMLX Booking filter bar?
~~~
~~~
How do I make the Booking filter apply automatically without clicking the Search button?
~~~

**Reservations and server sync**

~~~
How do I post a reservation to my server and resolve it once the server responds?
~~~
~~~
How do I load card data from a REST endpoint and apply it to an existing Booking instance?
~~~
~~~
How do I react to a confirmed reservation without replacing the default confirm handler in DHTMLX Booking?
~~~

**Localization and styling**

~~~
How do I switch DHTMLX Booking to the German locale?
~~~
~~~
How do I make the Booking slots column narrower?
~~~

## Prompt habits useful for Booking

- **Name the exact property.** `cardShape`, `cardTemplate`, `infoShape`, `infoTemplate`, `filterShape`, and `formShape` all configure different parts of the widget. State which one you mean instead of "the card config" so the assistant retrieves the matching reference.
- **Name the slot property you mean.** `slots` defines availability rules, `usedSlots` hides already-booked times, and `availableSlots` replaces the rules with an explicit list. Naming the one you want prevents the assistant from mixing them into one property.
- **Distinguish the public API from the Event Bus.** `setConfig()` and `setConfirmHandler()` cover most day-to-day configuration, while `api.on()`, `api.exec()`, `api.intercept()`, and `api.setNext()` reach the internal Event Bus. State which layer you mean when a prompt touches events.
- **Mention the timezone.** Booking works in local time, so a prompt involving server data should say whether timestamps arrive in UTC and need conversion before they reach the widget.
