---
sidebar_label: setConfirmHandler()
title: Метод setConfirmHandler()
description: В документации DHTMLX JavaScript Booking вы можете узнать о методе setConfirmHandler(). Просматривайте руководства разработчика и справочник АПИ, изучайте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# setConfirmHandler()

### Описание {#description}

@short: Регистрирует обработчик события подтверждения слота

### Использование {#usage}

~~~jsx
setConfirmHandler(confirmHandler: (ev) => any): void;
~~~

### Параметры {#parameters}

Метод принимает функцию `confirmHandler`, которая будет вызвана при подтверждении слота для бронирования. Функция принимает объект, аналогичный объекту события [`confirm-slot`](api/events/booking-confirmslot-event.md).

### Пример {#example}

~~~jsx {}
const { data } = getData();
const widget = new booking.Booking("#root", {
    data
});

widget.setConfirmHandler((ev) => {
    console.log("Booking info:", ev);
});
~~~

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Связанные статьи**: [Сохранение бронирований на сервере](guides/saving-reservations.md)
