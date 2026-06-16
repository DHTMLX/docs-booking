---
sidebar_label: slotSize
title: slotSize
description: В документации DHTMLX JavaScript Booking вы можете узнать о параметре slotSize. Изучайте руководства для разработчиков и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# slotSize

### Описание {#description}

@short: Необязательный. Определяет длительность слота бронирования для всех карточек

:::note
Это значение применяется в том случае, если параметр `size` или `slotSize` внутри свойства [`data`](api/config/booking-data.md) не задан.
:::

### Использование {#usage}

~~~jsx {}
slotSize?: number;
~~~

### Параметры {#parameters}

- `number` - (необязательный) длительность слота бронирования в минутах; значение по умолчанию — 60 минут

### Пример {#example}

~~~jsx {}
const slotSize = 45;

new booking.Booking("#root", {
    slotSize,
    // другие параметры
});
~~~

В примере ниже показано, как задать длительность и [промежуток](api/config/booking-slotgap.md) для всех слотов:

<iframe src="https://snippet.dhtmlx.com/pw8xsl1p?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
