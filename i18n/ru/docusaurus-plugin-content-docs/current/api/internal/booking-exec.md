---
sidebar_label: api.exec()
title: Метод exec()
description: Вы можете ознакомиться с методом exec в документации библиотеки DHTMLX JavaScript Booking. Изучайте руководства разработчика и справочник АПИ, просматривайте примеры кода и живые демо, загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# api.exec()

### Описание {#description}

@short: Позволяет вызывать внутренние события

Метод является асинхронным и возвращает Promise, который разрешается с обработанной конфигурацией события.

### Использование {#usage}

~~~jsx {}
api.exec(
    event: string,
    config: object
): Promise<any>;
~~~

### Параметры {#parameters}

- `event` - (обязательный) событие, которое необходимо вызвать
- `config` - (обязательный) объект конфигурации с параметрами (см. вызываемое событие)

### События {#events}

:::info
Полный список внутренних событий Booking можно найти [**здесь**](api/overview/booking-events-overview.md).
:::

### Пример {#example}

Пример ниже демонстрирует, как применить фильтр при инициализации:

~~~jsx {5-19}
const widget = new booking.Booking("#root", {
    data,
    //другие параметры конфигурации
});
widget.api.exec("filter-data", {
    text: "Allergist",
    date: {
        start: new Date,
        end: new Date(2025, 2, 12)
    },
    time: [
        {
            from: 12,
            to: 20
        }
    ]
});
~~~
