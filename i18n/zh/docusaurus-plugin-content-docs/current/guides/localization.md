---
sidebar_label: 本地化
title: 本地化
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解本地化相关内容。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载免费 30 天评估版 DHTMLX Booking。
---

# 本地化 {#localization}

通过为所有标签提供翻译字符串并将语言环境应用到 widget，即可实现 Booking 界面的本地化。Booking widget 内置三种语言环境，并支持通过 [`locale`](api/config/booking-locale.md) 属性和 [`setLocale()`](api/methods/booking-setlocale-method.md) 方法使用自定义语言环境。

## 默认语言环境 {#default-locale}

Booking 默认使用英语（`en`）语言环境。

以下代码片段展示了内置 `en` 语言环境的完整结构：

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
除 `en` 语言环境外，Booking 还内置了另外两种语言环境——`de`（德语）和 `cn`（中文）。
:::

<details>
<summary><b>de</b> 语言环境</summary>

以下代码片段展示了内置 `de` 语言环境的完整结构：

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
<summary><b>cn</b> 语言环境</summary>

以下代码片段展示了内置 `cn` 语言环境的完整结构：

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

## 应用内置语言环境 {#apply-a-built-in-locale}

通过 `booking.locales` 对象访问内置语言环境。Booking 提供三种内置语言环境：`en`、`cn` 和 `de`。

以下代码片段在初始化时通过 [`locale`](api/config/booking-locale.md) 属性应用德语语言环境：

~~~jsx {4}
const { data } = getData();
const widget = new booking.Booking("#root", {
    data,
    locale: booking.locales.de
});
~~~

若要在初始化后更改语言环境，请调用 [`setLocale()`](api/methods/booking-setlocale-method.md) 方法。

## 应用自定义语言环境 {#apply-a-custom-locale}

若要使用内置集合以外的语言，请创建一个包含所有标签翻译的语言环境对象，并通过 [`locale`](api/config/booking-locale.md) 属性或 [`setLocale()`](api/methods/booking-setlocale-method.md) 方法应用它。

以下代码片段将自定义韩语语言环境应用到已有的 Booking 实例：

~~~jsx {}
// 创建 Booking
const widget = new booking.Booking("#root", {
  data,
});

const ko = {...} // 自定义语言环境对象
widget.setLocale(ko);
~~~

## 重置为默认语言环境 {#reset-to-the-default-locale}

若要恢复默认英语语言环境，请不带参数调用 [`setLocale()`](api/methods/booking-setlocale-method.md)，或传入 `null`。

以下代码片段将当前语言环境重置为英语：

~~~jsx {}
widget.setLocale();     // 重置为默认英语
// 或
widget.setLocale(null); // 效果相同
~~~

## 更改时间格式 {#change-the-time-format}

通过更新当前 [`locale`](api/config/booking-locale.md) 的 `formats` 对象中的 `timeFormat` 参数，可在 12 小时制和 24 小时制之间切换。

以下代码片段在 12 小时制和 24 小时制之间切换当前语言环境：

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
请在[代码片段工具](https://snippet.dhtmlx.com/rxjnw54x)中查看示例。
:::

## 日期和时间格式规范 {#date-and-time-format-specification}

Booking 使用以下字符组合日期和时间格式字符串：

| 字符 | 含义                                        | 示例                  |
| :-------- | :------------------------------------------------ |:------------------------|
| %d        | 带前导零的日期数字                 | 从 01 到 31           |
| %j        | 日期数字                                   | 从 1 到 31            |
| %D        | 星期的简称（缩写）              | Su Mo Tu Sat            |
| %l        | 星期的全称                              | Sunday Monday Tuesday   |
| %W        | 带前导零的周数（以周一为每周第一天） | 从 01 到 52/53        |
| %m        | 带前导零的月份数字               | 从 01 到 12           |
| %n        | 月份数字                                 | 从 1 到 12            |
| %M        | 月份简称                           | Jan Feb Mar             |
| %F        | 月份全称                            | January February March  |
| %y        | 两位数年份                        | 24                      |
| %Y        | 四位数年份                        | 2024                    |
| %h        | 带前导零的 12 小时制小时数                 | 从 01 到 12           |
| %g        | 12 小时制小时数                                   | 从 1 到 12            |
| %H        | 带前导零的 24 小时制小时数                 | 从 00 到 23           |
| %G        | 24 小时制小时数                                   | 从 0 到 23            |
| %i        | 带前导零的分钟数                         | 从 00 到 59           |
| %s        | 带前导零的秒数                         | 从 00 到 59           |
| %S        | 毫秒                                      | 128                     |
| %a        | am 或 pm                                          | am（午夜至正午）和 pm（正午至午夜）|
| %A        | AM 或 PM                                          | AM（午夜至正午）和 PM（正午至午夜）|
| %c        | 以 ISO 8601 格式显示日期和时间| 2024-10-04T05:04:09     |


若要将 2024 年 9 月 20 日精确渲染为 *2024-09-20 16:47:08.128*，请指定 `"%Y-%m-%d %H:%i:%s.%S"`。

## 示例 {#example}

以下代码片段在 `en` 和 `de` 语言环境之间切换：

<iframe src="https://snippet.dhtmlx.com/7khy4ayf?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**相关文章**：

- [`locale`](api/config/booking-locale.md) — 在初始化时设置当前语言环境
- [`setLocale()`](api/methods/booking-setlocale-method.md) — 在运行时更改或重置当前语言环境
