---
sidebar_label: Интеграция с React
title: Интеграция с React
description: Вы можете узнать об интеграции с React в документации библиотеки DHTMLX JavaScript Booking. Ознакомьтесь с руководствами разработчика и справочником АПИ, попробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# Интеграция с React {#integration-with-react}

DHTMLX Booking интегрируется с React через компонент-обёртку, который монтирует виджет внутри контейнера с ref. Это руководство поможет вам создать React-проект, установить Booking и отобразить виджет с данными и событиями. Полную эталонную реализацию смотрите в [примере React на GitHub](https://github.com/DHTMLX/react-booking-demo).

:::tip
Это руководство предполагает знакомство с основными концепциями React. Для знакомства с ними обратитесь к [документации React](https://react.dev/learn).
:::

## Создание проекта {#create-a-project}

Создайте React-приложение перед добавлением интеграции с Booking. Используйте Create React App или React с Vite.

:::info
Установите [Vite](https://vite.dev/) (опционально) и [Node.js](https://nodejs.org/en/) перед началом работы.
:::

Следующая команда создаёт новый проект *my-react-booking-app* с помощью Create React App:

~~~bash
npx create-react-app my-react-booking-app
~~~

### Установка зависимостей {#install-dependencies}

Перейдите в директорию проекта.

Следующая команда открывает папку созданного приложения:

~~~bash
cd my-react-booking-app
~~~

Установите зависимости и запустите сервер разработки с помощью вашего пакетного менеджера.

Следующие команды используют [yarn](https://yarnpkg.com/):

~~~bash
yarn
yarn start
~~~

Следующие команды используют [npm](https://www.npmjs.com/):

~~~bash
npm install
npm start
~~~

Приложение запускается на localhost, например *http://localhost:3000*.

## Добавление Booking в приложение {#add-booking-to-the-app}

Остановите сервер разработки перед установкой пакета Booking, затем создайте React-компонент, который оборачивает виджет.

### Шаг 1. Установка пакета {#step-1-install-the-package}

Скачайте [пробный пакет Booking](how-to-start.md#installing-trial-booking-via-npm-or-yarn) и следуйте инструкциям в README пакета. Пробная версия активна в течение 30 дней.

### Шаг 2. Создание компонента Booking {#step-2-create-the-booking-component}

Создайте файл *Booking.jsx* в директории *src/* и выполните описанные ниже шаги для подключения виджета.

#### Импорт исходных файлов {#import-the-source-files}

Импортируйте класс Booking и таблицу стилей, указав путь, соответствующий вашей версии дистрибутива:

- *dhx-booking-package* — PRO-версия, установленная из локальной папки
- *@dhx/trial-booking* — пробная версия

Следующий фрагмент кода импортирует Booking из PRO-пакета:

~~~jsx title="Booking.jsx"
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
~~~

Если ваш PRO-пакет поставляется с минифицированными файлами, импортируйте CSS-файл как *booking.min.css*.

Следующий фрагмент кода импортирует Booking из пробного пакета:

~~~jsx title="Booking.jsx"
import { Booking } from '@dhx/trial-booking';
import "@dhx/trial-booking/dist/booking.css";
~~~

:::info
В этом руководстве используется пробная версия Booking.
:::

#### Настройка контейнера и инициализация Booking {#set-the-container-and-initialize-booking}

Объявите `ref` для хост-контейнера и создайте экземпляр Booking внутри `useEffect()`. Верните функцию очистки, которая вызывает `destructor()` для размонтирования виджета при размонтировании компонента React.

Следующий фрагмент кода объявляет компонент Booking с контейнером через ref и очисткой жизненного цикла:

~~~jsx {2,6,9-10,17} title="Booking.jsx"
import { useEffect, useRef } from "react";
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css"; // импорт стилей Booking

export default function BookingComponent(props) {
    let container = useRef(); // хост-контейнер для Booking

    useEffect(() => {
        // создание экземпляра Booking
        const booking = new Booking(container.current, {});

        return () => {
            booking.destructor(); // размонтирование Booking
        };
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

#### Добавление стилей {#add-the-styles}

Booking требует как таблицу стилей виджета (импортированную выше), так и контейнер с заданными размерами. Установите полную высоту для страницы и контейнера виджета в основном CSS-файле проекта.

Следующий фрагмент кода устанавливает полную высоту для страницы и контейнера Booking:

~~~css title="index.css"
/* стили страницы */
html,
body,
#root {
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

Чтобы загрузить данные карточек в Booking, подготовьте набор данных, соответствующий свойству [`data`](api/config/booking-data.md). Полный формат данных и сценарии загрузки см. в руководстве [Загрузка данных](guides/loading-data.md).

Создайте файл *data.js* в директории *src/*.

Следующий фрагмент кода определяет вспомогательную функцию `getData()`, которая возвращает тестовый набор данных:

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

Откройте *App.js*, импортируйте набор данных и передайте его в компонент `<Booking/>` в качестве пропа.

Следующий фрагмент кода рендерит компонент Booking с пропом `data`:

~~~jsx {2,5-6} title="App.js"
import Booking from "./Booking";
import { getData } from "./data";

function App() {
    const dataset = getData();
    return <Booking data={dataset} />;
}

export default App;
~~~

Откройте *Booking.jsx* и передайте проп `data` в конфигурацию Booking.

Следующий фрагмент кода подключает проп в конструктор Booking:

~~~jsx {5,10} title="Booking.jsx"
import { useEffect, useRef } from "react";
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default function BookingComponent(props) {
    let container = useRef();

    useEffect(() => {
        const booking = new Booking(container.current, {
            data: props.data
            // другие свойства конфигурации
        });

        return () => {
            booking.destructor();
        }
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

Теперь компонент Booking рендерится с загруженными данными. Чтобы дополнительно настроить виджет, передайте дополнительные свойства конфигурации — полный список см. в [обзоре свойств](api/overview/booking-properties-overview.md).

#### Обработка событий {#handle-events}

Действие пользователя в виджете вызывает событие. Подпишитесь на событие с помощью `booking.api.on(eventName, handler)`, чтобы реагировать на действие. Полный список событий см. в [обзоре событий](api/overview/booking-events-overview.md).

Откройте *Booking.jsx* и расширьте `useEffect()` подпиской на событие.

Следующий фрагмент кода выводит в консоль ID слота при выборе пользователем слота:

~~~jsx {5-8} title="Booking.jsx"
// ...
useEffect(() => {
    const booking = new Booking(container.current, {});

    // вывод ID выбранного слота
    booking.api.on("select-slot", (obj) => {
        console.log(obj.id);
    });

    return () => {
        booking.destructor();
    }
}, []);
// ...
~~~

Запустите приложение, чтобы увидеть Booking с загруженными данными на странице.

![Виджет DHTMLX Booking с загруженными данными в приложении React](/img/trial-booking.png)

Адаптируйте код под требования вашего проекта. Полная эталонная реализация доступна на [GitHub](https://github.com/DHTMLX/react-booking-demo).
