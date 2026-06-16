---
sidebar_label: 현지화
title: 현지화
description: DHTMLX JavaScript Booking 라이브러리의 현지화에 대한 문서에서 관련 내용을 확인할 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 실행해 보세요. DHTMLX Booking의 무료 30일 평가판을 다운로드하실 수 있습니다.
---

# 현지화 {#localization}

모든 레이블에 번역된 문자열을 제공하고 widget에 로케일을 적용하여 Booking 인터페이스를 현지화합니다. Booking widget에는 세 가지 내장 로케일이 포함되어 있으며, [`locale`](api/config/booking-locale.md) 속성과 [`setLocale()`](api/methods/booking-setlocale-method.md) 메서드를 통해 사용자 정의 로케일도 지원합니다.

## 기본 로케일 {#default-locale}

Booking은 기본적으로 영어(`en`) 로케일을 적용합니다.

다음 코드 스니펫은 내장 `en` 로케일의 전체 구조를 보여줍니다:

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
`en` 로케일 외에도 Booking에는 `de`(독일어)와 `cn`(중국어) 두 가지 내장 로케일이 포함되어 있습니다.
:::

<details>
<summary><b>de</b> 로케일</summary>

다음 코드 스니펫은 내장 `de` 로케일의 전체 구조를 보여줍니다:

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
<summary><b>cn</b> 로케일</summary>

다음 코드 스니펫은 내장 `cn` 로케일의 전체 구조를 보여줍니다:

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

## 내장 로케일 적용 {#apply-a-built-in-locale}

`booking.locales` 객체를 통해 내장 로케일에 접근합니다. Booking은 `en`, `cn`, `de` 세 가지 내장 로케일을 제공합니다.

다음 코드 스니펫은 초기화 시 [`locale`](api/config/booking-locale.md) 속성을 통해 독일어 로케일을 적용하는 방법을 보여줍니다:

~~~jsx {4}
const { data } = getData();
const widget = new booking.Booking("#root", {
    data,
    locale: booking.locales.de
});
~~~

초기화 이후 로케일을 변경하려면 [`setLocale()`](api/methods/booking-setlocale-method.md) 메서드를 호출합니다.

## 사용자 정의 로케일 적용 {#apply-a-custom-locale}

내장 로케일에 없는 언어를 사용하려면, 모든 레이블에 대한 번역이 포함된 로케일 객체를 생성하고 [`locale`](api/config/booking-locale.md) 속성 또는 [`setLocale()`](api/methods/booking-setlocale-method.md) 메서드를 통해 적용합니다.

다음 코드 스니펫은 기존 Booking 인스턴스에 사용자 정의 한국어 로케일을 적용하는 방법을 보여줍니다:

~~~jsx {}
// Booking 생성
const widget = new booking.Booking("#root", {
  data,
});

const ko = {...} // 사용자 정의 로케일 객체
widget.setLocale(ko);
~~~

## 기본 로케일로 초기화 {#reset-to-the-default-locale}

기본 영어 로케일로 되돌리려면 [`setLocale()`](api/methods/booking-setlocale-method.md)를 인수 없이 호출하거나 `null`을 전달합니다.

다음 코드 스니펫은 활성 로케일을 영어로 재설정합니다:

~~~jsx {}
widget.setLocale();     // 기본 영어로 재설정
// 또는
widget.setLocale(null); // 동일한 효과
~~~

## 시간 형식 변경 {#change-the-time-format}

활성 [`locale`](api/config/booking-locale.md)의 `formats` 객체 내 `timeFormat` 파라미터를 업데이트하여 12시간제와 24시간제 간에 전환합니다.

다음 코드 스니펫은 활성 로케일을 12시간제와 24시간제 형식 간에 전환합니다:

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
[스니펫 도구](https://snippet.dhtmlx.com/rxjnw54x)에서 예제를 확인하세요.
:::

## 날짜 및 시간 형식 사양 {#date-and-time-format-specification}

Booking은 다음 문자들을 사용하여 날짜 및 시간 형식 문자열을 구성합니다:

| 문자      | 정의                                              | 예시                    |
| :-------- | :------------------------------------------------ |:------------------------|
| %d        | 앞에 0이 붙는 날짜 숫자                           | 01부터 31까지           |
| %j        | 날짜 숫자                                         | 1부터 31까지            |
| %D        | 요일 약어                                         | Su Mo Tu Sat            |
| %l        | 요일 전체 이름                                    | Sunday Monday Tuesday   |
| %W        | 앞에 0이 붙는 주 번호 (월요일을 주의 첫째 날로 기준) | 01부터 52/53까지        |
| %m        | 앞에 0이 붙는 월 숫자                             | 01부터 12까지           |
| %n        | 월 숫자                                           | 1부터 12까지            |
| %M        | 월 약어                                           | Jan Feb Mar             |
| %F        | 월 전체 이름                                      | January February March  |
| %y        | 2자리 연도 숫자                                   | 24                      |
| %Y        | 4자리 연도 숫자                                   | 2024                    |
| %h        | 앞에 0이 붙는 12시간제 시각                       | 01부터 12까지           |
| %g        | 12시간제 시각                                     | 1부터 12까지            |
| %H        | 앞에 0이 붙는 24시간제 시각                       | 00부터 23까지           |
| %G        | 24시간제 시각                                     | 0부터 23까지            |
| %i        | 앞에 0이 붙는 분                                  | 00부터 59까지           |
| %s        | 앞에 0이 붙는 초                                  | 00부터 59까지           |
| %S        | 밀리초                                            | 128                     |
| %a        | am 또는 pm                                        | am (자정부터 정오까지) 및 pm (정오부터 자정까지)|
| %A        | AM 또는 PM                                        | AM (자정부터 정오까지) 및 PM (정오부터 자정까지)|
| %c        | ISO 8601 날짜 형식으로 날짜와 시간 표시           | 2024-10-04T05:04:09     |


2024년 9월 20일을 정확한 시각 *2024-09-20 16:47:08.128*로 렌더링하려면 `"%Y-%m-%d %H:%i:%s.%S"`를 지정합니다.

## 예제 {#example}

아래 스니펫은 `en`과 `de` 로케일 간에 전환하는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/7khy4ayf?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**관련 문서**:

- [`locale`](api/config/booking-locale.md) — 초기화 시 활성 로케일 설정
- [`setLocale()`](api/methods/booking-setlocale-method.md) — 런타임에 활성 로케일 변경 또는 재설정
