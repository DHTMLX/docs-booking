---
sidebar_label: renderType
title: renderType
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать о свойстве renderType. Изучайте руководства разработчика и справочник АПИ, просматривайте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# renderType

### Описание {#description}

@short: Необязательное. Определяет способ отрисовки карточек

Свойство помогает оптимизировать производительность при работе с большим количеством карточек.

### Использование {#usage}

~~~jsx {}
renderType?: "default" | "lazy";
~~~

### Параметры {#parameters}

- `default` - отрисовывает все карточки, загруженные в виджет (задано по умолчанию)
- `lazy` - отрисовывает только видимые карточки

### Пример {#example}

~~~jsx {}
new booking.Booking("#root", {
    data,
    renderType: "lazy",
    // другие параметры
});
~~~

Фрагмент ниже показывает, как обрабатывать отрисовку больших наборов данных:

<iframe src="https://snippet.dhtmlx.com/fb9a5a3b?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
