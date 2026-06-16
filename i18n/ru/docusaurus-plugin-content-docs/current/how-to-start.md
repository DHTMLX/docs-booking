---
sidebar_label: Начало работы
title: Начало работы
description: Узнайте, как начать работу с DHTMLX Booking, из документации библиотеки DHTMLX JavaScript Booking. Изучайте руководства разработчика и справочник АПИ, просматривайте примеры кода и живые демонстрации, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# Начало работы {#how-to-start}

Это руководство проведёт вас через шаги, необходимые для создания полноценного приложения Booking на странице.

![Полнофункциональное приложение DHTMLX Booking на веб-странице](/img/main.png)

## Шаг 1. Скачивание и установка пакетов {#step-1-downloading-and-installing-packages}

[Скачайте пакет](https://dhtmlx.com/docs/products/dhtmlxBooking/) и распакуйте его в папку вашего проекта.

Вы можете импортировать JavaScript Booking в свой проект с помощью менеджера пакетов `yarn` или `npm`.

#### Установка ознакомительной версии Booking через npm или yarn {#installing-trial-booking-via-npm-or-yarn}

:::info
Если вы хотите использовать ознакомительную версию Booking, скачайте пробный [пакет booking](https://dhtmlx.com/docs/products/dhtmlxBooking/) и следуйте инструкциям из файла *README*. Обратите внимание, что пробная версия Booking доступна только в течение 30 дней.
:::

#### Установка PRO-версии Booking через npm или yarn {#installing-pro-booking-via-npm-or-yarn}

:::info
Вы можете получить доступ к приватному **npm** DHTMLX непосредственно в [Личном кабинете клиента](https://dhtmlx.com/clients/), сгенерировав логин и пароль для **npm**. Там же доступно подробное руководство по установке. Обратите внимание, что доступ к приватному **npm** предоставляется только при наличии активной лицензии на Booking.
:::

## Шаг 2. Подключение исходных файлов {#step-2-including-source-files}

Начните с создания HTML-файла и назовите его *index.html*. Затем подключите исходные файлы Booking в созданный файл.

Необходимы два файла:

- JS-файл booking
- CSS-файл booking

~~~html {5-6} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Booking</title>
        <script src="./dist/booking.js"></script>
        <link href="./dist/booking.css" rel="stylesheet">
    </head>
    <body>
        <script>
        // ваш код будет здесь
        </script>
    </body>
</html>
~~~

:::tip
Если вы хотите интегрировать JavaScript Booking в проекты на React, Angular или Vue, обратитесь к соответствующим [**примерам на CodeSandbox**](https://codesandbox.io/u/DHTMLX) для получения дополнительной информации.
:::

## Шаг 3. Создание booking {#step-3-creating-booking}

Теперь вы готовы добавить booking на страницу. Для начала создадим DIV-контейнер для Booking.

~~~html {} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Booking</title>
        <script src="./dist/booking.js"></script>
        <link href="./dist/booking.css" rel="stylesheet">
    </head>
    <body>
        <div id="root"></div>
        <script>
            const widget = new booking.Booking("#root", {
                // свойства конфигурации
            });
        </script>
    </body>
</html>
~~~

## Шаг 4. Настройка Booking {#step-4-configuring-booking}

Чтобы начать работу с Booking, сначала необходимо предоставить начальные данные, а затем добавить другие свойства конфигурации, которые должны применяться при инициализации. Пример ниже создаёт Booking с двумя карточками:

- свойство [`data`](api/config/booking-data.md) позволяет добавлять данные в каждую карточку: заголовок, изображение, данные рейтинга и слоты для бронирования
- свойство [`cardShape`](api/config/booking-cardshape.md) помогает настроить, какие поля данных карточек отображать

~~~jsx {}
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
                from: 9,
                to: 20,
                days: [1, 2, 3, 4, 5]
            },
            {
                from: 10,
                to: 18,
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
                from: "9:15",
                to: 17,
                days: [1, 2, 3, 4, 5]
            }
        ]
    }
];

const cardShape = {
    review: false,
    subtitle: false,
    price: false
};

new booking.Booking("#root", {
    data,
    cardShape,
    // другие параметры
});
~~~

## Что дальше {#whats-next}

Это всё, что нужно для создания простого Booking на странице. Далее изучите АПИ Booking:

- страницы [руководств](/category/guides) содержат инструкции по установке, загрузке данных, настройке стилей и другие полезные советы по конфигурации Booking
- [справочник АПИ](api/overview/booking-api-overview.md) описывает функциональность Booking
