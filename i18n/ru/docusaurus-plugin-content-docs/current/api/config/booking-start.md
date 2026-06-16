---
sidebar_label: start
title: start
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать о начальной дате. Изучайте руководства разработчика и справочник АПИ, просматривайте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# start

### Описание {#description}

@short: Необязательный. Определяет дату, начиная с которой отображаются доступные слоты

### Использование {#usage}

~~~jsx {}
start?: Date;
~~~

### Параметры {#parameters}

- `Date` - (необязательный) начальная дата, начиная с которой отображаются доступные слоты; значение по умолчанию — текущая дата.

### Пример {#example}

~~~jsx {}
new booking.Booking("#root", {
    data,
    start: new Date(2024, 10, 10),
    // другие параметры
});
~~~

Пример ниже показывает, как задать начальную и [конечную](api/config/booking-end.md) даты:

<iframe src="https://snippet.dhtmlx.com/cc28whe7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
