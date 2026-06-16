---
sidebar_label: locale
title: locale
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать о настройке локали. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# locale

### Описание {#description}

@short: Необязательный. Объект пользовательской локали Booking

### Использование {#usage}

~~~jsx
locale?: object;
~~~

### Конфигурация по умолчанию {#default-config}

По умолчанию Booking использует локаль [English](guides/localization.md#default-locale). Вы также можете задать пользовательскую локаль.

:::tip
Чтобы изменить текущую локаль динамически, используйте метод [`setLocale()`](api/methods/booking-setlocale-method.md)
:::

### Пример {#example}

~~~jsx
const { data } = getData();
const widget = new booking.Booking("#root", {
    data,
    locale: booking.locales.de
});
~~~

**Связанные статьи**:
- [setLocale()](api/methods/booking-setlocale-method.md)
- [Локализация](guides/localization.md)
