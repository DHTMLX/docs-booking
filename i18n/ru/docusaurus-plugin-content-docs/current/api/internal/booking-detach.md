---
sidebar_label: api.detach()
title: Метод detach()
description: Вы можете узнать о методе detach в документации библиотеки DHTMLX JavaScript Booking. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# api.detach()

### Описание {#description}

@short: Позволяет удалять/отсоединять обработчики событий

### Использование {#usage}

~~~jsx {}
api.detach(tag: number | string ): void;
~~~

### Параметры {#parameters}

- `tag` - (обязательный) имя тега действия

### Пример {#example}

В примере ниже мы добавляем объект со свойством `tag` в обработчик [`api.on()`](api/internal/booking-on.md), а затем используем метод `api.detach()`, чтобы остановить логирование события [`select-slot`](api/events/booking-selectslot-event.md).

~~~jsx {6-20}
const widget = new booking.Booking("#root", {
    data,
    //другие параметры конфигурации
});

// добавить обработчик
if (widget.api) {
    widget.api.on(
        "select-slot",
        ({ id }) => {
            console.log("Selected: " + id);
        },
        { tag: "track" }
    );
}

// отсоединить обработчик
function stop() {
    widget.api.detach("track");
}

const button = document.createElement("button");

button.addEventListener("click", stop);
button.textContent = "Stop logging";

document.body.appendChild(button);
~~~
