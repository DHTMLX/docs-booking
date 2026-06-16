---
sidebar_label: Работа с сервером
title:  Работа с сервером
description: В документации по библиотеке DHTMLX JavaScript Booking вы найдёте информацию о работе с сервером. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# Работа с сервером

Виджет Booking взаимодействует с бэкендом через две основные операции: загрузку данных карточек с сервера и отправку подтверждённых бронирований на сервер. В этом руководстве рассматриваются оба сценария, а также конвертация UTC, необходимая при использовании на сервере другого часового пояса.

## Загрузка данных с сервера {#load-data-from-the-server}

Получите данные карточек с помощью нативного АПИ `fetch` (или любого другого HTTP-клиента) и передайте разобранный JSON в виджет через метод [`setConfig()`](api/methods/booking-setconfig-method.md).

Следующий фрагмент кода инициализирует пустой экземпляр Booking и загружает набор данных после получения ответа:

~~~jsx {}
const widget = new booking.Booking("#booking", { data: [] });
const server = "https://some-backend-url";

fetch(server + "/data")
    .then((res) => res.json())
    .then((data) => {
        widget.setConfig({ data });
    });
~~~

## Сохранение бронирований слотов на сервере {#save-slot-reservations-to-the-server}

Чтобы обрабатывать бронирования слотов на бэкенде, зарегистрируйте обработчик подтверждения с помощью метода [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md).

Обработчик получает объект события с тремя полями:

- `slot` — забронированный слот: `id` (идентификатор карточки) и `time` (`[timestamp, duration]`)
- `data` — значения формы с ключами по идентификаторам полей [`formShape`](api/config/booking-formshape.md) (по умолчанию: `name`, `email`, `description`)
- `confirm` — калбэки ответа сервера: `done()` при успехе, `error()` при ошибке

Следующий фрагмент кода отправляет бронирование на сервер и завершает процесс бронирования в зависимости от ответа:

~~~jsx {}
// обработка логики бронирования
const handleSlotReservation = (event) => {
    const { confirm, slot, data } = event;

    // формирование данных запроса
    const info = {
        item: slot.id,
        start: slot.time[0],
        data
    };

    // отправка данных на сервер
    fetch("/server/url", {
        method: "POST",
        body: JSON.stringify(info),
    // подтверждение или отклонение бронирования на основе ответа
    }).then((response) => {
        if (response.ok) confirm.done();
        else confirm.error();
    });
};

// создание Booking
const widget = new booking.Booking("#root", {
    data: [],
    // параметры конфигурации
});

// загрузка набора данных с сервера
fetch("/server/url")
    .then((res) => res.json())
    .then((items) => {
        // загрузка полученных элементов в виджет
        widget.setConfig({ data: items });
        // регистрация обработчика бронирования
        widget.setConfirmHandler(handleSlotReservation);
    });
~~~

:::info
Метод [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) является сокращённым вариантом, который внутренне подписывается на событие [`confirm-slot`](api/events/booking-confirmslot-event.md) через `widget.api.on("confirm-slot", handler)`. Оба подхода регистрируют обработчик с одинаковой сигнатурой калбэка — используйте `widget.api.on("confirm-slot", handler)` напрямую, если нужно добавить несколько подписчиков.
:::

## Конвертация UTC-данных в локальный часовой пояс {#convert-utc-data-to-the-local-timezone}

Виджет работает в локальном часовом поясе. Если сервер возвращает UTC-метки времени, преобразуйте каждую из них перед передачей в виджет и конвертируйте обратно в UTC перед отправкой бронирований.

Вспомогательные функции ниже обрабатывают оба направления:

- `g2l` — конвертирует UTC-метку времени в локальный часовой пояс (применяется к входящим `usedSlots` и `slots.dates`)
- `l2g` — конвертирует локальную метку времени обратно в UTC (применяется к `slot.time[0]` перед отправкой на сервер)

Следующий фрагмент кода объединяет обе вспомогательные функции в полный сценарий загрузки и бронирования:

~~~jsx
const serverURL = "https://some-backend-url";

function g2l(v) {
    const utcDate = new Date(v);
    return new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
        utcDate.getUTCHours(),
        utcDate.getUTCMinutes(),
        utcDate.getUTCSeconds(),
        utcDate.getUTCMilliseconds(),
    ).valueOf();
}

function l2g(v) {
    const date = new Date(v);
    return Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
    );
}

const handleSlotReservation = event => {
    const { confirm, slot, data } = event;

    const info = {
        doctor: slot.id,
        date: l2g(slot.time[0]),
        form: {
            name: data.name,
            email: data.email,
            details: data.description,
        },
    };

    fetch( serverURL + "/doctors/reservations", {
        method: "POST",
        body: JSON.stringify(info),
    }).then(response => {
        if (response.ok) confirm.done();
        else confirm.error();
    });
};

// инициализация виджета
const widget = new booking.Booking("#root", {
    data: [],
});

// загрузка данных
fetch( serverURL + "/units")
    .then(res => res.json())
    .then(units => {
        units.forEach(unit => {
            if (unit.usedSlots) unit.usedSlots = unit.usedSlots.map(g2l);
            if (unit.slots) {
                unit.slots = unit.slots.map(slot => {
                    if (slot.dates) {
                        return {
                            ...slot,
                            dates: slot.dates.map(g2l)
                        };
                    }
                    return slot;
                });
            };
        });

        widget.setConfig({ data: units });
        widget.setConfirmHandler(handleSlotReservation);
    });
~~~


## Пример {#example}

Фрагмент ниже демонстрирует полный сценарий бронирования на стороне сервера:

<iframe src="https://snippet.dhtmlx.com/dpbmyr8j?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Связанные статьи**:

- [`confirm-slot`](api/events/booking-confirmslot-event.md) — событие, возникающее при подтверждении пользователем слота
- [`setConfig()`](api/methods/booking-setconfig-method.md) — обновление конфигурации виджета загруженными данными
- [`setConfirmHandler()`](api/methods/booking-setconfirmhandler-method.md) — регистрация обработчика бронирования слотов
