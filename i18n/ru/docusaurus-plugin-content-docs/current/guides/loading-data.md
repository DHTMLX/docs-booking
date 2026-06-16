---
sidebar_label: Загрузка данных
title: Загрузка данных
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать, как загружать данные в Booking. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# Загрузка данных {#loading-data}

Виджет Booking принимает один массив данных через объект конфигурации:

- [`data`](api/config/booking-data.md) — массив объектов карточек с правилами слотов

:::tip
Для больших наборов данных включите ленивый рендеринг с помощью свойства [`renderType`](api/config/booking-rendertype.md), чтобы виджет отображал только видимые карточки.
:::

## Подготовка примера набора данных {#prepare-a-sample-dataset}

Храните данные карточек в отдельном файле, чтобы использовать набор данных на разных страницах и в тестах. Каждый объект карточки включает поля идентификации, поля отображения и массив `slots`, который определяет правила доступности.

Следующий фрагмент кода определяет три объекта карточек в модуле *data.js*. Вспомогательная функция `getDate(addDays, hours, minutes)` возвращает временную метку для даты относительно сегодняшнего дня (например, `getDate(0, 12)` — это сегодня в 12:00 по местному времени):

~~~jsx title="data.js"
// возвращает временную метку для "сегодня + addDays" в указанные часы:минуты (местное время)
function getDate(addDays, hours = 0, minutes = 0) {
    const date = new Date();
    date.setDate(date.getDate() + addDays);
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
}

const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "$35",
        review: {
            stars: 4,
            count: 120
        },
        slots: [
            {
                from: 9, to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10, to: 18,
                days: [6, 0]
            }
        ]
    },
    {
        id: "5c9b64ad-1830-4e5b-a5f9-8acea10706df",
        title: "James Anderson",
        category: "Allergist",
        subtitle: "3 years of experience",
        details: "UCLA Medical Center\n57 Westwood Plaza",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/11.jpg",
        price: "$30",
        review: {
            stars: 4,
            count: 64
        },
        slotSize: 45,
        slotGap: 10,
        slots: [
            {
                from: "9:15", to: 17,
                days: [1, 2, 3, 4, 5]
            }
        ]
    },
    {
        id: "9b037564-77be-429f-b719-eebbe499027a",
        title: "Emma Johnson",
        category: "Cardiologist",
        subtitle: "2 years of experience",
        details: "Stanford Health Care\n1468 Madison Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/03.jpg",
        price: "$25",
        review: {
            stars: 5,
            count: 10
        },
        slots: [
            {
                from: 14, to: 17,
                size: 30, gap: 10
            },
            {
                from: 12, to: 19,
                size: 50, gap: 20,
                days: [2], dates: [getDate(0)]
            },
            {
                from: "18:30", to: 20,
                size: 20, gap: 20,
                days: [3, 4, 5]
            },
        ],
        usedSlots: [getDate(0, 12), getDate(0, 18)]
    }
];
~~~

## Загрузка данных из локального файла {#load-data-from-a-local-file}

Загружайте данные карточек из отдельного JavaScript-файла, предоставляя набор данных через вспомогательную функцию.

Следующий фрагмент кода определяет `getData()`, которая возвращает и `data`, и конфигурацию `cardShape`:

~~~jsx {}
function getData() {
    return {
        data,
        cardShape
    };
}

const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "$35",
        review: {
            stars: 4,
            count: 120
        },
        slots: [
            {
                from: 9, to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10, to: 18,
                days: [6, 0]
            }
        ]
    },
    // другие карточки
];

const cardShape = {
    preview: true,
    review: true,
    category: true,
    title: true,
    subtitle: true,
    price: true,
    details: true
};
~~~

Подключите файл данных на странице после исходных файлов Booking.

Следующий фрагмент кода подключает модуль *data.js* в *index.html*:

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>
<link rel="stylesheet" href="./dist/booking.css">

<script src="./common/data.js"></script>
~~~

Передайте набор данных, возвращённый функцией `getData()`, в конструктор Booking.

Следующий фрагмент кода создаёт экземпляр Booking с загруженными данными:

~~~jsx {}
const { data } = getData();
const widget = new booking.Booking("#root", { data });
~~~

## Обновление данных после инициализации {#update-data-after-initialization}

Чтобы заменить набор данных после инициализации Booking, вызовите метод [`setConfig()`](api/methods/booking-setconfig-method.md) с новым массивом `data`. Метод повторно инициализирует виджет с объединённой конфигурацией.

Следующий фрагмент кода получает свежий набор данных с сервера и применяет его к существующему экземпляру Booking:

~~~jsx {}
fetch("/api/cards")
    .then(res => res.json())
    .then(data => {
        widget.setConfig({ data });
    });
~~~

Для серверного сохранения бронирований см. руководство [Сохранение бронирований на сервере](guides/saving-reservations.md).

---

**Связанные статьи**:

- [`confirm-slot`](api/events/booking-confirmslot-event.md) — обработка подтверждения бронирования слота
- [`setConfig()`](api/methods/booking-setconfig-method.md) — обновление конфигурации виджета после инициализации
- [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) — определение обработчика подтверждения слота
- [`renderType`](api/config/booking-rendertype.md) — переключение между стандартным и ленивым рендерингом
- [Сохранение бронирований на сервере](guides/saving-reservations.md) — серверное сохранение бронирований
