---
sidebar_label: end
title: end
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать о конечной дате. Просматривайте руководства разработчика и справочник АПИ, изучайте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# end

### Описание {#description}

@short: Необязательный. Задаёт дату, до которой отображаются доступные слоты

### Использование {#usage}

~~~jsx {}
end?: Date;
~~~

### Параметры {#parameters}

- `end` - (необязательный) конечная дата, до которой отображаются доступные слоты; значение по умолчанию — один год от текущей даты.

### Пример {#example}

~~~jsx {}
new booking.Booking("#root", {
    data,
    end: new Date(2025, 11, 11),
    // другие параметры
});
~~~

В примере ниже показано, как задать даты [начала](api/config/booking-start.md) и окончания:

<iframe src="https://snippet.dhtmlx.com/cc28whe7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
