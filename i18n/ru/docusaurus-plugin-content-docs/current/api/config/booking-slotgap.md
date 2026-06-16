---
sidebar_label: slotGap
title: slotGap
description: В документации DHTMLX JavaScript Booking библиотеки вы можете узнать о параметре slotGap. Изучите руководства разработчика и справочник АПИ, попробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# slotGap

### Описание {#description}

@short: Необязательный. Определяет промежуток между слотами бронирования для всех карточек

:::note
Значение применяется в том случае, если промежуток не задан через параметр `gap` или `slotGap` внутри свойства [`data`](api/config/booking-data.md).
:::

### Использование {#usage}

~~~jsx {}
slotGap?: number;
~~~

### Параметры {#parameters}

- `number` — (необязательный) промежуток между слотами в минутах; по умолчанию равен 0

### Пример {#example}

~~~jsx {}
const slotGap = 10;

new booking.Booking("#root", {
    slotGap,
    // другие параметры
});
~~~

В примере ниже показано, как задать [длительность](api/config/booking-slotsize.md) и промежуток для всех слотов:

<iframe src="https://snippet.dhtmlx.com/pw8xsl1p?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
