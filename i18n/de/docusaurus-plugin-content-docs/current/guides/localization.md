---
sidebar_label: Lokalisierung
title: Lokalisierung
description: Sie können mehr über die Lokalisierung in der Dokumentation der DHTMLX JavaScript Booking-Bibliothek erfahren. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Booking herunter.
---

# Lokalisierung {#localization}

Lokalisieren Sie die Booking-Oberfläche, indem Sie übersetzte Zeichenketten für alle Beschriftungen bereitstellen und die Locale auf das Widget anwenden. Das Booking-Widget wird mit drei integrierten Locales geliefert und unterstützt benutzerdefinierte Locales über die Eigenschaft [`locale`](api/config/booking-locale.md) und die Methode [`setLocale()`](api/methods/booking-setlocale-method.md).

## Standard-Locale {#default-locale}

Booking verwendet standardmäßig die englische Locale (`en`).

Der folgende Code-Ausschnitt zeigt die vollständige Struktur der integrierten `en`-Locale:

~~~jsx {}
const en = {
    //calendar
    calendar: {
        monthFull: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        monthShort: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        dayFull: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        hours: "Hours",
        minutes: "Minutes",
        done: "Done",
        clear: "Clear",
        today: "Today",
        am: ["am", "AM"],
        pm: ["pm", "PM"],
        weekStart: 7,
        clockFormat: 24
    },
    //core
    core: {
        ok:"OK",
        cancel:"Cancel",
        select: "Select",
        "No data": "No data"
    },
    //formats
    formats: {
        dateFormat: "%d.%m.%Y",
        timeFormat: "%H:%i"
    },
    lang: "en-US",
    booking: {
        //Filter bar
        "What date would be best?": "What date would be best?",
        "What time would be best?": "What time would be best?",
        Search: "Search",
        textSearchPlaceholder: labels => {
            const last = labels.pop();
            if (labels.length)
                return `Search ${labels.join(", ")} or ${last}...`;
            return `Search ${last}`;
        },
        location: "location",
        specialist: "specialist",
        speciality: "speciality",
        Morning: "Morning",
        Afternoon: "Afternoon",
        Evening: "Evening",
        // Card info
        reviews: "reviews",
        // Slots
        "Unfortunately, there are no slots available for the selected date":
            "Unfortunately, there are no slots available for the selected date",
        "No slots in the system": "No slots in the system",
        "No available slots that match search criteria":
            "No available slots that match search criteria",
        "Next available date": "Next available date",
        minutes: "minutes",
        Confirm: "Confirm",
        // Booking window
        "Your details": "Your details",
        Name: "Name",
        Email: "Email",
        Description: "Description",
        "Make an appointment": "Make an appointment",
        "Booking your appointment": "Booking your appointment",
        "Please do not close the window": "Please do not close the window",
        "Appointment confirmed": "Appointment confirmed",
        "Failed Appointment": "Failed Appointment",
        "Oops, something went wrong!": "Oops, something went wrong!",
        "Please go back and try again": "Please go back and try again",
        "Go back": "Go back",
        " should not be empty": " should not be empty",
        " should contain valid email address":
            " should contain valid email address",
        monthDayFormat: "%M %d",
        fullDateFormat: "%D, %d %F %Y"
    }
};
~~~

:::info
Neben der `en`-Locale enthält Booking zwei weitere integrierte Locales — `de` (Deutsch) und `cn` (Chinesisch).
:::

<details>
<summary><b>de</b> locale</summary>

Der folgende Code-Ausschnitt zeigt die vollständige Struktur der integrierten `de`-Locale:

~~~jsx
const de = {
    // calendar
    calendar: {
        monthFull: [
            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember"
        ],
        monthShort: [
            "Jan",
            "Feb",
            "Mrz",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Okt",
            "Nov",
            "Dez"
        ],
        dayFull: [
            "Sonntag",
            "Montag",
            "Dienstag",
            "Mittwoch",
            "Donnerstag",
            "Freitag",
            "Samstag"
        ],
        dayShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        hours: "Stunden",
        minutes: "Minuten",
        done: "Fertig",
        clear: "Entfernen",
        today: "Heute",
        weekStart: 1,
        clockFormat: 24,
    },
    // core
    core: {
        ok: "OK",
        cancel: "Abbrechen",
        select: "Auswählen",
        "No data": "Keine Daten",
    },
    // formats
    formats: {
        timeFormat: "%H:%i",
        dateFormat: "%d.%m.%Y",
    },
    lang: "de-DE",
    // booking
    booking: {
        //Filter bar
        "What date would be best?":
            "Welches Datum würde Ihnen am besten passen?",
        "What time would be best?": "Welche Zeit würde Ihnen am besten passen?",
        Search: "Suchen",
        textSearchPlaceholder: labels => {
            const last = labels.pop();
            if (labels.length)
                return `Suchen Sie nach ${labels.join(", ")} oder ${last}...`;
            return `Suchen Sie nach ${last}`;
        },
        location: "Standort",
        specialist: "Spezialist/in",
        speciality: "Fachgebiet",
        Morning: "Morgen",
        Afternoon: "Nachmittag",
        Evening: "Abend",
        // Card info
        reviews: "Bewertungen",
        // Slots
        "Unfortunately, there are no slots available for the selected date":
            "Leider sind keine Termine für den ausgewählten Tag verfügbar",
        "No slots in the system": "Keine Steckplätze im System",
        "No available slots that match search criteria":
            "Keine verfügbaren Steckplätze, die den Suchkriterien entsprechen",
        "Next available date": "Nächstes verfügbares Datum",
        minutes: "Minuten",
        Confirm: "Bestätigen",
        // Booking window
        "Your details": "Ihre Angaben",
        Name: "Name",
        Email: "Email",
        Description: "Beschreibung",
        "Make an appointment": "Vereinbaren Sie einen Termin",
        "Booking your appointment": "Buchen Sie bitte Ihren Termin",
        "Please do not close the window":
            "Bitte schließen Sie das Fenster nicht",
        "Appointment confirmed": "Termin ist bestätigt",
        "Failed Appointment": "Gescheiterte Ernennung",
        "Oops, something went wrong!": "Hoppla! Etwas ist schiefgelaufen!",
        "Please go back and try again":
            "Bitte gehen Sie zurück und versuchen Sie noch einmal",
        "Go back": "Gehen Sie zurück",
        " should not be empty": " sollte nicht leer sein",
        " should contain valid email address":
            "sollte eine gültige E-Mail-Adresse enthalten",
        monthDayFormat: "%M %d",
        fullDateFormat: "%D, %d %F %Y"
    }
};
~~~
</details>

<details>
<summary><b>cn</b> locale</summary>

Der folgende Code-Ausschnitt zeigt die vollständige Struktur der integrierten `cn`-Locale:

~~~jsx
const cn = {
    // calendar
    calendar: {
        monthFull: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
        ],
        monthShort: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
        ],
        dayFull: [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六"
        ],
        dayShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        hours: "小时",
        minutes: "分钟",
        done: "完成",
        clear: "清除",
        today: "今天",
        am: ["", ""],
        pm: ["", ""],
        weekStart: 7,
        clockFormat: 24
    },
    // core
    core: {
        ok: "确定",
        cancel: "取消",
        select: "选择",
        "No data": "没有数据",
    },
    // formats
    formats: {
        timeFormat: "%H:%i",
        dateFormat: "%Y-%m-%d",
    },
    lang: "zh-CN",
    //booking
    booking: {
        //Filter bar
        "What date would be best?": "什么日期最好?",
        "What time would be best?": "什么时间最好?",
        Search: "搜索",
        textSearchPlaceholder: labels => {
            const last = labels.pop();
            if (labels.length) return `搜索 ${labels.join(", ")} 或 ${last}...`;
            return `搜索 ${last}`;
        },
        location: "地点",
        specialist: "专门人员",
        speciality: "特种",
        Morning: "上午",
        Afternoon: "下午",
        Evening: "晚上",
        // Card info
        reviews: "评论",
        // Slots
        "Unfortunately, there are no slots available for the selected date":
            "很遗憾，所选日期没有空位",
        "No slots in the system": "系统中没有插槽",
        "No available slots that match search criteria":
            "没有符合搜寻条件的可用插槽",
        "Next available date": "下一个可用日期",
        minutes: "分钟",
        Confirm: "确认",
        // Booking window
        "Your details": "您的详细信息",
        Name: "名称",
        Email: "电子邮件",
        Description: "说明",
        "Book an appointment": "预约",
        "Booking your appointment": "预约",
        "Please do not close the window": "请不要关闭窗口",
        "Appointment confirmed": "任命已确认",
        "Failed to process this booking": "预订处理失败",
        "Oops, something went wrong!": "哎呀，出错了!",
        "Please go back and try again": "请回去再试一次",
        "Go back": "返回",
        " should not be empty": " 不应为空",
        " should contain valid email address": " 应包含有效的电子邮件地址",
        monthDayFormat: "%M %d",
        fullDateFormat: "%D, %d %F %Y"
    }
};
~~~
</details>

## Integrierte Locale anwenden {#apply-a-built-in-locale}

Greifen Sie auf integrierte Locales über das Objekt `booking.locales` zu. Booking stellt drei integrierte Locales bereit: `en`, `cn` und `de`.

Der folgende Code-Ausschnitt wendet die deutsche Locale bei der Initialisierung über die Eigenschaft [`locale`](api/config/booking-locale.md) an:

~~~jsx {4}
const { data } = getData();
const widget = new booking.Booking("#root", {
    data,
    locale: booking.locales.de
});
~~~

Um die Locale nach der Initialisierung zu wechseln, rufen Sie die Methode [`setLocale()`](api/methods/booking-setlocale-method.md) auf.

## Benutzerdefinierte Locale anwenden {#apply-a-custom-locale}

Um eine Sprache außerhalb der integrierten Locales zu verwenden, erstellen Sie ein Locale-Objekt mit Übersetzungen für alle Beschriftungen und wenden Sie es über die Eigenschaft [`locale`](api/config/booking-locale.md) oder die Methode [`setLocale()`](api/methods/booking-setlocale-method.md) an.

Der folgende Code-Ausschnitt wendet eine benutzerdefinierte koreanische Locale auf eine bestehende Booking-Instanz an:

~~~jsx {}
// Booking erstellen
const widget = new booking.Booking("#root", {
  data,
});

const ko = {...} // benutzerdefiniertes Locale-Objekt
widget.setLocale(ko);
~~~

## Zur Standard-Locale zurücksetzen {#reset-to-the-default-locale}

Um die englische Standard-Locale wiederherzustellen, rufen Sie [`setLocale()`](api/methods/booking-setlocale-method.md) ohne Argumente auf oder übergeben Sie `null`.

Der folgende Code-Ausschnitt setzt die aktive Locale auf Englisch zurück:

~~~jsx {}
widget.setLocale();     // auf englische Standard-Locale zurücksetzen
// oder
widget.setLocale(null); // gleiche Wirkung
~~~

## Zeitformat ändern {#change-the-time-format}

Wechseln Sie zwischen dem 12-Stunden- und dem 24-Stunden-Format, indem Sie den Parameter `timeFormat` im Objekt `formats` der aktiven [`locale`](api/config/booking-locale.md) aktualisieren.

Der folgende Code-Ausschnitt schaltet die aktive Locale zwischen dem 12-Stunden- und dem 24-Stunden-Format um:

~~~jsx {}
let clockFormat = 12;
const locale = booking.locales["en"];
setTimeFormat(clockFormat);

function setTimeFormat(clock) {
    locale.formats.timeFormat = clock === 12 ? "%g:%i %a" : "%H:%i";
}

const widget = new booking.Booking("#root", {
    locale,
    data: dataset,
});

function changeFormat() {
    clockFormat = clockFormat === 12 ? 24 : 12;
    setTimeFormat(clockFormat);
    widget.setLocale(locale);
}
~~~

:::info
Sehen Sie sich ein Beispiel im [Snippet-Tool](https://snippet.dhtmlx.com/rxjnw54x) an.
:::

## Spezifikation des Datums- und Zeitformats {#date-and-time-format-specification}

Booking verwendet die folgenden Zeichen zur Zusammensetzung von Datums- und Zeitformat-Zeichenketten:

| Zeichen   | Definition                                                          | Beispiel                  |
| :-------- | :------------------------------------------------------------------ | :------------------------ |
| %d        | Tag als Zahl mit führender Null                                     | von 01 bis 31             |
| %j        | Tag als Zahl                                                        | von 1 bis 31              |
| %D        | Kurzname des Tages (Abkürzung)                                      | So Mo Di Sam              |
| %l        | Vollständiger Name des Tages                                        | Sonntag Montag Dienstag   |
| %W        | Woche als Zahl mit führender Null (mit Montag als erstem Wochentag) | von 01 bis 52/53          |
| %m        | Monat als Zahl mit führender Null                                   | von 01 bis 12             |
| %n        | Monat als Zahl                                                      | von 1 bis 12              |
| %M        | Kurzname des Monats                                                 | Jan Feb Mrz               |
| %F        | Vollständiger Name des Monats                                       | Januar Februar März       |
| %y        | Jahr als Zahl, 2-stellig                                            | 24                        |
| %Y        | Jahr als Zahl, 4-stellig                                            | 2024                      |
| %h        | Stunden im 12-Stunden-Format mit führender Null                     | von 01 bis 12             |
| %g        | Stunden im 12-Stunden-Format                                        | von 1 bis 12              |
| %H        | Stunden im 24-Stunden-Format mit führender Null                     | von 00 bis 23             |
| %G        | Stunden im 24-Stunden-Format                                        | von 0 bis 23              |
| %i        | Minuten mit führender Null                                          | von 00 bis 59             |
| %s        | Sekunden mit führender Null                                         | von 00 bis 59             |
| %S        | Millisekunden                                                       | 128                       |
| %a        | am oder pm                                                          | am (für die Zeit von Mitternacht bis Mittag) und pm (für die Zeit von Mittag bis Mitternacht) |
| %A        | AM oder PM                                                          | AM (für die Zeit von Mitternacht bis Mittag) und PM (für die Zeit von Mittag bis Mitternacht) |
| %c        | Gibt Datum und Uhrzeit im ISO-8601-Datumsformat aus                 | 2024-10-04T05:04:09       |


Um den 20. September 2024 mit der genauen Uhrzeit als *2024-09-20 16:47:08.128* darzustellen, geben Sie `"%Y-%m-%d %H:%i:%s.%S"` an.

## Beispiel {#example}

Der folgende Ausschnitt wechselt zwischen der `en`- und der `de`-Locale:

<iframe src="https://snippet.dhtmlx.com/7khy4ayf?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Verwandte Artikel**:

- [`locale`](api/config/booking-locale.md) — aktive Locale bei der Initialisierung festlegen
- [`setLocale()`](api/methods/booking-setlocale-method.md) — aktive Locale zur Laufzeit ändern oder zurücksetzen
