---
sidebar_label: api.getReactiveState()
title: Метод getReactiveState()
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать о методе getReactiveState. Изучайте руководства разработчика и справочник АПИ, просматривайте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# api.getReactiveState()

### Описание {#description}

@short: Возвращает объект с реактивными свойствами Booking

### Использование {#usage}

~~~jsx {}
api.getReactiveState(): object;
~~~

### Возвращаемое значение {#returns}

Метод возвращает объект, в котором каждое поле является реактивным записываемым хранилищем (`IPublicWritable`), оборачивающим соответствующее значение состояния. Подпишитесь на хранилище с помощью `.subscribe(callback)`, чтобы реагировать на его изменения. Хранимые значения:

~~~jsx {}
{
    data: [], // массив объектов карточек
    cardShape: {}, // объект с настройками карточек
    filteredData: [], // массив отфильтрованных данных
    filterShape: {}, // объект с настройками фильтра
    filterValues: {}, // объект со значениями фильтра (текст, дата, время)
    formShape: [], // массив объектов с настройками диалога редактора Booking
    infoShape: {}, // объект с настройками левой части редактора Booking
    selectedItem: {}, // единственный элемент данных
    selectedSlot: {}, // объект с идентификатором слота и временем ([временная метка, продолжительность в минутах])
    slotGap: number, // промежуток между слотами в минутах
    slotSize: number, // размер слота в минутах
    start: Date, // начальная дата отображаемого диапазона
    end: Date, // конечная дата отображаемого диапазона
    renderType: "default" | "lazy" // режим отрисовки карточек
}
~~~

### Пример {#example}

~~~jsx {7-9,11-14}
// создание Booking
const widget = new booking.Booking("#root", {
    data,
    //other properties
});

// получение реактивного состояния Booking и вывод в консоль
const state = widget.api.getReactiveState();
console.log(state);

// подписка на изменения карточек и вывод массива карточек
state.data.subscribe((data) => {
    console.log(data);
});
~~~
