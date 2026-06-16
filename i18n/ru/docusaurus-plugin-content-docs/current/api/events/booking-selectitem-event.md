---
sidebar_label: select-item
title: События select-item
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать о событии select-item. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# select-item

### Описание {#description}

@short: Срабатывает при выборе элемента

### Использование {#usage}

~~~jsx {}
"select-item": ({
    id: string|number
}) => void;
~~~

### Параметры {#parameters}

Калбэк события `select-item` может принимать объект со следующими параметрами:

- `id` - (обязательный) идентификатор элемента

### Пример {#example}

~~~jsx {7-10}
// создание Booking
const widget = new booking.Booking("#root", {
    data,
    // другие параметры конфигурации
});

// вывод id выбранного элемента
widget.api.on("select-item", (ev) => {
    console.log(ev.id);
});
~~~
