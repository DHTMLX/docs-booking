---
sidebar_label: Konfiguration
title: Konfiguration
description: In der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren Sie alles über die Konfiguration. Lesen Sie Entwicklerhandbücher und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# Konfiguration

## Daten für Karten laden {#load-data-for-cards}

Übergeben Sie Karten-Objekte an das [`data`](api/config/booking-data.md)-Array der Booking-Konfiguration. Das vollständige Datenformat und Ladeszenarien finden Sie im Handbuch [Daten laden](guides/loading-data.md).

## Struktur der Karten definieren {#define-the-structure-of-cards}

Die linke Seite jeder Karte zeigt eine feste Menge von Datenfeldern an. Um zu steuern, welche Felder angezeigt werden oder um das Standard-Layout vollständig zu ersetzen, verwenden Sie eine der folgenden Eigenschaften:

- [`cardShape`](api/config/booking-cardshape.md) — Sichtbarkeit der Standard-Felder umschalten
- [`cardTemplate`](api/config/booking-cardtemplate.md) — das Standard-Layout durch benutzerdefiniertes HTML ersetzen

:::info
Die Eigenschaft `cardTemplate` passt das Erscheinungsbild einer Karte vollständig über benutzerdefiniertes HTML an und bietet volle Kontrolle über Layout, Design und Inhalt. Die Eigenschaft `cardShape` blendet lediglich Felder des Standard-Templates ein oder aus. Wenn Sie beide verwenden, überschreibt `cardTemplate` die `cardShape`-Einstellungen.
:::

### Standard-Kartenfelder umschalten {#toggle-default-card-fields}

Die linke Seite der Karte zeigt standardmäßig folgende Felder an:

- `preview` — Kartenbild
- `review` — Bewertungsinformationen mit der Anzahl der Bewertungssterne (von fünf) und der Anzahl der Bewertungen
- `category` — der Kategoriename (zum Beispiel der Beruf eines Spezialisten)
- `title` — der Kartentitel (zum Beispiel der Name eines Spezialisten)
- `subtitle` — der Untertitel der Karte (zum Beispiel Erfahrungsdetails)
- `price` — der Preis des Dienstleistung
- `details` — weitere Details einer Karte

Um ein Feld auszublenden, setzen Sie den entsprechenden Parameter der [`cardShape`](api/config/booking-cardshape.md)-Eigenschaft auf `false`.

Das folgende Beispiel blendet das Feld `details` einer Karte aus:

~~~jsx {24}
const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Allergist",
        subtitle: "2 years of experience",
        details: "Lexington Avenue 54\nWheatfields, Hungary",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "27 $",
        review: {
        stars: 4,
        count: 120
    },
        slots: [
            {
                from: 9,
                to: 21
            }
        ]
    }
];

const cardShape = {
    details: false
};

new booking.Booking("#root", {
    data,
    cardShape,
    // andere Parameter
});
~~~

:::info
Ein Beispiel finden Sie im [Snippet-Tool](https://snippet.dhtmlx.com/6mxd7918).
:::

### Benutzerdefiniertes Karten-Template anwenden {#apply-a-custom-card-template}

Die Eigenschaft [`cardTemplate`](api/config/booking-cardtemplate.md) ersetzt den linken Standardblock einer Karte durch benutzerdefiniertes HTML.

Erstellen Sie eine Funktion, die ein Karten-Objekt entgegennimmt und einen HTML-String zurückgibt. Ordnen Sie die Eigenschaften des Karten-Elements in HTML-Blöcke mit benutzerdefinierten Styles an.

Das folgende Code-Snippet definiert `cardPreviewTemplate`, das HTML für eine Karte mit Vorschaubild, Kategorie, Titel und Preis zurückgibt:

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
    /* andere Styles */
</style>

<script>
    const { Booking, template } = booking;

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
</script>
~~~

Importieren Sie den `template`-Helper und weisen Sie Ihre benutzerdefinierte Funktion der Eigenschaft `cardTemplate` zu.

Das folgende Code-Snippet bindet `cardPreviewTemplate` in die Booking-Konfiguration ein:

~~~jsx
const { Booking, template } = booking;

const widget = new Booking("#root", {
	data,
	cardTemplate: template(cardPreviewTemplate),
    // andere Parameter
});
~~~

:::info
Ein Beispiel finden Sie im [Snippet-Tool](https://snippet.dhtmlx.com/k2v01vng).
:::

## Karten mit Slots füllen {#fill-cards-with-slots}

Ein Slot ist eine Zeiteinheit, die für eine Buchung verfügbar ist. Das Widget zeigt verfügbare Slots für sechs Tage (vier auf schmalen Bildschirmen) an, beginnend ab dem aktuellen Tag oder ab dem im Filter gewählten Startdatum.

### Slots für Buchungen hinzufügen {#add-slots-for-booking}

Um Buchungs-Slots zu einer Karte hinzuzufügen, fügen Sie dem `slots`-Array der Eigenschaft [`data`](api/config/booking-data.md) ein Objekt hinzu.

Das folgende Beispiel fügt Slots für Dienstag und Freitag von 12:00 bis 18:00 Uhr hinzu. Jeder Slot dauert 30 Minuten mit einem 10-Minuten-Abstand zwischen den Slots:

~~~jsx {15-22}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                from: 12,
                to: 18,
                size: 30,
                gap: 10,
                days: [2, 5]
            },
            {...}, //andere Slots
        ]
    }
];

new booking.Booking("#root", {
    data,
    // andere Parameter
});
~~~

### Slot-Regeln definieren {#define-slot-rules}

Jedes Objekt im `slots`-Array der Eigenschaft [`data`](api/config/booking-data.md) legt Folgendes fest:

- Start- und Endzeit des Slots
- Slot-Größe (Dauer in Minuten)
- Slot-Abstand (das Intervall zwischen Slots)
- Tage oder Daten, auf die die Regel angewendet wird

Wenden Sie eine einzige gemeinsame Regel auf alle Tage einer Karte an, oder kombinieren Sie mehrere Regeln, um unterschiedliche Parameter für bestimmte Wochentage oder genaue Daten zu verwenden.

Legen Sie Slot-Größe und -Abstand auf drei Prioritätsebenen fest (von höchster zu niedrigster):

- `size` und `gap` innerhalb eines Objekts im Slots-Array von [`data`](api/config/booking-data.md) — gelten für diese spezifische Slot-Regel
- `slotSize` und `slotGap` innerhalb eines Karten-Objekts der Eigenschaft [`data`](api/config/booking-data.md) — gelten für alle Slots dieser Karte
- [`slotSize`](api/config/booking-slotsize.md) und [`slotGap`](api/config/booking-slotgap.md) auf Widget-Ebene — gelten für alle Karten

:::info
Wenn Sie gemeinsame und spezifische Regeln kombinieren, löst das Widget diese wie folgt auf:
- Slot-Parameter, die für bestimmte Tage definiert sind, überschreiben gemeinsame Parameter, die für alle Tage gelten.
- Slot-Parameter, die für Daten angegeben sind, überschreiben Parameter, die für bestimmte Wochentage und alle Tage definiert sind.
- Wenn mehrere Slot-Objekte denselben Tag betreffen, dürfen sich die Zeitbereiche (`from` und `to`) mit unterschiedlicher `size` oder `gap` nicht überschneiden. Andernfalls überspringt das Widget alle Slot-Daten für diese Tage.
:::

Um den Bereich der angezeigten Slots zu begrenzen, legen Sie das [`start`](api/config/booking-start.md)-Datum und das [`end`](api/config/booking-end.md)-Datum auf Widget-Ebene fest.

#### Eine Regel auf alle Tage anwenden {#apply-one-rule-to-all-days}

Um Slots mit gleicher Dauer und gleichem Zeitbereich für jeden Tag einer Karte hinzuzufügen, fügen Sie dem `slots`-Array ein einzelnes Objekt hinzu.

Das folgende Code-Snippet definiert eine gemeinsame Regel für alle Tage von 14:00 bis 17:00 Uhr, mit 30-Minuten-Slots und einem 10-Minuten-Abstand:

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                //eine gemeinsame Regel für alle Tage
                from: 14, //Startzeit der Slots
                to: 17, // Endzeit der Slots
                size: 30, // Dauer jedes Slots in Minuten
                gap: 10 // Abstand zwischen Slots
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // andere Parameter
});
~~~

#### Unterschiedliche Regeln pro Tag oder Datum anwenden {#apply-different-rules-per-day-or-date}

Um unterschiedliche Parameter für ausgewählte Wochentage oder genaue Daten zu verwenden, fügen Sie dem `slots`-Array mehrere Objekte hinzu und setzen Sie den Parameter `days` oder `dates` für jede Regel.

Das folgende Code-Snippet kombiniert drei Regeln — eine gemeinsame Regel, eine Wochentags-Regel für Dienstag und Freitag sowie eine Regel für Mittwoch, Donnerstag und ein genaues Datum:

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // gemeinsame Regel für alle Tage außer den unten aufgeführten
                from: 14,
                to: 17,
                size: 30,
                gap: 10
            },
            {
                // gilt für Dienstag und Freitag, außer dem Freitag
                // der in der nächsten Regel aufgeführt ist
                from: 12,
                to: 17,
                size: 50,
                gap: 20,
                days: [2, 5]
            },
            {
                // gilt für Mittwoch, Donnerstag und ein genaues Datum
                from: 18,
                to: 20,
                size: 45,
                gap: 20,
                days: [3, 4],
                dates: [ 1683234000000 ] // 5. Mai 2023, Freitag
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // andere Parameter
});
~~~

Informationen zum Festlegen von [Dauer](api/config/booking-slotsize.md) und [Abstand](api/config/booking-slotgap.md) für alle Slots im Widget finden Sie im [Snippet-Tool](https://snippet.dhtmlx.com/pw8xsl1p).

### Slots als belegt oder verfügbar markieren {#mark-slots-as-used-or-available}

Zwei Parameter des [`data`](api/config/booking-data.md)-Karten-Objekts steuern, welche Slots ein Benutzer sehen oder buchen kann:

- `usedSlots` — gebuchte Slots vor dem Benutzer ausblenden
- `availableSlots` — eine explizite Liste buchbarer Slots anzeigen und die `slots`-Array-Regeln ignorieren

#### Slots als belegt markieren {#mark-slots-as-used}

Um gebuchte Slots auszublenden, setzen Sie den Parameter `usedSlots` auf ein Array von Slot-Start-Zeitstempeln.

Das folgende Code-Snippet blendet einen Slot als bereits gebucht aus:

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // gemeinsame Regel für alle Tage
                from: 14, // Startzeit des Slots
                to: 17,   // Endzeit des Slots
                size: 30, // Slot-Dauer in Minuten
                gap: 10   // Abstand zwischen Slots
            }
        ],
        usedSlots: [ 1683234000000 ] // Zeitstempel gebuchter Slots in Millisekunden
    }
];

new booking.Booking("#root", {
    data,
    // andere Parameter
});
~~~

#### Slots als verfügbar markieren {#mark-slots-as-available}

Um eine explizite Liste buchbarer Slots anzuzeigen, verwenden Sie den Parameter `availableSlots` der Eigenschaft [`data`](api/config/booking-data.md). Wenn Sie `availableSlots` setzen, ignoriert das Widget jeden Eintrag im `slots`-Array.

Das folgende Code-Snippet stellt zwei Zeitstempel als einzige buchbare Slots für die Karte bereit:

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // gemeinsame Regel für alle Tage
                from: 14, // Startzeit des Slots
                to: 17,   // Endzeit des Slots
                size: 30, // Slot-Dauer in Minuten
                gap: 10   // Abstand zwischen Slots
            }
        ],
        availableSlots: [ 1693325145000, 1693584345000 ] // Zeitstempel verfügbarer Slots in Millisekunden
    }
];

new booking.Booking("#root", {
    data,
    // andere Parameter
});
~~~

## Den Buchungsdialog konfigurieren {#configure-the-booking-dialog}

Der Buchungsdialog besteht aus zwei konfigurierbaren Teilen: den Formularfeldern, in die der Benutzer Buchungsdetails eingibt, und dem Informationsblock auf der linken Seite. Verwenden Sie die folgenden Eigenschaften, um jeden Teil zu steuern:

- [`formShape`](api/config/booking-formshape.md) — die Formularfelder konfigurieren
- [`infoShape`](api/config/booking-infoshape.md) — Standard-Felder des Informationsblocks umschalten
- [`infoTemplate`](api/config/booking-infotemplate.md) — den Informationsblock durch ein benutzerdefiniertes HTML-Template ersetzen

### Formularfelder konfigurieren {#configure-form-fields}

Übergeben Sie ein Array von Feld-Deskriptoren an die Eigenschaft [`formShape`](api/config/booking-formshape.md). Jeder Deskriptor legt den Feldtyp, die Kennung, das Label und ein optionales `required`-Flag fest.

Das folgende Code-Snippet definiert drei Formularfelder, wobei das Feld `contact` als erforderlich markiert ist:

~~~jsx {}
const formShape = [
    {
        comp: "text",
        key: "name",
        label: "Your name"
    },
    {
        comp: "text",
        key: "contact",
        label: "Mobile",
        required: true
    },
    {
        comp: "textarea",
        key: "description",
        label: "Details"
    }
];

new booking.Booking("#root", {
    formShape,
    // andere Parameter
});
~~~

:::info
Ein Beispiel finden Sie im [Snippet-Tool](https://snippet.dhtmlx.com/yeqkuzx7).
:::

### Standard-Informationsfelder umschalten {#toggle-default-information-fields}

Die Eigenschaft [`infoShape`](api/config/booking-infoshape.md) blendet Standard-Felder des Informationsblocks ein oder aus. Setzen Sie ein Feld auf `false`, um es auszublenden.

Das folgende Code-Snippet blendet das Feld `details` des Informationsblocks aus:

~~~jsx {1-7,11}
const infoShape = {
    preview: true,
    category: true,
    title: true,
    price: true,
    details: false
};

new booking.Booking("#root", {
    data,
    infoShape,
    // andere Parameter
});
~~~

:::info
Ein Beispiel finden Sie im [Snippet-Tool](https://snippet.dhtmlx.com/pd6wp1xc).
:::

### Benutzerdefiniertes Informations-Template anwenden {#apply-a-custom-information-template}

Verwenden Sie die Eigenschaft [`infoTemplate`](api/config/booking-infotemplate.md), um den Standard-Informationsblock vollständig durch benutzerdefiniertes HTML zu ersetzen. Wenn Sie sowohl `infoTemplate` als auch `infoShape` anwenden, überschreibt `infoTemplate` die `infoShape`-Einstellungen.

Definieren Sie eine Funktion, die `item` (das Karten-Objekt) und `slot` (den Slot-Zeitstempel) entgegennimmt und einen HTML-String zurückgibt. Ordnen Sie die Eigenschaften des Karten-Elements in HTML-Blöcke mit benutzerdefinierten Styles an.

Das folgende Code-Snippet definiert `cardInfoTemplate`, das ein Foto, Titel, Kategorie und das formatierte Datum des ausgewählten Slots rendert:

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
    /* andere Styles */
</style>

<script>
    const { Booking, template } = booking;

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
</script>
~~~

Importieren Sie den `template`-Helper und weisen Sie Ihre benutzerdefinierte Funktion der Eigenschaft `infoTemplate` zu.

Das folgende Code-Snippet bindet `cardInfoTemplate` in die Booking-Konfiguration ein:

~~~jsx
const { Booking, template } = booking;

const widget = new Booking("#root", {
    data,
    infoTemplate: template(cardInfoTemplate),
    // andere Parameter
});
~~~

:::info
Ein Beispiel finden Sie im [Snippet-Tool](https://snippet.dhtmlx.com/byb94ipu).
:::

## Den Filter konfigurieren {#configure-the-filter}

Verwenden Sie die Eigenschaft [`filterShape`](api/config/booking-filtershape.md), um zu steuern, welche Filter-Eingaben angezeigt werden und wie sich jede verhält. Die Standardkonfiguration aktiviert drei Textfelder, einen Datumswähler und drei Zeitbereiche:

~~~jsx {}
const defaultTimeRanges = [
    { from: 8, to: 12, label: "Morning" },
    { from: 12, to: 17, label: "Afternoon" },
    { from: 17, to: 20, label: "Evening" }
];

const defaultFilterShape = {
    text: [
        { id: "category", label: "speciality", suggest: true },
        { id: "title", label: "specialist", suggest: true },
        { id: "details", label: "location" }
    ],
    date: true,
    time: defaultTimeRanges,
    autoApply: false
};
~~~

### Filter-Eingabefelder ausblenden {#hide-filter-input-fields}

Das Widget zeigt standardmäßig alle Eingabefelder an — Text, Zeit und Datum. Um ein Feld auszublenden, setzen Sie den entsprechenden Parameter der Eigenschaft [`filterShape`](api/config/booking-filtershape.md) auf `false`.

Das folgende Code-Snippet blendet den Datumsfilter aus:

~~~jsx {}
const filterShape = {
    date: false,
};

new booking.Booking("#root", {
    data,
    filterShape,
    // andere Parameter
});
~~~

### Textfilter-Felder konfigurieren {#configure-text-filter-fields}

Um die Auto-Vervollständigung in einem Textfeld zu aktivieren, setzen Sie den Parameter `suggest` auf `true`. Das Widget zeigt dann Werte aus dem [`data`](api/config/booking-data.md)-Array an, die der Eingabe des Benutzers entsprechen. Verwenden Sie den Parameter `label`, um einen Platzhalter hinzuzufügen.

Das folgende Code-Snippet aktiviert die Auto-Vervollständigung und benutzerdefinierte Labels für drei Textfelder:

~~~jsx {}
const filterShape = {
    text: [
        { id: "category", label: "specialization", suggest: true },
        { id: "title", label: "doctor", suggest: true },
        { id: "details", label: "location", suggest: true }
    ],
};

new booking.Booking("#root", {
    data,
    filterShape,
    // andere Parameter
});
~~~

### Zeitbereiche konfigurieren {#configure-time-ranges}

Um Zeit-Filteroptionen zu definieren, übergeben Sie ein Array von Objekten an den Parameter `time` der Eigenschaft [`filterShape`](api/config/booking-filtershape.md). Jedes Objekt akzeptiert die folgenden Schlüssel:

- `from` — Slot-Startzeit als Zahl von 0 bis 24 (zum Beispiel bedeutet `9` 9:00 Uhr, `8.5` bedeutet 8:30 Uhr) oder als String im Format `"h:m"` (zum Beispiel `"8:30"`)
- `to` — Slot-Endzeit im gleichen Format wie `from`
- `label` — Platzhalter für den Zeitbereich

Das folgende Code-Snippet definiert vier Zeitbereiche mit benutzerdefinierten Labels:

~~~jsx {}
const filterShape = {
    time: [
        { from: "8:30", to: "11:50", label: "Morning" },
        { from: "12:30", to: "16:50", label: "Afternoon" },
        { from: "17:00", to: "19:50", label: "Evening" },
        { from: "20:00", to: "22:50", label: "Urgent" }
    ]
};

new booking.Booking("#root", {
    data,
    filterShape,
    // andere Parameter
});
~~~

### AutoApply-Modus aktivieren {#enable-autoapply-mode}

Um die Schaltfläche **Suche** auszublenden und die Filter-Eingabe sofort anzuwenden, setzen Sie den Parameter `autoApply` der Eigenschaft [`filterShape`](api/config/booking-filtershape.md) auf `true`.

Das folgende Code-Snippet aktiviert die automatische Anwendung für den Filter:

~~~jsx {}
const filterShape = {
    autoApply: true,
};

new booking.Booking("#root", {
    data,
    filterShape,
    // andere Parameter
});
~~~

### Filterbeispiel {#filter-example}

Das folgende Snippet zeigt eine vollständige Filter-Konfiguration:

<iframe src="https://snippet.dhtmlx.com/b5uj78bs?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

## Rendering großer Datensätze optimieren {#optimize-rendering-of-large-datasets}

Das Booking-Widget rendert standardmäßig jede geladene Karte. Für große Datensätze aktivieren Sie das Lazy-Rendering, damit das Widget nur sichtbare Karten rendert. Verwenden Sie die Eigenschaft [`renderType`](api/config/booking-rendertype.md), um zwischen den Modi zu wechseln.

Das folgende Code-Snippet aktiviert das Lazy-Rendering von Karten:

~~~jsx {}
new booking.Booking("#root", {
    data,
    renderType: "lazy",
    // andere Parameter
});
~~~
