---
sidebar_label: infoShape
title: infoShape
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать о конфигурации infoShape. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# infoShape

### Описание {#description}

@short: Необязательный. Объект с настройками для управления информацией, отображаемой на левой стороне диалога Booking

### Использование {#usage}

~~~jsx {}
infoShape?: {
    preview?: boolean,
    category?: boolean,
    title?: boolean,
    price?: boolean,
    details?: boolean
};
~~~

### Параметры {#parameters}

Объект имеет следующие параметры:

- `preview` - (необязательный) показывает/скрывает изображение предварительного просмотра в информационном блоке (левая сторона) диалога Booking
- `category` - (необязательный) показывает/скрывает название категории на левой стороне диалога Booking (например, должность специалиста)
- `title` - (необязательный) показывает/скрывает заголовок в информационном блоке диалога Booking (например, имя специалиста)
- `price` - (необязательный) показывает/скрывает цену в информационном блоке диалога Booking
- `details` - (необязательный) показывает/скрывает детали в информационном блоке диалога Booking

### Конфигурация по умолчанию {#default-config}

~~~jsx {}
const defaultInfoShape = {
    preview: true,
    category: true,
    title: true,
    price: true,
    details: true
};
~~~

### Пример {#example}

~~~jsx {}
const infoShape = {
    preview: false,
    price: false
};

new booking.Booking("#root", {
    data,
    infoShape,
    // другие параметры
});
~~~

Фрагмент ниже показывает, как настроить отображение информации на левой стороне диалога Booking:

<iframe src="https://snippet.dhtmlx.com/pd6wp1xc?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
Вы также можете управлять тем, какие поля отображать в информационном блоке диалога Booking, используя свойство [`infoTemplate`](api/config/booking-infotemplate.md). Однако если применяются оба свойства, `infoTemplate` переопределит настройки `infoShape`.
:::

**Связанные статьи**:

- [Настройка диалога Booking](guides/configuration.md#configure-the-booking-dialog)
- [`infoTemplate`](api/config/booking-infotemplate.md)
