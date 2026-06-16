---
sidebar_label: Интеграция со Svelte
title: Интеграция со Svelte
description: Вы можете узнать об интеграции со Svelte в документации библиотеки DHTMLX JavaScript Booking. Просматривайте руководства разработчика и справочник АПИ, изучайте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# Интеграция со Svelte {#integration-with-svelte}

DHTMLX Booking интегрируется со Svelte через однофайловый компонент, который монтирует виджет внутри привязанного контейнера. Это руководство проведёт вас через создание проекта на Svelte, установку Booking и отображение виджета с данными и событиями. Полную эталонную реализацию смотрите в [примере Svelte на GitHub](https://github.com/DHTMLX/svelte-booking-demo).

:::tip
Это руководство предполагает знакомство с основными концепциями Svelte. Для введения см. [документацию Svelte](https://svelte.dev/).
:::

## Создание проекта {#create-a-project}

Создайте проект на Svelte перед добавлением интеграции с Booking.

:::info
Установите [Vite](https://vite.dev/) (опционально) и [Node.js](https://nodejs.org/en/) перед началом работы.
:::

Следующая команда запускает инструмент создания проектов Vite:

~~~bash
npm create vite@latest
~~~

При появлении запроса назовите проект *my-svelte-booking-app*.

### Установка зависимостей {#install-dependencies}

Перейдите в директорию проекта.

Следующая команда открывает папку только что созданного приложения:

~~~bash
cd my-svelte-booking-app
~~~

Установите зависимости и запустите dev-сервер с помощью вашего пакетного менеджера.

Следующие команды используют [yarn](https://yarnpkg.com/):

~~~bash
yarn
yarn dev
~~~

Следующие команды используют [npm](https://www.npmjs.com/):

~~~bash
npm install
npm run dev
~~~

Приложение запускается на localhost, например *http://localhost:5173*.

## Добавление Booking в приложение {#add-booking-to-the-app}

Остановите dev-сервер перед установкой пакета Booking, затем создайте компонент Svelte, который оборачивает виджет.

### Шаг 1. Установка пакета {#step-1-install-the-package}

Загрузите [ознакомительный пакет Booking](how-to-start.md#installing-trial-booking-via-npm-or-yarn) и следуйте инструкциям в README пакета. Ознакомительная версия остаётся активной в течение 30 дней.

### Шаг 2. Создание компонента Booking {#step-2-create-the-booking-component}

Создайте файл *Booking.svelte* в директории *src/* и выполните описанные ниже шаги для подключения виджета.

#### Импорт исходных файлов {#import-the-source-files}

Импортируйте класс Booking и таблицу стилей, указав путь, соответствующий вашему дистрибутиву:

- *dhx-booking-package* — PRO-версия, установленная из локальной папки
- *@dhx/trial-booking* — ознакомительная версия

Следующий фрагмент кода импортирует Booking из PRO-пакета:

~~~html title="Booking.svelte"
<script>
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
</script>
~~~

Если ваш PRO-пакет поставляется с минифицированными ресурсами, импортируйте CSS-файл как *booking.min.css*.

Следующий фрагмент кода импортирует Booking из ознакомительного пакета:

~~~html title="Booking.svelte"
<script>
import { Booking } from '@dhx/trial-booking';
import '@dhx/trial-booking/dist/booking.css';
</script>
~~~

:::info
В этом руководстве используется ознакомительная версия Booking.
:::

#### Настройка контейнера и инициализация Booking {#set-the-container-and-initialize-booking}

Привяжите хост-контейнер с помощью `bind:this` и создайте экземпляр Booking внутри `onMount()`. Вызовите `destructor()` в `onDestroy()`, чтобы размонтировать виджет при удалении компонента Svelte.

Следующий фрагмент кода объявляет компонент Booking с привязанным контейнером и хуками жизненного цикла:

~~~html {3,6,10-11,19} title="Booking.svelte"
<script>
    import { onMount, onDestroy } from "svelte";
    import { Booking } from "@dhx/trial-booking";
    import "@dhx/trial-booking/dist/booking.css";

    let container; // хост-контейнер для Booking
    let booking;

    onMount(() => {
        // создание экземпляра Booking
        booking = new Booking(container, {})
    });

    onDestroy(() => {
        booking.destructor(); // размонтирование Booking
    });
</script>

<div bind:this={container} class="widget"></div>
~~~

#### Добавление стилей {#add-the-styles}

Booking требует как таблицы стилей виджета (импортированной выше), так и контейнера с заданными размерами. Установите полную высоту для страницы и контейнера виджета в главном CSS-файле проекта.

Следующий фрагмент кода устанавливает полную высоту для страницы и контейнера Booking:

~~~css title="main.css"
/* стили страницы; используется корневой контейнер #app */
html,
body,
#app {
    height: 100%;
    padding: 0;
    margin: 0;
}

/* контейнер Booking */
.widget {
    height: 100%;
}
~~~

#### Загрузка данных {#load-data}

Чтобы загрузить данные карточек в Booking, подготовьте набор данных, соответствующий свойству [`data`](api/config/booking-data.md). Полный формат данных и сценарии загрузки смотрите в руководстве [Загрузка данных](guides/loading-data.md).

Создайте файл *data.js* в директории *src/*.

Следующий фрагмент кода определяет вспомогательную функцию `getData()`, возвращающую пример набора данных:

~~~jsx title="data.js"
export function getData() {
    function getDate(addDays, hoursValue = 0, minutesValue = 0) {
        const date = new Date();
        const secondsValue = 0; // округление до минут
        const msValue = 0;

        date.setDate(date.getDate() + addDays);
        date.setHours(hoursValue, minutesValue, secondsValue, msValue);

        return date.getTime();
    }

    return [
        {
            id: "ee828b5d-a034-420c-889b-978840015d6a",
            title: "Natalie Tyson",
            category: "Therapist",
            subtitle: "2 years of experience",
            details: "Cleveland Clinic\n9500 Euclid Ave",
            preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
            price: "$35",
            review: {
                stars: 4,
                count: 120
            },
            slots: [
                {
                    from: 9,
                    to: 20,
                    days: [1, 2, 3, 4, 5]
                },
                {
                    from: 10,
                    to: 18,
                    days: [6, 0]
                }
            ]
        },
        {
            id: "9b037564-77be-429f-b719-eebbe499027a",
            title: "Emma Johnson",
            category: "Cardiologist",
            subtitle: "2 years of experience",
            details: "Stanford Health Care\n1468 Madison Ave",
            preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/03.jpg",
            price: "$25",
            review: {
                stars: 5,
                count: 10
            },
            slots: [
                {
                    from: 14,
                    to: 17,
                    size: 30,
                    gap: 10
                },
                {
                    from: 12,
                    to: 19,
                    size: 50,
                    gap: 20,
                    days: [2],
                    dates: [getDate(0)]
                },
                {
                    from: "18:30",
                    to: 20,
                    size: 20,
                    gap: 20,
                    days: [3, 4, 5]
                }
            ],
            usedSlots: [getDate(0, 12), getDate(0, 18)]
        },
        // ...
    ];
}
~~~

Откройте *App.svelte*, импортируйте набор данных и передайте его компоненту `<Booking/>` в качестве пропса.

Следующий фрагмент кода отображает компонент Booking с пропсом `data`:

~~~html {3,5,8} title="App.svelte"
<script>
    import Booking from "./Booking.svelte";
    import { getData } from "./data.js";

    const dataset = getData();
</script>

<Booking data={dataset} />
~~~

Откройте *Booking.svelte* и передайте пропс `data` в конфигурацию Booking.

Следующий фрагмент кода подключает пропс к конструктору Booking:

~~~html {6,13} title="Booking.svelte"
<script>
import { onMount, onDestroy } from "svelte";
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export let data;

let container;
let booking;

onMount(() => {
    booking = new Booking(container, {
        data
    })
});

onDestroy(() => {
    booking.destructor();
});
</script>

<div bind:this={container} class="widget"></div>
~~~

Компонент Booking теперь отображается с загруженными данными. Для дальнейшей настройки виджета передайте дополнительные свойства конфигурации — полный список смотрите в [Обзоре свойств](api/overview/booking-properties-overview.md).

#### Обработка событий {#handle-events}

Действие пользователя в виджете вызывает событие. Подпишитесь на событие с помощью `booking.api.on(eventName, handler)`, чтобы реагировать на это действие. Полный список событий смотрите в [Обзоре событий](api/overview/booking-events-overview.md).

Откройте *Booking.svelte* и расширьте `onMount()` подпиской на событие.

Следующий фрагмент кода выводит в консоль ID слота при его выборе пользователем:

~~~html {8-11} title="Booking.svelte"
<script>
// ...
let booking;

onMount(() => {
    booking = new Booking(container, {})

    // вывод ID выбранного слота в консоль
    booking.api.on("select-slot", (obj) => {
        console.log(obj.id);
    });
});

onDestroy(() => {
    booking.destructor();
});
</script>

// ...
~~~

Запустите приложение, чтобы увидеть Booking с загруженными данными на странице.

![Инициализация Booking](../assets/trial-booking.png)

Настройте код в соответствии с требованиями вашего проекта. Полная эталонная реализация доступна на [GitHub](https://github.com/DHTMLX/svelte-booking-demo).
