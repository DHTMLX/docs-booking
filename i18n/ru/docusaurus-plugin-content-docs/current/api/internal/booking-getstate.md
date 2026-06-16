---
sidebar_label: api.getState()
title: Метод getState()
description: В документации DHTMLX JavaScript Booking вы можете узнать о методе getState. Изучайте руководства разработчика и справочник АПИ, просматривайте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# api.getState()

### Описание {#description}

@short: Возвращает объект со свойствами StateStore виджета Booking

### Использование {#usage}

~~~jsx {}
api.getState(): object;
~~~

### Возвращает {#returns}

Метод возвращает объект со следующими полями состояния:

~~~jsx {}
{
    data: [], // массив объектов карточек
    cardShape: {}, // объект с настройками карточек
    filteredData: [], // массив отфильтрованных данных
    filterShape: {}, // объект с настройками фильтра
    filterValues: {}, // объект со значениями фильтра (текст, дата, время)
    formShape: [], // массив объектов с настройками диалога редактора Booking
    infoShape: {}, // объект с настройками левой части редактора Booking
    selectedItem: {}, // единичный элемент данных
    selectedSlot: {}, // объект с id слота и временем ([timestamp, длительность в минутах])
    slotGap: number, // интервал между слотами в минутах
    slotSize: number, // размер слота в минутах
    start: Date, // начальная дата отображаемого диапазона
    end: Date, // конечная дата отображаемого диапазона
    renderType: "default" | "lazy" // режим отрисовки карточек
}
~~~

### Пример {#example}

~~~jsx {7-11}
// создание Booking
const widget = new booking.Booking("#root", {
    data,
    cardShape
});

// получение состояния Booking и вывод в консоль
const state = widget.api.getState();
console.log(state);
~~~
