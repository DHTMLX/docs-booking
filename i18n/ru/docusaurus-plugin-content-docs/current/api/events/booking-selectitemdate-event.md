---
sidebar_label: select-item-date
title: Событие select-item-date
description: В документации DHTMLX JavaScript Booking можно узнать о событии select-item-date. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# select-item-date

### Описание {#description}

@short: Срабатывает при выборе даты для элемента

### Использование {#usage}

~~~jsx {}
"select-item-date": ({
    id: string|number,
    date: number
}) => void;
~~~

### Параметры {#parameters}

Калбэк события `select-item-date` принимает объект со следующими параметрами:

- `id` - (обязательный) идентификатор элемента
- `date` - (обязательный) дата (в миллисекундах), установленная для выбранного элемента

### Пример {#example}

~~~jsx {7-10}
// создать Booking
const widget = new booking.Booking("#root", {
    data,
    // другие параметры конфигурации
});

// вывести дату
widget.api.on("select-item-date", (ev) => {
    console.log(ev.date);
});
~~~
