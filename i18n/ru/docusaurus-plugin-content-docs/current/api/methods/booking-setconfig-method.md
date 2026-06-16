---
sidebar_label: setConfig()
title: Метод setConfig()
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать о методе setConfig(). Изучайте руководства разработчика и справочник АПИ, смотрите примеры кода и живые демо, скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# setConfig()

### Описание {#description}

@short: Обновляет текущую конфигурацию виджета Booking

Метод используется для обновления текущей конфигурации виджета Booking. Он полезен, когда необходимо обновить базовый набор данных виджета.

### Использование {#usage}

~~~jsx
setConfig(config: object): void;
~~~

### Параметры {#parameters}

- `config` - (обязательный) объект конфигурации Booking. Полный список свойств смотрите [здесь](api/overview/booking-properties-overview.md)

:::info
Метод выполняет поверхностное слияние на верхнем уровне: каждое переданное свойство полностью заменяет существующее — вложенные объекты, такие как `cardShape` или `filterShape`, не объединяются рекурсивно. Чтобы сохранить ранее установленные значения внутри вложенного объекта, передайте его целиком. После этого метод уничтожает текущий компонент и инициализирует новый.
:::

### Пример {#example}

~~~jsx {}
// создание Booking
const widget = new booking.Booking("#root", {
    data,
    cardShape: {
        review: false,
        subtitle: false,
        details: false
    },
    filterShape: {
        date: false,
        autoApply: true,
        time: [
            { from: 8, to: 11, label: "Morning" },
            { from: 12, to: 16, label: "Afternoon" },
            { from: 17, to: 20, label: "Evening" }
        ]
    }
});

// обновление параметров конфигурации
widget.setConfig({
    cardShape: {
        review: true
    },
    filterShape: {
        date: true,
        autoApply: false,
        time: [
            { from: 9, to: 11, label: "Morning" },
            { from: 13, to: 17, label: "Afternoon" },
            { from: 18, to: 20, label: "Evening" }
        ]
    }
});
~~~

Фрагмент ниже демонстрирует, как загрузить уже отфильтрованные данные:

<iframe src="https://snippet.dhtmlx.com/f77ytme5?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
