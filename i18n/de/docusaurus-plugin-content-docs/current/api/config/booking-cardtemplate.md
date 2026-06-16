---
sidebar_label: cardTemplate
title: cardTemplate
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die cardTemplate-Konfiguration. Lesen Sie Entwickleranleitungen und API-Referenz, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# cardTemplate

### Beschreibung {#description}

@short: Optional. Ermöglicht das Anwenden einer Vorlage auf den linken Block einer Karte

Die Eigenschaft legt die HTML-Struktur und das Layout des Blocks jeder Karte (die linke Seite jeder Karte) fest. Sie können damit steuern, welche Felder angezeigt werden, wie sie angeordnet sind und wie sie aussehen.

:::info
Sie können auch festlegen, welche Felder angezeigt werden sollen, indem Sie die Eigenschaft [`cardShape`](api/config/booking-cardshape.md) verwenden.
:::

### Verwendung {#usage}

~~~jsx {}
cardTemplate?: ({item: obj}) => string;
~~~

### Parameter {#parameters}

`cardTemplate` erwartet eine Funktion, die ein `item`-Objekt (Karte) als Eingabe entgegennimmt und einen HTML-String zurückgibt, der das Aussehen der Karte definiert.

### Beispiel {#example}

Im folgenden Beispiel erstellen wir eine Funktion, die das `item`-Objekt (Karte) entgegennimmt und HTML für eine Karte zurückgibt, die ein Vorschaubild (item.preview), eine Kategorie (item.category), einen Titel (item.title) und einen Preis (item.price) enthält. Sie müssen Ihre eigene HTML-Vorlage erstellen, die auf eine Karte angewendet wird, und den `template`-Helper importieren. Übergeben Sie die Funktion anschließend an die Booking-Konfiguration, indem Sie sie der Eigenschaft `cardTemplate` zuweisen.

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
    /* weitere Stile */
</style>

<script>
    const { Booking, template } = booking; //Template-Helper importieren

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
	    cardTemplate: template(cardPreviewTemplate), // Funktion an die Booking-Konfiguration übergeben
    });
    // weitere Parameter
</script>
~~~

Das folgende Snippet zeigt, wie eine Vorlage auf den linken Block einer Karte angewendet wird:

<iframe src="https://snippet.dhtmlx.com/k2v01vng?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Verwandte Artikel**:

- [Struktur der Karten definieren](guides/configuration.md#define-the-structure-of-cards)
- [`cardShape`](api/config/booking-cardshape.md)
