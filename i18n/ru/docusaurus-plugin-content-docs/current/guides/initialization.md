---
sidebar_label: Инициализация
title: Инициализация
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать об инициализации. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# Инициализация {#initialization}

В этом руководстве описано создание экземпляра Booking на странице. Выполните следующие шаги, чтобы получить рабочий компонент:

1. [Подключите исходные файлы Booking](#include-source-files).
2. [Создайте контейнер](#create-a-container).
3. [Инициализируйте Booking с помощью конструктора](#initialize-booking).

## Подключение исходных файлов {#include-source-files}

Виджет Booking поставляется в виде двух файлов, которые загружаются на страницу.

[Скачайте пакет](https://dhtmlx.com/docs/products/dhtmlxBooking/) и распакуйте его в папку вашего проекта. Добавьте следующие файлы на страницу:

- *booking.js* — исходный код Booking
- *booking.css* — стили Booking

Укажите корректные относительные пути к исходным файлам.

Следующий фрагмент кода подключает файлы Booking из папки *dist/*:

~~~html title="index.html"
<script type="text/javascript" src="./dist/booking.js"></script>
<link rel="stylesheet" href="./dist/booking.css">
~~~

## Создание контейнера {#create-a-container}

Добавьте HTML-элемент, который будет содержать виджет Booking, и присвойте ему идентификатор, например *root*.

Следующий фрагмент кода создаёт контейнер с идентификатором *root*:

~~~jsx title="index.html"
<div id="root"></div>
~~~

## Инициализация Booking {#initialize-booking}

Вызовите конструктор `booking.Booking` с двумя параметрами:

- container — селектор или идентификатор HTML-контейнера, в котором размещается виджет
- config — объект со свойствами конфигурации (см. [Свойства конфигурации](#configuration-properties))

Следующий фрагмент кода инициализирует Booking внутри контейнера `#root`:

~~~jsx title="index.html"
// создание Booking
new booking.Booking("#root", {
    // свойства конфигурации
});
~~~

### Свойства конфигурации {#configuration-properties}

:::info
Полный список свойств для настройки Booking см. в разделе [Обзор свойств](api/overview/booking-properties-overview.md).
:::

## Пример {#example}

Приведённый ниже фрагмент инициализирует Booking с набором начальных свойств:

<iframe src="https://snippet.dhtmlx.com/6it4ohez?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
