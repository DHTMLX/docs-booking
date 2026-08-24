---
sidebar_label: DHTMLX MCP server
title: DHTMLX Booking MCP-Integration für Slots und Reservierungen
description: Für Karten, Slots, Filter und den Bestätigungs-Handler von DHTMLX Booking hält der MCP-Server AI-Assistenten am aktuellen API statt an einem Trainings-Snapshot.
---

# DHTMLX Booking MCP-Server: Slots, Filter und Reservierungen {#dhtmlx-booking-mcp-server-slots-filters-and-reservations}

DHTMLX Booking bietet eine detaillierte Konfiguration für ein Buchungs-Widget: Sie können [Slot-Regeln](guides/configuration.md#fill-cards-with-slots) bis auf den Wochentag oder das exakte Datum definieren, das Layout einer Karte anpassen, indem Sie entweder [ihre Standardfelder umschalten](api/config/booking-cardshape.md) oder [ein eigenes Template einsetzen](api/config/booking-cardtemplate.md), und den [Reservierungs-Handler](api/methods/booking-setconfirmhandler-method.md) vollständig anpassen, der den Buchungsablauf abschließt. Die Priorität der Slot-Regeln, der Layout-Ansatz und der Reservierungs-Vertrag von Booking müssen dem entsprechen, was heute tatsächlich ausgeliefert wird, und nicht einer Vermutung aus dem Trainingsstand.

Fragen Sie stattdessen den DHTMLX MCP-Server ab: Er liefert die aktuellen Regeln der [Slot-Konfiguration](guides/configuration.md#fill-cards-with-slots), den Vertrag des [Bestätigungs-Handlers](guides/saving-reservations.md#save-slot-reservations-to-the-server) und das [Filter-Setup](guides/configuration.md#configure-the-filter), sodass der Assistent mit dem aktuellen API arbeitet statt mit einem veralteten.

### MCP-Endpunkt {#mcp-endpoint}

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

:::note
Der DHTMLX MCP-Server deckt alle wichtigen DHTMLX-Produkte ab, nicht nur DHTMLX Booking. Derselbe Endpunkt und dieselben Konfigurationsanweisungen funktionieren unabhängig davon, mit welcher DHTMLX-Komponente Sie arbeiten.
:::

## Booking-Fragen, für die der MCP-Server gebaut ist {#booking-questions-the-mcp-server-is-built-to-answer}

Die Karten, Slots und die Server-Sync-Logik von DHTMLX Booking liegen alle im durchsuchbaren Index des MCP-Servers. Häufige Abfragen sind unter anderem:

- Das aktuelle API für [Methoden](api/overview/booking-methods-overview.md), [Events](api/overview/booking-events-overview.md) und [Eigenschaften](api/overview/booking-properties-overview.md) nachschlagen, einschließlich der [Event Bus](api/overview/booking-internal-eventbus-overview.md)- und [state](api/overview/booking-internal-state-overview.md)-Methoden.
- Sofort lauffähigen [Initialisierungscode](guides/initialization.md) für eine neue Booking-Instanz aus einer Beschreibung der benötigten Karten und Slots generieren.
- Kartenfelder mit [`cardShape`](api/config/booking-cardshape.md) und [`cardTemplate`](api/config/booking-cardtemplate.md) umschalten oder ersetzen sowie dasselbe für den Informationsblock des Buchungsdialogs mit [`infoShape`](api/config/booking-infoshape.md) und [`infoTemplate`](api/config/booking-infotemplate.md) tun.
- [Slot-Regeln](guides/configuration.md#fill-cards-with-slots) (Größe, Abstand, Tage und Daten) und ihre Prioritätsreihenfolge ausarbeiten sowie Slots als [belegt oder verfügbar](guides/configuration.md#mark-slots-as-used-or-available) markieren.
- Die [Filterleiste](guides/configuration.md#configure-the-filter) konfigurieren: Textfelder, Zeitbereiche und den `autoApply`-Modus.
- Die [Server-Synchronisierung](guides/saving-reservations.md) verdrahten: Kartendaten mit [`setConfig()`](api/methods/booking-setconfig-method.md) laden und Reservierungen über [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) senden.
- [Booking-Events](api/overview/booking-events-overview.md) wie `select-slot`, `confirm-slot` und `filter-data` behandeln oder sie mit [`api.intercept()`](api/internal/booking-intercept.md) abfangen.
- Das Widget mit einer eingebauten oder eigenen [`locale`](api/config/booking-locale.md) [lokalisieren](guides/localization.md) und es über `--wx-booking-*`-CSS-Variablen [gestalten](guides/styling.md).
- Booking mit [React](guides/integration-with-react.md), [Vue](guides/integration-with-vue.md), [Angular](guides/integration-with-angular.md) und [Svelte](guides/integration-with-svelte.md) integrieren oder Events aus [Scheduler](guides/integration-with-scheduler.md) und [Event Calendar](guides/integration-with-eventcalendar.md) in Booking-Slots umwandeln.

## Was der MCP-Server mit einem Booking-Prompt macht {#what-the-mcp-server-does-with-a-booking-prompt}

Hinter einer Booking-Frage steht eine Retrieval-Augmented-Generation-(RAG)-Pipeline, die der DHTMLX MCP-Server über das Model Context Protocol (MCP) ausführt. Der Server übergibt jede Anfrage an einen von zwei Workflows: *Search*, der passende Referenzseiten zurückgibt, oder *Inference*, der diese Seiten liest und selbst antwortet. Da Booking-Prompts oft eine Coding-Frage mit Details zum eigenen Backend des Nutzers vermischen, behandelt der Assistent beides getrennt: Er löst den Teil heraus, für den Dokumentation nötig ist, und beantwortet den Rest selbst.

Verfolgen Sie den Prompt *"Wie richte ich einen Bestätigungs-Handler ein, der eine Reservierung an das interne Buchungsverwaltungs-API meines Unternehmens sendet und sie auflöst, sobald dieses antwortet?"* durch den Prozess:

1. Was im MCP landet, ist eng umrissen: wie man einen Bestätigungs-Handler mit den Feldern `confirm`, `slot` und `data` aufbaut.
2. Der Server ordnet das der Dokumentation zur Server-Integration zu.
3. Einen Bestätigungs-Handler zu schreiben verlangt Code, also greift *Search* zu (eine engere Frage, etwa welcher Parameter die Startzeit des gebuchten Slots trägt, ginge stattdessen an *Inference*).
4. *Search* zieht die passenden Seiten aus einem Vektorindex, der auf der aktuellen Booking-Dokumentation aufgebaut ist.
5. Diese Seiten kommen als Kontext beim Assistenten an.
6. Der Assistent baut den Bestätigungs-Handler aus den Feldern `confirm`, `slot` und `data` zusammen, die diese Seiten beschreiben, und ergänzt dann aus eigenem Wissen die konkrete Request- und Response-Behandlung für das Ziel-Backend.

So bleiben Booking-Vorschläge an die aktuellen Slot-Regeln und die Reservierungslogik des Widgets gebunden.

## MCP-Setup, Tool für Tool {#mcp-setup-tool-by-tool}

Die meisten Booking-Teams registrieren den MCP-Endpunkt einmal, wenn sie das Reservierungs-Backend aufsetzen, und verwenden diese Registrierung danach in jedem weiteren Projekt wieder. Die Mechanik unterscheidet sich von Tool zu Tool: bei den einen ist es ein CLI-Befehl, bei den anderen eine JSON-Konfigurationsdatei. Alle zeigen jedoch auf diese Adresse:

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

Wählen Sie unten Ihr Tool für die genauen Einrichtungsschritte.

### Claude Code

:::info
Die [offizielle Dokumentation](https://code.claude.com/docs/en/mcp) listet jede Möglichkeit auf, wie Claude Code sich mit einem MCP-Server verbindet.
:::

Um den Server über die Kommandozeile zu registrieren, führen Sie aus:

~~~jsx
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
~~~

Lieber ohne CLI? Fügen Sie stattdessen den folgenden Eintrag in Ihre `.mcp.json` ein:

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
Die [offizielle Dokumentation](https://cursor.com/en-US/docs/mcp) behandelt jede Möglichkeit, MCP in Cursor zu konfigurieren.
:::

Schritte zum Hinzufügen des Servers:

1. Öffnen Sie Settings (`Cmd+Shift+J` auf Mac, `Ctrl+Shift+J` auf Windows/Linux)
2. Gehen Sie zu **Tools & MCP**
3. Klicken Sie auf **Add Custom MCP**
4. Fügen Sie die folgende Konfiguration ein:

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
Vollständige Details zur MCP-Integration in Antigravity finden Sie in der [offiziellen Dokumentation](https://antigravity.google/docs/mcp).
:::

Diese Schritte sind auszuführen, um den DHTMLX MCP-Server mit Google Antigravity zu verbinden:

1. Öffnen Sie die Befehlspalette
2. Geben Sie "mcp add" ein
3. Wählen Sie "HTTP"
4. Geben Sie die folgenden Werte an:
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
Sie kommen von der Gemini CLI? Die [zugehörige Anleitung](https://antigravity.google/docs/gcli-migration#mcp-config-formatting-changes) erklärt die Migration zur Antigravity CLI.
:::

Um den DHTMLX MCP-Server mit der Antigravity CLI zu verbinden, legen Sie `mcp_config.json` an einem dieser Orte an:

- Global: `~/.gemini/config/mcp_config.json`
- Workspace: `.agents/mcp_config.json`

Fügen Sie die folgende Konfiguration hinzu:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "serverUrl": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

Führen Sie dann `agy` im Terminal aus.

### ChatGPT

:::info
ChatGPT dokumentiert die Einrichtung seines MCP-Connectors vollständig in der [offiziellen Dokumentation](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt).
:::

Schritte zur Konfiguration des Connectors:

1. Gehen Sie zu **Settings** → **Apps & Connectors**
2. Klicken Sie auf **Advanced settings**
3. Aktivieren Sie **Developer mode**
4. Kehren Sie zu **Apps & Connectors** zurück und klicken Sie auf "Create"
5. Füllen Sie die Connector-Details aus:
- Name:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~
- Authentifizierung: `No authentication`
6. Klicken Sie auf **Create**

Nachdem Sie den Connector erstellt haben, zieht ChatGPT während der Konversationen Dokumentation vom MCP-Server.

:::info
Für intensive Coding-Workflows können andere MCP-fähige Tools besser passen.
:::

### Weitere Tools {#other-tools}

Wenn Ihr Tool oben nicht aufgeführt ist, prüfen Sie dessen Einstellungen auf "Model Context Protocol" oder "Context Sources" und fügen Sie `https://docs.dhtmlx.com/mcp` als benutzerdefinierte Quelle hinzu.

## Datenverarbeitung hinter dem MCP-Server {#data-handling-behind-the-mcp-server}

Der DHTMLX MCP-Server läuft vollständig außerhalb Ihres Rechners: Er greift nie auf lokale Dateien zu und speichert keinerlei persönliche Informationen.

Die einzigen Abfragen, die er protokolliert, sind jene, die beim Debuggen oder bei der Verbesserung des Dienstes helfen.

Ein kommerzielles Deployment schaltet die Abfrage-Protokollierung für Teams, die diese zusätzliche Zusicherung benötigen, vollständig ab. Vereinbaren Sie es über `info@dhtmlx.com`.

## Prompts zum Ausprobieren beim Entwickeln mit Booking {#prompts-to-try-when-building-with-booking}

Benennen Sie das Objekt, bevor Sie fragen: eine Karte, einen Slot, den Filter oder den Bestätigungs-Handler. Genau das tun die folgenden Prompts, gruppiert nach Aufgabe.

**Karten und Slots**

~~~
Wie blende ich die Preis- und Bewertungsfelder auf einer Booking-Karte aus? Nutze die Dokumentation.
~~~
~~~
Wie definiere ich in DHTMLX Booking eine Slot-Dauer von 45 Minuten nur für Dienstage und Freitage?
~~~
~~~
Wie markiere ich einen Slot in DHTMLX Booking als bereits gebucht?
~~~

**Filtern**

~~~
Wie füge ich der Filterleiste von DHTMLX Booking einen eigenen Zeitbereich mit der Bezeichnung "Dringend" hinzu?
~~~
~~~
Wie sorge ich dafür, dass der Booking-Filter automatisch angewendet wird, ohne den Search-Button zu klicken?
~~~

**Reservierungen und Server-Synchronisierung**

~~~
Wie sende ich eine Reservierung an meinen Server und löse sie auf, sobald der Server antwortet?
~~~
~~~
Wie lade ich Kartendaten von einem REST-Endpunkt und wende sie auf eine bestehende Booking-Instanz an?
~~~
~~~
Wie reagiere ich in DHTMLX Booking auf eine bestätigte Reservierung, ohne den Standard-Bestätigungs-Handler zu ersetzen?
~~~

**Lokalisierung und Gestaltung**

~~~
Wie stelle ich DHTMLX Booking auf die deutsche Locale um?
~~~
~~~
Wie mache ich die Slot-Spalte von Booking schmaler?
~~~

## Prompt-Gewohnheiten, die bei Booking helfen {#prompt-habits-useful-for-booking}

- **Benennen Sie die genaue Eigenschaft.** `cardShape`, `cardTemplate`, `infoShape`, `infoTemplate`, `filterShape` und `formShape` konfigurieren jeweils andere Teile des Widgets. Sagen Sie, welche Sie meinen, statt "die Kartenkonfiguration", damit der Assistent die passende Referenz findet.
- **Benennen Sie die gemeinte Slot-Eigenschaft.** `slots` definiert Verfügbarkeitsregeln, `usedSlots` blendet bereits gebuchte Zeiten aus, und `availableSlots` ersetzt die Regeln durch eine explizite Liste. Wenn Sie die gewünschte benennen, vermischt der Assistent sie nicht zu einer einzigen Eigenschaft.
- **Unterscheiden Sie das öffentliche API vom Event Bus.** `setConfig()` und `setConfirmHandler()` decken den größten Teil der täglichen Konfiguration ab, während `api.on()`, `api.exec()`, `api.intercept()` und `api.setNext()` den internen Event Bus ansprechen. Sagen Sie, welche Ebene Sie meinen, wenn ein Prompt Events betrifft.
- **Erwähnen Sie die Zeitzone.** Booking arbeitet in lokaler Zeit; ein Prompt mit Serverdaten sollte daher angeben, ob Zeitstempel in UTC eintreffen und vor dem Widget konvertiert werden müssen.
