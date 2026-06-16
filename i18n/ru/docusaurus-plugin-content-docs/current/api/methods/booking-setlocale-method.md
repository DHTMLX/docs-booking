---
sidebar_label: setLocale()
title: Метод setLocale()
description: В документации DHTMLX JavaScript Booking вы можете узнать о методе setLocale(). Изучайте руководства разработчика и справочник АПИ, запускайте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# setLocale()

### Описание {#description}

@short: Применяет новую локаль к Booking

### Использование {#usage}

~~~jsx
setLocale(locale?: object | null): void;
~~~

### Параметры {#parameters}

- `null` - (необязательный) сбрасывает к локали по умолчанию (английской)
- `locale` - (необязательный) объект с данными новой применяемой локали

### Пример {#example}

~~~jsx {}
// создаём Booking
const widget = new booking.Booking("#root", {
    data,
    // начальные параметры конфигурации
});

// применяем локаль "de" к Booking
widget.setLocale(booking.locales.de);

// применяем локаль по умолчанию к Booking
widget.setLocale(); // или setLocale(null);
~~~

**Связанные статьи**:
- [locale](api/config/booking-locale.md)
- [Локализация](guides/localization.md)
