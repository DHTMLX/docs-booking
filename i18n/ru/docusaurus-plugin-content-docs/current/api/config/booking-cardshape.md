---
sidebar_label: cardShape
title: cardShape
description: Вы можете узнать о конфиге cardShape в документации библиотеки DHTMLX JavaScript Booking. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, и загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# cardShape

### Описание {#description}

@short: Необязательный. Объект с настройками для управления информацией, отображаемой в левой части каждой карточки

### Использование {#usage}

~~~jsx {}
cardShape?: {
    category?: boolean,
    details?: boolean,
    preview?: boolean,
    price?: boolean,
    review?: boolean,
    subtitle?: boolean,
    title?: boolean
};
~~~

### Параметры {#parameters}

В объекте `cardShape` можно указать следующие параметры (поля):

- `category` - (необязательный) показывает/скрывает название категории
- `details` - (необязательный) показывает/скрывает детали
- `preview` - (необязательный) показывает/скрывает изображение предпросмотра
- `price` - (необязательный) показывает/скрывает цену
- `review` - (необязательный) показывает/скрывает информацию о рейтинге
- `subtitle` - (необязательный) показывает/скрывает подзаголовок карточки
- `title` - (необязательный) показывает/скрывает заголовок карточки

### Конфиг по умолчанию {#default-config}

~~~jsx {}
const defaultCardShape = {
    category: true,
    details: true,
    preview: true,
    price: true,
    review: true,
    subtitle: true,
    title: true
};
~~~

### Пример {#example}

~~~jsx {}
const cardShape = {
    review: false,
    subtitle: false,
    price: false
};

new booking.Booking("#root", {
    cardShape,
    // другие параметры
});
~~~

Фрагмент ниже демонстрирует, как настроить отображаемые поля в левой части карточек:

<iframe src="https://snippet.dhtmlx.com/6mxd7918?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
Вы также можете настроить внешний вид карточки с помощью свойства [`cardTemplate`](api/config/booking-cardtemplate.md). Если применены оба свойства — `cardTemplate` и `cardShape`, — `cardTemplate` переопределит настройки `cardShape`.
:::

**Связанные статьи**:

- [Определение структуры карточек](guides/configuration.md#define-the-structure-of-cards)
- [`cardTemplate`](api/config/booking-cardtemplate.md)
