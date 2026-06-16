---
sidebar_label: formShape
title: formShape
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать о конфиге formShape. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# formShape

### Описание {#description}

@short: Опциональный. Массив объектов, содержащих настройки для конфигурирования полей в диалоге Booking

### Использование {#usage}

~~~jsx {}
formShape: [{
    comp: "text" | "textarea",
    key: string,
    label?: string,
    required?: boolean,
    validation?: (value: any) => boolean,
    errorMessage?: string
}];
~~~

### Параметры {#parameters}

Для каждого поля можно указать следующие параметры:

- `comp` - (обязательный) тип поля (`text` или `textarea`)
- `key` - (обязательный) идентификатор поля
- `label` - (опциональный) метка поля
- `required` - (опциональный) если значение установлено в `true`, поле не должно быть пустым и его необходимо заполнить для отправки формы бронирования; если `false`, поле может быть пустым
- `validation` - (опциональный) функция, которая принимает значение поля и возвращает булево значение; поле считается валидным, когда функция возвращает `true`
- `errorMessage` - (опциональный) сообщение, отображаемое когда значение не проходит валидацию

### Конфигурация по умолчанию {#default-config}

~~~jsx {}
const defaultFormShape = [
    {
        comp: "text",
        key: "name",
        label: "Name",
        required: true,
        validation: val => {
            return !!val.replace(/\s/g, "");
        },
        errorMessage: " should not be empty"
    },
    {
        comp: "text",
        key: "email",
        label: "Email",
        required: true,
        validation: val => {
            const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return val && regEx.test(val);
        },
        errorMessage: " should contain valid email address"
    },
    {
        comp: "textarea",
        key: "description",
        label: "Description"
    }
];
~~~

### Пример {#example}

~~~jsx {1-17,21}
const formShape = [
    {
        comp: "text",
        key: "name",
        label: "Name"
    },
    {
        comp: "text",
        key: "contact",
        label: "Mobile"
    },
    {
        comp: "textarea",
        key: "description",
        label: "Details"
    },
];

new booking.Booking("#root", {
    data,
    formShape,
    // другие параметры
});
~~~

Фрагмент ниже показывает, как настроить поля в диалоге Booking:

<iframe src="https://snippet.dhtmlx.com/yeqkuzx7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
