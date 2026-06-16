---
sidebar_label: filterShape
title: filterShape
description: Вы можете узнать о конфигурационном параметре filterShape в документации библиотеки DHTMLX JavaScript Booking. Изучите руководства разработчика и справочник АПИ, попробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# filterShape

### Описание {#description}

@short: Необязательный. Объект настроек для управления функциональностью фильтра

### Использование {#usage}

~~~jsx {}
filterShape: {
    text?: boolean | [{
        id: string,
        label?: string,
        suggest?: boolean
    }],
    date?: boolean,
    time?: boolean | [{
        from: number | string,
        to: number | string,
        label?: string
    }],
    autoApply?: boolean
};
~~~

### Параметры {#parameters}

- `text` - (необязательный) если `true`, текстовое поле ввода отображается (по умолчанию); если `false`, текстовое поле скрыто
  - `id` - (обязательный) название поля карточки для фильтрации (свойство объекта `data`, например `category` или `title`)
  - `suggest` - (необязательный) если `true`, включается автодополнение и отображаются значения (из объекта [`data`](api/config/booking-data.md)), совпадающие с введённым пользователем текстом
  - `label` - (необязательный) метка для свойства из объекта `data`. См. [Конфигурация по умолчанию](#default-config) ниже.
- `date` - (необязательный) показывает/скрывает поле даты; по умолчанию установлено `true` (поле отображается)
- `time` - (необязательный) показывает/скрывает поле времени. Если установлено значение `true`, принимает массив объектов с параметрами времени по умолчанию для слота. Для каждого объекта можно указать следующие параметры:
  - `from` - (обязательный) время начала слота; может быть числом от 0 до 24, задающим время в часах (например, 9 означает 9:00, 8.5 означает 8:30), или строкой в формате "h:m" (например, "8:30")
  - `to` - (обязательный) время окончания слота; может быть числом от 0 до 24, задающим время в часах (например, 9 означает 9:00, 8.5 означает 8:30), или строкой в формате "h:m" (например, "8:30")
  - `label` - (необязательный) плейсхолдер для поля времени
Если параметры `time` не заданы, применяются значения по умолчанию: см. [Конфигурация по умолчанию](#default-config) ниже.
- `autoApply` - (необязательный) если `true`, критерии поиска применяются автоматически (нет необходимости запускать поиск нажатием кнопки); по умолчанию установлено `false`

### Конфигурация по умолчанию {#default-config}

~~~jsx {}
const defaultTimeRanges = [
    { from: 8, to: 12, label: "Morning" },
    { from: 12, to: 17, label: "Afternoon" },
    { from: 17, to: 20, label: "Evening" }
];

const defaultFilterShape = {
    text: [
        { id: "category", label: "speciality", suggest: true },
        { id: "title", label: "specialist", suggest: true },
        { id: "details", label: "location" }
    ],
    date: true,
    time: defaultTimeRanges,
    autoApply: false
};
~~~

### Пример {#example}

~~~jsx {}
const filterShape = {
    date: false,
    autoApply: true,
    time: [
        { from: 8, to: 11, label: "Morning" },
        { from: 12, to: 18, label: "Afternoon" },
        { from: 18, to: 21, label: "Evening" }
    ]
};

new booking.Booking("#root", {
    data,
    filterShape,
    // другие параметры
});
~~~

Фрагмент ниже демонстрирует, как настроить фильтр:

<iframe src="https://snippet.dhtmlx.com/b5uj78bs?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
