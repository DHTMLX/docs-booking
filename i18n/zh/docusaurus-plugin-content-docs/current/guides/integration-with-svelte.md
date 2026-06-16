---
sidebar_label: 与 Svelte 集成
title: 与 Svelte 集成
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解与 Svelte 的集成方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费试用版本。
---

# 与 Svelte 集成 {#integration-with-svelte}

DHTMLX Booking 通过单文件组件与 Svelte 集成，将 widget 挂载到绑定的容器中。本指南将引导您完成 Svelte 项目的脚手架搭建、Booking 的安装以及带有数据和事件的 widget 渲染。完整的参考实现请参见 [GitHub 上的 Svelte 示例](https://github.com/DHTMLX/svelte-booking-demo)。

:::tip
本指南假设您已熟悉 Svelte 的核心概念。如需入门介绍，请参阅 [Svelte 文档](https://svelte.dev/)。
:::

## 创建项目 {#create-a-project}

在添加 Booking 集成之前，先搭建一个 Svelte 项目脚手架。

:::info
开始之前，请先安装 [Vite](https://vite.dev/)（可选）和 [Node.js](https://nodejs.org/en/)。
:::

以下命令运行 Vite 脚手架工具：

~~~bash
npm create vite@latest
~~~

在提示时将项目命名为 *my-svelte-booking-app*。

### 安装依赖 {#install-dependencies}

切换到项目目录。

以下命令打开新创建的应用文件夹：

~~~bash
cd my-svelte-booking-app
~~~

使用您的包管理器安装依赖并启动开发服务器。

以下命令使用 [yarn](https://yarnpkg.com/)：

~~~bash
yarn
yarn dev
~~~

以下命令使用 [npm](https://www.npmjs.com/)：

~~~bash
npm install
npm run dev
~~~

应用将在本地运行，例如 *[http://localhost:5173](http://localhost:5173)*。

## 将 Booking 添加到应用 {#add-booking-to-the-app}

在安装 Booking 包之前先停止开发服务器，然后创建一个包装 widget 的 Svelte 组件。

### 第一步：安装包 {#step-1-install-the-package}

下载 [Booking 试用包](how-to-start.md#installing-trial-booking-via-npm-or-yarn) 并按照包中 README 的步骤操作。试用版本有效期为 30 天。

### 第二步：创建 Booking 组件 {#step-2-create-the-booking-component}

在 *src/* 目录中创建 *Booking.svelte* 文件，并按照以下步骤连接 widget。

#### 导入源文件 {#import-the-source-files}

使用与您的发行版匹配的路径导入 Booking 类和样式表：

- *dhx-booking-package* — 从本地文件夹安装的 PRO 版本
- *@dhx/trial-booking* — 试用版本

以下代码片段从 PRO 包导入 Booking：

~~~html title="Booking.svelte"
<script>
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
</script>
~~~

如果您的 PRO 包附带压缩资源，请将 CSS 文件导入为 *booking.min.css*。

以下代码片段从试用包导入 Booking：

~~~html title="Booking.svelte"
<script>
import { Booking } from '@dhx/trial-booking';
import '@dhx/trial-booking/dist/booking.css';
</script>
~~~

:::info
本教程使用 Booking 的试用版本。
:::

#### 设置容器并初始化 Booking {#set-the-container-and-initialize-booking}

使用 `bind:this` 绑定宿主容器，并在 `onMount()` 内实例化 Booking。在 `onDestroy()` 中调用 `destructor()`，以便在 Svelte 移除组件时卸载 widget。

以下代码片段声明了一个带有绑定容器和生命周期钩子的 Booking 组件：

~~~html {3,6,10-11,19} title="Booking.svelte"
<script>
    import { onMount, onDestroy } from "svelte";
    import { Booking } from "@dhx/trial-booking";
    import "@dhx/trial-booking/dist/booking.css";

    let container; // Booking 的宿主容器
    let booking;

    onMount(() => {
        // 创建 Booking 实例
        booking = new Booking(container, {})
    });

    onDestroy(() => {
        booking.destructor(); // 卸载 Booking
    });
</script>

<div bind:this={container} class="widget"></div>
~~~

#### 添加样式 {#add-the-styles}

Booking 需要 widget 样式表（已在上方导入）和一个有尺寸的容器。在项目的主 CSS 文件中为页面和 widget 容器设置全高。

以下代码片段为页面和 Booking 容器设置全高：

~~~css title="main.css"
/* 页面样式；使用 #app 根容器 */
html,
body,
#app {
    height: 100%;
    padding: 0;
    margin: 0;
}

/* Booking 容器 */
.widget {
    height: 100%;
}
~~~

#### 加载数据 {#load-data}

要将卡片数据加载到 Booking 中，请准备一个匹配 [`data`](api/config/booking-data.md) 属性的数据集。有关完整的数据格式和加载场景，请参阅[加载数据](guides/loading-data.md)指南。

在 *src/* 目录中创建 *data.js* 文件。

以下代码片段定义了一个返回示例数据集的 `getData()` 辅助函数：

~~~jsx title="data.js"
export function getData() {
    function getDate(addDays, hoursValue = 0, minutesValue = 0) {
        const date = new Date();
        const secondsValue = 0; // 取整到分钟
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

打开 *App.svelte*，导入数据集，并将数据集作为 prop 传递给 `<Booking/>` 组件。

以下代码片段渲染带有 `data` prop 的 Booking 组件：

~~~html {3,5,8} title="App.svelte"
<script>
    import Booking from "./Booking.svelte";
    import { getData } from "./data.js";

    const dataset = getData();
</script>

<Booking data={dataset} />
~~~

打开 *Booking.svelte*，将 `data` prop 传入 Booking 配置。

以下代码片段将 prop 连接到 Booking 构造函数：

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

Booking 组件现在将以加载的数据渲染。如需进一步自定义 widget，可传入额外的配置属性——完整列表请参见 [Properties 概览](api/overview/booking-properties-overview.md)。

#### 处理事件 {#handle-events}

用户在 widget 中的操作会触发一个事件。使用 `booking.api.on(eventName, handler)` 订阅事件以响应该操作。完整的事件列表请参见 [Events 概览](api/overview/booking-events-overview.md)。

打开 *Booking.svelte*，在 `onMount()` 中添加事件订阅。

以下代码片段在用户选择时间段时打印时间段 ID：

~~~html {8-11} title="Booking.svelte"
<script>
// ...
let booking;

onMount(() => {
    booking = new Booking(container, {})

    // 打印选中的时间段 id
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

启动应用，即可在页面上看到加载了数据的 Booking。

![在 Svelte 应用中加载数据的 DHTMLX Booking 小部件](/img/trial-booking.png)

根据您的项目需求自定义代码。完整的参考实现可在 [GitHub](https://github.com/DHTMLX/svelte-booking-demo) 上获取。
