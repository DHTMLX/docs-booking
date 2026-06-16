---
sidebar_label: Интеграция с Vue
title: Интеграция с Vue
description: Вы можете узнать об интеграции с Vue в документации библиотеки DHTMLX JavaScript Booking. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# Интеграция с Vue {#integration-with-vue}

DHTMLX Booking интегрируется с Vue 3 через однофайловый компонент, который монтирует виджет внутри контейнера с `ref`. Это руководство проведёт вас через создание проекта Vue, установку Booking и отрисовку виджета с данными и событиями. Полная эталонная реализация доступна в [примере Vue на GitHub](https://github.com/DHTMLX/vue-booking-demo).

:::tip
Это руководство предполагает знакомство с основными концепциями Vue 3. Для ознакомления см. [документацию Vue 3](https://vuejs.org/guide/introduction.html#getting-started).
:::

## Создание проекта {#create-a-project}

Создайте проект Vue перед добавлением интеграции с Booking.

:::info
Перед началом установите [Node.js](https://nodejs.org/en/).
:::

Следующая команда запускает официальный инструмент создания проекта Vue:

~~~bash
npm create vue@latest
~~~

Команда устанавливает и выполняет `create-vue`. Описание запросов и параметров см. в [Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application). При появлении запроса назовите проект *my-vue-booking-app*.

### Установка зависимостей {#install-dependencies}

Перейдите в каталог проекта.

Следующая команда открывает только что созданную папку приложения:

~~~bash
cd my-vue-booking-app
~~~

Установите зависимости и запустите сервер разработки с помощью вашего пакетного менеджера.

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

Остановите сервер разработки перед установкой пакета Booking, затем создайте компонент Vue, оборачивающий виджет.

### Шаг 1. Установка пакета {#step-1-install-the-package}

Загрузите [ознакомительный пакет Booking](how-to-start.md#installing-trial-booking-via-npm-or-yarn) и следуйте инструкциям в README пакета. Ознакомительная версия активна в течение 30 дней.

### Шаг 2. Создание компонента Booking {#step-2-create-the-booking-component}

Создайте файл *Booking.vue* в каталоге *src/components/* и выполните шаги ниже для подключения виджета.

#### Импорт исходных файлов {#import-the-source-files}

Импортируйте класс Booking и таблицу стилей, указав путь, соответствующий вашей версии дистрибутива:

- *dhx-booking-package* — PRO-версия, установленная из локальной папки
- *@dhx/trial-booking* — ознакомительная версия

Следующий фрагмент кода импортирует Booking из PRO-пакета:

~~~html title="Booking.vue"
<script>
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
</script>
~~~

Если ваш PRO-пакет поставляется с минифицированными ресурсами, импортируйте CSS-файл как *booking.min.css*.

Следующий фрагмент кода импортирует Booking из ознакомительного пакета:

~~~html title="Booking.vue"
<script>
import { Booking } from '@dhx/trial-booking';
import '@dhx/trial-booking/dist/booking.css';
</script>
~~~

:::info
В этом руководстве используется ознакомительная версия Booking.
:::

#### Настройка контейнера и инициализация Booking {#set-the-container-and-initialize-booking}

Объявите контейнер-хост в шаблоне и создайте экземпляр Booking в хуке `mounted()`. Вызовите `destructor()` в `unmounted()`, чтобы размонтировать виджет при удалении компонента Vue.

Следующий фрагмент кода объявляет компонент Booking с контейнером через ref и хуками жизненного цикла:

~~~html {2,7-8,18} title="Booking.vue"
<script>
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default {
    mounted() {
        // создание экземпляра Booking
        this.booking = new Booking(this.$refs.container, {});
    },

    unmounted() {
        this.booking.destructor(); // размонтирование Booking
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

#### Добавление стилей {#add-the-styles}

Booking требует как таблицу стилей виджета (импортированную выше), так и контейнер с заданными размерами. Установите полную высоту для страницы и контейнера виджета в главном CSS-файле проекта.

Следующий фрагмент кода устанавливает полную высоту для страницы и контейнера Booking:

~~~css title="main.css"
/* стили страницы — используется корневой контейнер #app */
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

Для загрузки данных карточек в Booking подготовьте набор данных, соответствующий свойству [`data`](api/config/booking-data.md). Полный формат данных и сценарии загрузки см. в руководстве [Загрузка данных](guides/loading-data.md).

Создайте файл *data.js* в каталоге *src/*.

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

Откройте *App.vue*, импортируйте набор данных, предоставьте его через опцию `data()` и передайте набор данных компоненту `<Booking/>` в качестве пропа.

Следующий фрагмент кода отображает компонент Booking с пропом `data`:

~~~html {3,7-10,15} title="App.vue"
<script>
import Booking from "./components/Booking.vue";
import { getData } from "./data";

export default {
    components: { Booking },
    data() {
        const dataset = getData();
        return { dataset };
    }
};
</script>

<template>
    <Booking :data="dataset" />
</template>
~~~

Откройте *Booking.vue* и передайте проп `data` в конфигурацию Booking.

Следующий фрагмент кода подключает проп к конструктору Booking:

~~~html {6,10} title="Booking.vue"
<script>
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default {
    props: ["data"],

    mounted() {
        this.booking = new Booking(this.$refs.container, {
            data: this.data,
            // другие свойства конфигурации
        });
    },

    unmounted() {
        this.booking.destructor();
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

Компонент Booking теперь отображается с загруженными данными. Для дальнейшей настройки виджета передайте дополнительные свойства конфигурации — полный список см. в [обзоре свойств](api/overview/booking-properties-overview.md).

#### Обработка событий {#handle-events}

Действие пользователя в виджете вызывает событие. Подпишитесь на событие с помощью `booking.api.on(eventName, handler)`, чтобы реагировать на действие. Полный список событий см. в [обзоре событий](api/overview/booking-events-overview.md).

Откройте *Booking.vue* и расширьте `mounted()` подпиской на событие.

Следующий фрагмент кода выводит в лог идентификатор слота, когда пользователь выбирает слот:

~~~html {8-11} title="Booking.vue"
<script>
// ...
export default {
    // ...
    mounted() {
        this.booking = new Booking(this.$refs.container, {});

        // вывод в лог идентификатора выбранного слота
        this.booking.api.on("select-slot", (obj) => {
            console.log(obj.id);
        });
    }
    // ...
}
</script>

<!--...-->
~~~

Запустите приложение, чтобы увидеть Booking с загруженными данными на странице.

![Инициализация Booking](../assets/trial-booking.png)

Настройте код в соответствии с требованиями вашего проекта. Полная эталонная реализация доступна на [GitHub](https://github.com/DHTMLX/vue-booking-demo).
