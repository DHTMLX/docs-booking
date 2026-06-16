---
sidebar_label: api.on()
title: Метод on()
description: В документации DHTMLX JavaScript Booking можно узнать о методе on. Просматривайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# api.on()

### Описание {#description}

@short: Позволяет прикрепить обработчик к внутренним событиям

### Использование {#usage}

~~~jsx {}
api.on(
    event: string,
    handler: function,
    config?: { tag?: number | string }
): void;
~~~

### Параметры {#parameters}

- `event` - (обязательный) событие, которое нужно отслеживать
- `handler` - (обязательный) прикрепляемый обработчик (аргументы обработчика зависят от вызываемого события)
- `config` - (необязательный) объект с дополнительными настройками обработчика:
  - `tag` - (необязательный) тег, идентифицирующий обработчик, чтобы его можно было удалить позже с помощью метода [`api.detach()`](api/internal/booking-detach.md)

:::info
Полный список внутренних событий Booking можно найти [**здесь**](api/overview/booking-events-overview.md).
Используйте метод `api.on()`, если хотите отслеживать действия без их изменения. Чтобы вносить изменения в действия, применяйте метод [`api.intercept()`](api/internal/booking-intercept.md).
:::

### Пример {#example}

~~~jsx {7-10}
// создаём Booking
const widget = new booking.Booking("#root", {
    data,
    // другие параметры конфигурации
});

// выводим id выбранного слота и время
widget.api.on("select-slot", (obj) => {
    console.log("The selected slot", obj.id, "and time", obj.time);
});
~~~
