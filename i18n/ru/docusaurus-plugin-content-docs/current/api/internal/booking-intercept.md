---
sidebar_label: api.intercept()
title: Метод intercept()
description: Вы можете узнать о методе intercept в документации библиотеки DHTMLX JavaScript Booking. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# api.intercept()

### Описание {#description}

@short: Позволяет перехватывать и предотвращать внутренние события

### Использование {#usage}

~~~jsx {}
api.intercept(
    event: string,
    callback: function,
    config?: { tag?: number | string }
): void;
~~~

### Параметры {#parameters}

- `event` - (обязательный) событие, которое должно быть вызвано
- `callback` - (обязательный) калбэк, который будет выполнен (аргументы калбэка зависят от вызываемого события)
- `config` - (необязательный) объект с дополнительными настройками для калбэка:
  - `tag` - (необязательный) тег, идентифицирующий калбэк, чтобы его можно было удалить позже с помощью метода [`api.detach()`](api/internal/booking-detach.md)

:::info
Полный список внутренних событий Booking можно найти [**здесь**](api/overview/booking-events-overview.md).
Используйте метод [`api.on()`](api/internal/booking-on.md), если хотите отслеживать действия без их изменения. Чтобы вносить изменения в действия, применяйте метод `api.intercept()`.
:::

### Пример {#example}

~~~jsx {7-11}
// создание Booking
const widget = new booking.Booking("#root", {
    data,
    // другие параметры конфигурации
});

// каждый раз при срабатывании события filter-data слоты будут показываться только для утреннего времени
widget.api.intercept("filter-data", data => {
    data.time = [{ from: 9, to: 12 }];
});
~~~
