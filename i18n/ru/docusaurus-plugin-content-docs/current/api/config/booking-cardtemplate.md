---
sidebar_label: cardTemplate
title: cardTemplate
description: Вы можете узнать о конфигурации cardTemplate в документации библиотеки DHTMLX JavaScript Booking. Просматривайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# cardTemplate

### Описание {#description}

@short: Опциональный. Позволяет применить шаблон к левому блоку карточки

Свойство задаёт HTML-структуру и компоновку блока каждой карточки (левая сторона карточки). Это означает, что вы можете управлять тем, какие поля отображаются, как они расположены и как выглядят.

:::info
Также вы можете указать, какие поля отображать, с помощью свойства [`cardShape`](api/config/booking-cardshape.md)
:::

### Использование {#usage}

~~~jsx {}
cardTemplate?: ({item: obj}) => string;
~~~

### Параметры {#parameters}

`cardTemplate` принимает функцию, которая получает объект `item` (карточку) на вход и возвращает строку HTML, определяющую внешний вид карточки.

### Пример {#example}

В примере ниже мы создаём функцию, которая принимает объект `item` (карточку) и возвращает HTML для карточки, включающей изображение предпросмотра (item.preview), категорию (item.category), заголовок (item.title) и цену (item.price). Вам нужно создать собственный HTML-шаблон для карточки и импортировать хелпер `template`. Затем передайте функцию в конфигурацию Booking, присвоив её свойству `cardTemplate`.

~~~html {}
<style>
    .custom-preview {
        display: flex;
        width: 100%;
        height: 100%;
        gap: 30px;
    }

    .preview-left {
        width: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    /* другие стили */
</style>

<script>
    const { Booking, template } = booking; //импорт хелпера template

    function cardPreviewTemplate({ item }) {
        return `
            <div class="custom-preview" data-action="preview-click">
                <div class="preview-left">
                    <div
                        style="background-image: url(${item.preview})"
                        class="card-photo"
                    ></div>
                    <!-- <div class="card-photo-empty" /> -->
                    </div>

                    <div class="preview-right">
                    <div class="category">${item.category}</div>
                    <div class="title">${item.title}</div>
                    <div class="price">${item.price}</div>
                </div>
            </div>
            `;
    }

    const widget = new Booking("#root", {
	    data,
	    cardTemplate: template(cardPreviewTemplate), // передаём функцию в конфигурацию Booking
    });
    // другие параметры
</script>
~~~

Фрагмент ниже демонстрирует, как применить шаблон к левому блоку карточки:

<iframe src="https://snippet.dhtmlx.com/k2v01vng?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Связанные статьи**:

- [Определение структуры карточек](guides/configuration.md#define-the-structure-of-cards)
- [`cardShape`](api/config/booking-cardshape.md)
