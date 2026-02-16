---
sidebar_label: Localization
title: Localization
description: You can learn about the localization in the documentation of the DHTMLX JavaScript Booking library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Booking.
---

# Localization

You can localize labels in the interface of JavaScript Booking and present it in any necessary language. You just need to provide localized strings for labels and apply your locale to the component.

## Default locale

The English locale is applied by default:

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
Besides the ***en*** locale, Booking also includes the built-in ***de*** and ***cn*** locales.
:::

<details>
<summary><b>de</b> locale</summary>

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

## Applying locales

You can get access to the built-in locale via the *booking* object. Booking provides three built-in locales: en, cn, de.

Example:

~~~jsx {4}
const { data } = getData();
const booking = new booking.Booking("#root", {
    data,
    locale: booking.locales.de
});
~~~

You can also apply the [`setLocale()`](../../api/methods/booking-setlocale-method) method.

To apply a custom locale, you need to:

- create a custom locale object (or modify the default one) and provide translations for all text labels (it can be any language you need)
- apply the new locale via its [`locale`](../../api/config/booking-locale) property or use the [`setLocale()`](../../api/methods/booking-setlocale-method) method

~~~jsx {}
// create Booking
const booking = new booking.Booking("#root", {
  data,
});

const ko = {...} // object with locale
booking.setLocale(ko);
~~~

## Changing the time format

You can change the time format via the `timeFormat` parameter of the `formats` object of [locale](../../api/config/booking-locale). 

~~~jsx {}
let clockFormat = 12;
const locale = booking.locales["en"];
setTimeFormat(clockFormat);

function setTimeFormat(clock){
    locale.formats.timeFormat = clock === 12 ? "%g:%i %a" : "%H:%i";
}

const booking = new booking.Booking("#root", {
    locale, 
    data: dataset,
});

function changeFormat() {
    clockFormat = clockFormat === 12 ? 24  : 12;
    setTimeFormat(clockFormat);
    booking.setLocale(locale);
       
}
~~~

:::info
You can also see an example in the [snippet tool](https://snippet.dhtmlx.com/rxjnw54x)
:::

## Date and time format specification 

Booking uses the following characters for setting the date and time format:

| Character | Definition                                        |Example                  |
| :-------- | :------------------------------------------------ |:------------------------|
| %d        | day as a number with leading zero                 | from 01 to 31           |
| %j        | day as a number                                   | from 1 to 31            |
| %D        | short name of the day (abbreviation)              | Su Mo Tu Sat            |
| %l        | full name of the day                              | Sunday Monday Tuesday   |
| %W        | week as a number with leading zero (with Monday as the first day of the week) | from 01 to 52/53        |
| %m        | month as a number with leading zero               | from 01 to 12           |
| %n        | month as a number                                 | from 1 to 12            |
| %M        | short name of the month                           | Jan Feb Mar             |
| %F        | full name of the month                            | January February March  |
| %y        | year as a number, 2 digits                        | 24                      |
| %Y        | year as a number, 4 digits                        | 2024                    |
| %h        | hours 12-format with leading zero                 | from 01 to 12           |
| %g        | hours 12-format                                   | from 1 to 12            |
| %H        | hours 24-format with leading zero                 | from 00 to 23           |
| %G        | hours 24-format                                   | from 0 to 23            |
| %i        | minutes with leading zero                         | from 01 to 59           |
| %s        | seconds with leading zero                         | from 01 to 59           |
| %S        | milliseconds                                      | 128                     |
| %a        | am or pm                                          | am (for time from midnight until noon) and pm (for time from noon until midnight)|
| %A        | AM or PM                                          | AM (for time from midnight until noon) and PM (for time from noon until midnight)|
| %c        | displays date and time in the ISO 8601 date format| 2024-10-04T05:04:09     |


To present the 20th of June, 2024 with the exact time as *2024-09-20 16:47:08.128*, specify "%Y-%m-%d-%H:%i:%s.%u".

## Example

In this snippet you can see how to switch between the *EN* and *DE* locales:

<iframe src="https://snippet.dhtmlx.com/7khy4ayf?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related articles**:
- [locale](../../api/config/booking-locale)
- [setLocale()](../../api/methods/booking-setlocale-method)
