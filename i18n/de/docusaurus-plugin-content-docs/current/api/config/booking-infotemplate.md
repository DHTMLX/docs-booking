---
sidebar_label: infoTemplate
title: infoTemplate
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie mehr über die infoTemplate-Konfiguration. Lesen Sie Entwicklerhandbücher und API-Referenz, testen Sie Code-Beispiele und Live-Demos, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# infoTemplate

### Beschreibung {#description}

@short: Optional. Ermöglicht das Anwenden einer Vorlage auf den Informationsblock im Booking-Dialog

### Verwendung {#usage}

~~~jsx {}
infoTemplate?: ({item: obj, slot: number}) => string;
~~~

### Parameter {#parameters}

`infoTemplate` nimmt das `card`-Element-Objekt und den ausgewählten `slot`-Zeitstempel als Eingabe entgegen und gibt einen HTML-String zurück.


### Beispiel {#example}

Im folgenden Beispiel definieren wir die Funktion `cardInfoTemplate`, die das benutzerdefinierte HTML für den Informationsblock generiert. Diese Funktion erhält `item` (das Kartenobjekt) und `slot` (den Slot-Zeitstempel) als Eingabeparameter. Die Funktion gibt div-Container zurück, die den Informationsblock für ein ausgewähltes Buchungselement darstellen, einschließlich eines Bildes, einer Kategorie, eines Titels und eines formatierten Datums. Sie müssen außerdem den `template`-Hilfshelfer importieren und Ihre benutzerdefinierte Funktion `infoTemplate` zuweisen.

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
    /* weitere Stile */
</style>

<script>
    const { Booking, template } = booking; // Template-Helfer importieren

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
	    infoTemplate: template(cardInfoTemplate), // Funktion an die Widget-Konfiguration übergeben
    });
</script>
~~~

Das folgende Snippet zeigt, wie Sie eine Vorlage auf den Informationsblock des Booking-Dialogs anwenden, der erscheint, wenn ein Benutzer auf die Zeitslot-Schaltfläche klickt:

<iframe src="https://snippet.dhtmlx.com/byb94ipu?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
Sie können auch steuern, welche Felder im Informationsblock des Booking-Dialogs angezeigt werden, indem Sie die Eigenschaft [`infoShape`](api/config/booking-infoshape.md) verwenden. Wenn jedoch beide Eigenschaften angewendet werden, überschreibt `infoTemplate` die `infoShape`-Einstellungen.
:::

**Verwandte Artikel**:

- [Den Booking-Dialog konfigurieren](guides/configuration.md#configure-the-booking-dialog)
- [`infoShape`](api/config/booking-infoshape.md)
