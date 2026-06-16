---
sidebar_label: serialize()
title: Метод serialize()
description: Вы можете узнать о методе serialize() в документации библиотеки DHTMLX JavaScript Booking. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# serialize()

### Описание {#description}

@short: Сериализует данные Booking в массив JSON

### Использование {#usage}

~~~jsx
serialize(): object[];
~~~

### Возвращает {#returns}

Возвращает массив [data](api/config/booking-data.md).

### Пример {#example}

~~~jsx {}
// создаём Booking
const widget = new booking.Booking("#root", {
    data,
    // параметры конфигурации
});

console.log(widget.serialize());
~~~
