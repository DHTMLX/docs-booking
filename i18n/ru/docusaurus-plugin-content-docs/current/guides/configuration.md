---
sidebar_label: Конфигурация
title: Конфигурация
description: Вы можете узнать о конфигурации в документации библиотеки DHTMLX JavaScript Booking. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# Конфигурация

## Загрузка данных для карточек {#load-data-for-cards}

Передайте объекты карточек в массив [`data`](api/config/booking-data.md) конфигурации Booking. Полный формат данных и сценарии загрузки описаны в руководстве [Загрузка данных](guides/loading-data.md).

## Определение структуры карточек {#define-the-structure-of-cards}

Левая часть каждой карточки отображает фиксированный набор полей данных. Чтобы управлять отображаемыми полями или полностью заменить макет по умолчанию, используйте одно из следующих свойств:

- [`cardShape`](api/config/booking-cardshape.md) — переключение видимости полей по умолчанию
- [`cardTemplate`](api/config/booking-cardtemplate.md) — замена макета по умолчанию пользовательским HTML

:::info
Свойство `cardTemplate` полностью настраивает внешний вид карточки с помощью пользовательского HTML и даёт полный контроль над макетом, оформлением и содержимым. Свойство `cardShape` только скрывает или отображает поля шаблона по умолчанию. Если применить оба свойства, `cardTemplate` переопределяет настройки `cardShape`.
:::

### Переключение полей карточки по умолчанию {#toggle-default-card-fields}

По умолчанию в левой части карточки отображаются следующие поля:

- `preview` — изображение карточки
- `review` — информация о рейтинге: количество звёзд (из пяти) и число отзывов
- `category` — название категории (например, специализация специалиста)
- `title` — заголовок карточки (например, имя специалиста)
- `subtitle` — подзаголовок карточки (например, сведения об опыте)
- `price` — стоимость услуги
- `details` — прочие сведения о карточке

Чтобы скрыть поле, установите соответствующий параметр свойства [`cardShape`](api/config/booking-cardshape.md) в значение `false`.

В примере ниже скрывается поле `details` карточки:

~~~jsx {24}
const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Allergist",
        subtitle: "2 years of experience",
        details: "Lexington Avenue 54\nWheatfields, Hungary",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "27 $",
        review: {
        stars: 4,
        count: 120
    },
        slots: [
            {
                from: 9,
                to: 21
            }
        ]
    }
];

const cardShape = {
    details: false
};

new booking.Booking("#root", {
    data,
    cardShape,
    // другие параметры
});
~~~

:::info
Смотрите пример в [инструменте сниппетов](https://snippet.dhtmlx.com/6mxd7918).
:::

### Применение пользовательского шаблона карточки {#apply-a-custom-card-template}

Свойство [`cardTemplate`](api/config/booking-cardtemplate.md) заменяет левый блок карточки по умолчанию пользовательским HTML.

Создайте функцию, которая принимает объект карточки и возвращает HTML-строку. Расположите свойства элемента карточки в HTML-блоках с пользовательскими стилями.

Следующий фрагмент кода определяет `cardPreviewTemplate`, которая возвращает HTML для карточки с изображением превью, категорией, заголовком и ценой:

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
    const { Booking, template } = booking;

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
</script>
~~~

Импортируйте вспомогательную функцию `template` и назначьте свою пользовательскую функцию свойству `cardTemplate`.

Следующий фрагмент кода подключает `cardPreviewTemplate` к конфигурации Booking:

~~~jsx
const { Booking, template } = booking;

const widget = new Booking("#root", {
	data,
	cardTemplate: template(cardPreviewTemplate),
    // другие параметры
});
~~~

:::info
Смотрите пример в [инструменте сниппетов](https://snippet.dhtmlx.com/k2v01vng).
:::

## Заполнение карточек слотами {#fill-cards-with-slots}

Слот — это единица времени, доступная для бронирования. Виджет отображает доступные слоты на шесть дней (четыре на узких экранах), начиная с текущего дня или с даты начала, выбранной в фильтре.

### Добавление слотов для бронирования {#add-slots-for-booking}

Чтобы добавить слоты бронирования к карточке, добавьте объект в массив `slots` свойства [`data`](api/config/booking-data.md).

В примере ниже добавляются слоты по вторникам и пятницам с 12:00 до 18:00. Каждый слот длится 30 минут, перерыв между слотами — 10 минут:

~~~jsx {15-22}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                from: 12,
                to: 18,
                size: 30,
                gap: 10,
                days: [2, 5]
            },
            {...}, //другие слоты
        ]
    }
];

new booking.Booking("#root", {
    data,
    // другие параметры
});
~~~

### Определение правил слотов {#define-slot-rules}

Каждый объект в массиве `slots` свойства [`data`](api/config/booking-data.md) задаёт:

- время начала и окончания слота
- размер слота (продолжительность в минутах)
- перерыв слота (интервал между слотами)
- дни или даты, к которым применяется правило

Примените одно общее правило ко всем дням карточки или объедините несколько правил для использования разных параметров в выбранные дни или конкретные даты.

Установите размер и перерыв слота на трёх уровнях приоритета (от высшего к низшему):

- `size` и `gap` внутри объекта массива слотов [`data`](api/config/booking-data.md) — применяются к данному конкретному правилу слота
- `slotSize` и `slotGap` внутри объекта карточки свойства [`data`](api/config/booking-data.md) — применяются ко всем слотам данной карточки
- [`slotSize`](api/config/booking-slotsize.md) и [`slotGap`](api/config/booking-slotgap.md) на уровне виджета — применяются ко всем карточкам

:::info
При смешивании общих и специфических правил виджет разрешает их следующим образом:
- Параметры слота, определённые для конкретных дней, переопределяют общие параметры, определённые для всех дней.
- Параметры слота, заданные для конкретных дат, переопределяют параметры, определённые для конкретных дней и всех дней.
- Если несколько объектов слотов охватывают один и тот же день, временные диапазоны (`from` и `to`) с разными значениями `size` или `gap` не должны пересекаться. В противном случае виджет пропускает все данные слотов для этих дней.
:::

Чтобы ограничить диапазон отображаемых слотов, установите дату [`start`](api/config/booking-start.md) и дату [`end`](api/config/booking-end.md) на уровне виджета.

#### Применение одного правила ко всем дням {#apply-one-rule-to-all-days}

Чтобы добавить слоты с одинаковой продолжительностью и временным диапазоном для каждого дня карточки, добавьте один объект в массив `slots`.

Следующий фрагмент кода определяет общее правило для всех дней с 14:00 до 17:00, со слотами по 30 минут и перерывом 10 минут:

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                //общее правило для всех дней
                from: 14, //время начала слотов
                to: 17, // время окончания слотов
                size: 30, // продолжительность каждого слота в минутах
                gap: 10 // перерыв между слотами
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // другие параметры
});
~~~

#### Применение разных правил для дней или дат {#apply-different-rules-per-day-or-date}

Чтобы использовать разные параметры для выбранных дней недели или конкретных дат, добавьте несколько объектов в массив `slots` и задайте параметр `days` или `dates` для каждого правила.

Следующий фрагмент кода объединяет три правила — общее правило, правило для дней недели (вторники и пятницы) и правило для среды, четверга и одной конкретной даты:

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // общее правило для всех дней, кроме перечисленных ниже
                from: 14,
                to: 17,
                size: 30,
                gap: 10
            },
            {
                // применяется по вторникам и пятницам, кроме пятницы,
                // указанной в следующем правиле
                from: 12,
                to: 17,
                size: 50,
                gap: 20,
                days: [2, 5]
            },
            {
                // применяется по средам, четвергам и одной конкретной дате
                from: 18,
                to: 20,
                size: 45,
                gap: 20,
                days: [3, 4],
                dates: [ 1683234000000 ] // 5 мая 2023 г., пятница
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // другие параметры
});
~~~

Чтобы узнать, как задать [продолжительность](api/config/booking-slotsize.md) и [перерыв](api/config/booking-slotgap.md) для всех слотов виджета, [откройте инструмент сниппетов](https://snippet.dhtmlx.com/pw8xsl1p).

### Пометка слотов как занятых или доступных {#mark-slots-as-used-or-available}

Два параметра объекта карточки [`data`](api/config/booking-data.md) управляют тем, какие слоты пользователь может видеть или бронировать:

- `usedSlots` — скрыть забронированные слоты от пользователя
- `availableSlots` — отобразить явный список доступных для бронирования слотов и игнорировать правила массива `slots`

#### Пометка слотов как занятых {#mark-slots-as-used}

Чтобы скрыть забронированные слоты, задайте параметру `usedSlots` массив временных меток начала слотов.

Следующий фрагмент кода скрывает один слот как уже забронированный:

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // общее правило для всех дней
                from: 14, // время начала слота
                to: 17,   // время окончания слота
                size: 30, // продолжительность слота в минутах
                gap: 10   // перерыв между слотами
            }
        ],
        usedSlots: [ 1683234000000 ] // временные метки забронированных слотов в миллисекундах
    }
];

new booking.Booking("#root", {
    data,
    // другие параметры
});
~~~

#### Пометка слотов как доступных {#mark-slots-as-available}

Чтобы отобразить явный список слотов для бронирования, используйте параметр `availableSlots` свойства [`data`](api/config/booking-data.md). При установке `availableSlots` виджет игнорирует все записи в массиве `slots`.

Следующий фрагмент кода задаёт две временные метки как единственные доступные для бронирования слоты карточки:

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // общее правило для всех дней
                from: 14, // время начала слота
                to: 17,   // время окончания слота
                size: 30, // продолжительность слота в минутах
                gap: 10   // перерыв между слотами
            }
        ],
        availableSlots: [ 1693325145000, 1693584345000 ] // временные метки доступных слотов в миллисекундах
    }
];

new booking.Booking("#root", {
    data,
    // другие параметры
});
~~~

## Настройка диалога бронирования {#configure-the-booking-dialog}

Диалог бронирования имеет две настраиваемые части: поля формы, в которые пользователь вводит сведения о бронировании, и информационный блок слева. Для управления каждой частью используйте следующие свойства:

- [`formShape`](api/config/booking-formshape.md) — настройка полей формы
- [`infoShape`](api/config/booking-infoshape.md) — переключение полей информационного блока по умолчанию
- [`infoTemplate`](api/config/booking-infotemplate.md) — замена информационного блока пользовательским HTML-шаблоном

### Настройка полей формы {#configure-form-fields}

Передайте массив дескрипторов полей в свойство [`formShape`](api/config/booking-formshape.md). Каждый дескриптор задаёт тип поля, идентификатор, метку и необязательный флаг `required`.

Следующий фрагмент кода определяет три поля формы, при этом поле `contact` помечено как обязательное:

~~~jsx {}
const formShape = [
    {
        comp: "text",
        key: "name",
        label: "Your name"
    },
    {
        comp: "text",
        key: "contact",
        label: "Mobile",
        required: true
    },
    {
        comp: "textarea",
        key: "description",
        label: "Details"
    }
];

new booking.Booking("#root", {
    formShape,
    // другие параметры
});
~~~

:::info
Смотрите пример в [инструменте сниппетов](https://snippet.dhtmlx.com/yeqkuzx7).
:::

### Переключение полей информационного блока по умолчанию {#toggle-default-information-fields}

Свойство [`infoShape`](api/config/booking-infoshape.md) скрывает или отображает поля информационного блока по умолчанию. Установите поле в `false`, чтобы скрыть его.

Следующий фрагмент кода скрывает поле `details` информационного блока:

~~~jsx {1-7,11}
const infoShape = {
    preview: true,
    category: true,
    title: true,
    price: true,
    details: false
};

new booking.Booking("#root", {
    data,
    infoShape,
    // другие параметры
});
~~~

:::info
Смотрите пример в [инструменте сниппетов](https://snippet.dhtmlx.com/pd6wp1xc).
:::

### Применение пользовательского информационного шаблона {#apply-a-custom-information-template}

Используйте свойство [`infoTemplate`](api/config/booking-infotemplate.md), чтобы полностью заменить информационный блок по умолчанию пользовательским HTML. Если применить оба свойства — `infoTemplate` и `infoShape`, — `infoTemplate` переопределяет настройки `infoShape`.

Определите функцию, которая принимает `item` (объект карточки) и `slot` (временную метку слота) и возвращает HTML-строку. Расположите свойства элемента карточки в HTML-блоках с пользовательскими стилями.

Следующий фрагмент кода определяет `cardInfoTemplate`, которая отображает фото, заголовок, категорию и отформатированную дату выбранного слота:

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
    const { Booking, template } = booking;

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
</script>
~~~

Импортируйте вспомогательную функцию `template` и назначьте свою пользовательскую функцию свойству `infoTemplate`.

Следующий фрагмент кода подключает `cardInfoTemplate` к конфигурации Booking:

~~~jsx
const { Booking, template } = booking;

const widget = new Booking("#root", {
    data,
    infoTemplate: template(cardInfoTemplate),
    // другие параметры
});
~~~

:::info
Смотрите пример в [инструменте сниппетов](https://snippet.dhtmlx.com/byb94ipu).
:::

## Настройка фильтра {#configure-the-filter}

Используйте свойство [`filterShape`](api/config/booking-filtershape.md) для управления отображаемыми полями фильтра и поведением каждого из них. Конфигурация по умолчанию включает три текстовых поля, выбор даты и три временных диапазона:

~~~jsx {}
const defaultTimeRanges = [
    { from: 8, to: 12, label: "Morning" },
    { from: 12, to: 17, label: "Afternoon" },
    { from: 17, to: 20, label: "Evening" }
];

const defaultFilterShape = {
    text: [
        { id: "category", label: "speciality", suggest: true },
        { id: "title", label: "specialist", suggest: true },
        { id: "details", label: "location" }
    ],
    date: true,
    time: defaultTimeRanges,
    autoApply: false
};
~~~

### Скрытие полей фильтра {#hide-filter-input-fields}

По умолчанию виджет отображает все поля ввода — текстовые, временные и дату. Чтобы скрыть поле, установите соответствующий параметр свойства [`filterShape`](api/config/booking-filtershape.md) в значение `false`.

Следующий фрагмент кода скрывает фильтр по дате:

~~~jsx {}
const filterShape = {
    date: false,
};

new booking.Booking("#root", {
    data,
    filterShape,
    // другие параметры
});
~~~

### Настройка текстовых полей фильтра {#configure-text-filter-fields}

Чтобы включить автодополнение в текстовом поле, установите параметр `suggest` в значение `true`. Виджет будет отображать значения из массива [`data`](api/config/booking-data.md), соответствующие вводу пользователя. Используйте параметр `label` для добавления плейсхолдера.

Следующий фрагмент кода включает автодополнение и пользовательские метки для трёх текстовых полей:

~~~jsx {}
const filterShape = {
    text: [
        { id: "category", label: "specialization", suggest: true },
        { id: "title", label: "doctor", suggest: true },
        { id: "details", label: "location", suggest: true }
    ],
};

new booking.Booking("#root", {
    data,
    filterShape,
    // другие параметры
});
~~~

### Настройка временных диапазонов {#configure-time-ranges}

Чтобы определить параметры фильтрации по времени, передайте массив объектов в параметр `time` свойства [`filterShape`](api/config/booking-filtershape.md). Каждый объект принимает следующие ключи:

- `from` — время начала слота: число от 0 до 24 (например, `9` означает 9:00, `8.5` означает 8:30) или строка в формате `"h:m"` (например, `"8:30"`)
- `to` — время окончания слота в том же формате, что и `from`
- `label` — плейсхолдер для временного диапазона

Следующий фрагмент кода определяет четыре временных диапазона с пользовательскими метками:

~~~jsx {}
const filterShape = {
    time: [
        { from: "8:30", to: "11:50", label: "Morning" },
        { from: "12:30", to: "16:50", label: "Afternoon" },
        { from: "17:00", to: "19:50", label: "Evening" },
        { from: "20:00", to: "22:50", label: "Urgent" }
    ]
};

new booking.Booking("#root", {
    data,
    filterShape,
    // другие параметры
});
~~~

### Включение режима autoApply {#enable-autoapply-mode}

Чтобы скрыть кнопку **Search** и применять фильтр немедленно при вводе, установите параметр `autoApply` свойства [`filterShape`](api/config/booking-filtershape.md) в значение `true`.

Следующий фрагмент кода включает автоприменение фильтра:

~~~jsx {}
const filterShape = {
    autoApply: true,
};

new booking.Booking("#root", {
    data,
    filterShape,
    // другие параметры
});
~~~

### Пример фильтра {#filter-example}

Сниппет ниже демонстрирует полную конфигурацию фильтра:

<iframe src="https://snippet.dhtmlx.com/b5uj78bs?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

## Оптимизация рендеринга больших наборов данных {#optimize-rendering-of-large-datasets}

По умолчанию виджет Booking рендерит все загруженные карточки. Для больших наборов данных включите ленивый рендеринг, чтобы виджет отображал только видимые карточки. Используйте свойство [`renderType`](api/config/booking-rendertype.md) для переключения между режимами.

Следующий фрагмент кода включает ленивый рендеринг карточек:

~~~jsx {}
new booking.Booking("#root", {
    data,
    renderType: "lazy",
    // другие параметры
});
~~~
