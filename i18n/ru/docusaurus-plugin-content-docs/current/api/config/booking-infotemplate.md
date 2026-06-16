---
sidebar_label: infoTemplate
title: infoTemplate
description: Узнайте о конфигурационном параметре infoTemplate в документации библиотеки DHTMLX JavaScript Booking. Изучайте руководства разработчика и справочник АПИ, смотрите примеры кода и демонстрации, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# infoTemplate

### Описание {#description}

@short: Необязательный. Позволяет применить шаблон к информационному блоку в диалоге Booking

### Использование {#usage}

~~~jsx {}
infoTemplate?: ({item: obj, slot: number}) => string;
~~~

### Параметры {#parameters}

`infoTemplate` принимает объект элемента `card` и временну́ю метку выбранного слота `slot` в качестве входных данных и возвращает строку HTML.


### Пример {#example}

В примере ниже определяется функция `cardInfoTemplate`, которая генерирует пользовательский HTML для информационного блока. Эта функция принимает в качестве входных параметров `item` (объект карточки) и `slot` (временну́ю метку слота). Функция возвращает контейнеры div, представляющие информационный блок для выбранного элемента бронирования, включая изображение, категорию, заголовок и отформатированную дату. Также необходимо импортировать вспомогательную функцию `template` и передать свою функцию в `infoTemplate`.

~~~html
<style>
	.custom-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.info-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding: 34px;
		background: rgba(128, 128, 155, 0.12);
		border-radius: 8px;
	}
    /* другие стили */
</style>

<script>
    const { Booking, template } = booking; // импортируем вспомогательную функцию template

    function cardInfoTemplate({
        item,
        slot,
    }) {
            return `
                <div class="custom-info">
                    <div class="info-wrapper">
                        <div class="photo-wrapper">
                            ${getPhotoElement(item.preview, "info")}
                        </div>
                        <span class="info-title">${item.title}</span>
                        <span class="info-category">${item.category}</span>
                        <div class="date" data-action="reset-slot">
                            <i class="icon wxi-calendar"></i>
                            <span>${formatDate(slot, { dateFormat, timeFormat })}</span>
                        </div>
                    </div>
                </div>
            `;
        }

    const widget = new Booking("#root", {
	    data,
	    infoTemplate: template(cardInfoTemplate), // передаём функцию в конфигурацию виджета
    });
</script>
~~~

Фрагмент ниже показывает, как применить шаблон к информационному блоку диалога Booking, который появляется при нажатии пользователем на кнопку временного слота:

<iframe src="https://snippet.dhtmlx.com/byb94ipu?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
Вы также можете управлять тем, какие поля отображаются в информационном блоке диалога Booking, используя свойство [`infoShape`](api/config/booking-infoshape.md). Однако если применены оба свойства, `infoTemplate` переопределит настройки `infoShape`.
:::

**Связанные статьи**:

- [Настройка диалога Booking](guides/configuration.md#configure-the-booking-dialog)
- [`infoShape`](api/config/booking-infoshape.md)
