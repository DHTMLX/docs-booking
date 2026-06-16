---
sidebar_label: Стилизация
title: Стилизация
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать о стилизации виджета. Изучите руководства разработчика и справочник АПИ, попробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# Стилизация {#styling}

Настраивайте виджет Booking с помощью CSS custom properties. Виджет предоставляет специфичные для Booking токены разметки в пространстве имён `--wx-booking-*` и общие токены дизайна (цвета, границы, типографика) в пространстве имён `--wx-*`.

## Стиль по умолчанию {#default-style}

Виджет Booking использует CSS custom properties для размеров разметки и общих токенов темы. Переопределите эти переменные в своём CSS, чтобы изменить внешний вид.

Следующий фрагмент кода показывает подмножество переменных, специфичных для Booking, которые предоставляет виджет (показаны со значениями для десктопа; внутренне виджет переопределяет некоторые из них в зависимости от размера экрана — десктоп, планшет и мобильный):

~~~css
.wx-booking {
    --wx-booking-content-min-width: 984px;
    --wx-booking-content-max-width: 1132px;
    --wx-booking-content-padding: 0 var(--wx-booking-content-h-padding) 28px;
    --wx-booking-slots-width: 602px;
    --wx-booking-slots-padding: 0 30px 0 50px;
    --wx-booking-separator: var(--wx-border);
}
~~~

:::tip Примечание
В следующих версиях Booking названия переменных могут измениться. Проверяйте названия после обновления до новой версии и корректируйте код, чтобы избежать проблем с отображением.
:::

## Применение встроенной темы {#apply-the-built-in-theme}

Виджет предоставляет одну встроенную тему — тему Material.

Примените тему, добавив соответствующий CSS-класс к контейнеру виджета.

Следующий фрагмент кода подключает тему Material к контейнеру Booking:

~~~html {}
<!-- Контейнер Booking -->
<div id="root" class="wx-material-theme"></div>
~~~

Чтобы загрузить таблицу стилей темы из папки skins, добавьте тег link на страницу.

Следующий фрагмент кода подключает таблицу стилей темы Material:

~~~html {}
<link rel="stylesheet" href="path/to/booking/skins/material.css"/>
~~~

## Кастомизация встроенной темы {#customize-the-built-in-theme}

Переопределите переменные темы Material под селектором `.wx-material-theme`.

Следующий фрагмент кода перекрашивает тему Material для тёмного оформления:

~~~html
<style>
    .wx-material-theme {
        color-scheme: dark;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-icon-color-hover: rgba(255, 255, 255, 0.2);
        --wx-background: #949393;
        --wx-booking-background: #c0bbbb;
        --wx-background-alt: #a5a3a3;
        --wx-booking-content-background: #a3a1a1;
        --wx-border: 1px solid #818080;
        --wx-border-medium: 1px solid #9e9e9e;
        --wx-input-background: #d6d3d3;
    }
</style>
~~~

## Применение пользовательских стилей {#apply-custom-styles}

Чтобы привести виджет в соответствие с дизайном проекта, задайте CSS-переменные под пользовательским классом на контейнере Booking.

Следующий фрагмент кода определяет пользовательскую палитру для контейнера `.demo`:

~~~html
<div id="root" class="demo"></div>
<style>
    .demo {
        --wx-background: #c4c7e0;
        --wx-color-font: rgba(12, 12, 116, 0.9);
        --wx-color-secondary-font: rgba(34, 33, 33, 0.904);
        --wx-icon-color: rgba(149, 179, 223, 0.7);
        --wx-booking-primary-hover: #194e9e;
        --wx-booking-border-color: 1px solid #818080;
        --wx-border: 1px dashed #818080;
    }
</style>
~~~

Следующий фрагмент кода изменяет цвет фона карточек и элементов дат:

~~~html
<style>
    .demo {
        .wx-booking .wx-list > .wx-card,
        .wx-booking .wx-slot-dates > .wx-date-item {
            background-color: #e8f3f7;
        }

        .wx-booking .wx-slot-dates > .wx-date-item.wx-selected {
            background-color: #bfdde7;
        }
    }
</style>
~~~

## Пример {#example}

Следующий сниппет демонстрирует пользовательский стиль Booking:

<iframe src="https://snippet.dhtmlx.com/d7w3jtqz?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
