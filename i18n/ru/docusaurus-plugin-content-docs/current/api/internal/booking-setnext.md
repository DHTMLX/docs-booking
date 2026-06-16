---
sidebar_label: api.setNext()
title: Метод setNext()
description: В документации библиотеки DHTMLX JavaScript Booking вы можете узнать о методе setNext. Изучите руководства для разработчиков и справочник АПИ, ознакомьтесь с примерами кода и живыми демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Booking.
---

# api.setNext()

### Описание {#description}

@short: Добавляет пользовательский обработчик в конец цепочки Event Bus виджета

### Использование {#usage}

~~~jsx {}
api.setNext(next: any): void;
~~~

### Параметры {#parameters}

- `next` - (обязательный) действие, которое добавляется в порядок **Event Bus**

### Пример {#example}

В примере ниже показано, как с помощью метода `api.setNext()` интегрировать пользовательский класс в порядок Event Bus:

~~~jsx {}
const widget = new booking.Booking("#root", { data: [] });
const server = "https://some-backend-url";

// Предположим, у вас есть пользовательский класс серверного сервиса someServerService
const someServerService = new ServerDataService(server);

fetch(server + "/data").then((res) => res.json()).then((data) => {
    widget.setConfig({data});
});
// Интегрируем someServerService в порядок Event Bus виджета
widget.api.setNext(someServerService);
~~~

**Связанные статьи**: [Загрузка данных](guides/loading-data.md)
