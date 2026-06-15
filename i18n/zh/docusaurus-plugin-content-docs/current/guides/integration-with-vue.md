---
sidebar_label: 与 Vue 集成
title: 与 Vue 集成
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解与 Vue 集成的相关内容。浏览开发者指南和 API 参考，体验代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费试用版本。
---

# 与 Vue 集成 {#integration-with-vue}

DHTMLX Booking 通过单文件组件与 Vue 3 集成，将 widget 挂载到一个 `ref` 绑定的容器中。本指南将引导您完成 Vue 项目的脚手架搭建、Booking 的安装以及 widget 的数据与事件渲染。完整的参考实现请参见 [GitHub 上的 Vue 示例](https://github.com/DHTMLX/vue-booking-demo)。

:::tip
本指南假设您已熟悉 Vue 3 的核心概念。如需入门介绍，请参阅 [Vue 3 文档](https://vuejs.org/guide/introduction.html#getting-started)。
:::

## 创建项目 {#create-a-project}

在添加 Booking 集成之前，请先搭建一个 Vue 项目。

:::info
开始前请先安装 [Node.js](https://nodejs.org/en/)。
:::

以下命令运行官方 Vue 脚手架工具：

~~~bash
npm create vue@latest
~~~

该命令将安装并执行 `create-vue`。关于提示选项的说明，请参阅 [Vue.js 快速上手](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)。在提示时将项目命名为 *my-vue-booking-app*。

### 安装依赖 {#install-dependencies}

切换到项目目录。

以下命令打开新创建的应用文件夹：

~~~bash
cd my-vue-booking-app
~~~

使用包管理器安装依赖并启动开发服务器。

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

安装 Booking 包之前请先停止开发服务器，然后创建一个包装 widget 的 Vue 组件。

### 第一步：安装包 {#step-1-install-the-package}

下载 [试用版 Booking 包](how-to-start.md#installing-trial-booking-via-npm-or-yarn) 并按照包中 README 的步骤操作。试用版有效期为 30 天。

### 第二步：创建 Booking 组件 {#step-2-create-the-booking-component}

在 *src/components/* 目录中创建 *Booking.vue* 文件，并按照以下步骤完成 widget 的连接。

#### 引入源文件 {#import-the-source-files}

根据您的发行版本，使用对应路径引入 Booking 类和样式文件：

- *dhx-booking-package* — 从本地文件夹安装的 PRO 版本
- *@dhx/trial-booking* — 试用版本

以下代码片段从 PRO 包引入 Booking：

~~~html title="Booking.vue"
<script>
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
</script>
~~~

如果您的 PRO 包附带了压缩资源，请将 CSS 文件引入为 *booking.min.css*。

以下代码片段从试用包引入 Booking：

~~~html title="Booking.vue"
<script>
import { Booking } from '@dhx/trial-booking';
import '@dhx/trial-booking/dist/booking.css';
</script>
~~~

:::info
本教程使用试用版 Booking。
:::

#### 设置容器并初始化 Booking {#set-the-container-and-initialize-booking}

在模板中声明宿主容器，并在 `mounted()` 钩子中实例化 Booking。在 `unmounted()` 中调用 `destructor()`，以便在 Vue 移除组件时卸载 widget。

以下代码片段声明了一个带有 ref 容器和生命周期钩子的 Booking 组件：

~~~html {2,7-8,18} title="Booking.vue"
<script>
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default {
    mounted() {
        // 创建 Booking 实例
        this.booking = new Booking(this.$refs.container, {});
    },

    unmounted() {
        this.booking.destructor(); // 卸载 Booking
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

#### 添加样式 {#add-the-styles}

Booking 需要 widget 样式文件（已在上方引入）以及一个具有固定尺寸的容器。请在项目的主 CSS 文件中为页面和 widget 容器设置全高。

以下代码片段为页面和 Booking 容器设置全高：

~~~css title="main.css"
/* 页面样式 — 使用 #app 根容器 */
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

要将卡片数据加载到 Booking 中，请准备一个符合 [`data`](api/config/booking-data.md) 属性格式的数据集。关于完整的数据格式和加载场景，请参阅[加载数据](guides/loading-data.md)指南。

在 *src/* 目录中创建 *data.js* 文件。

以下代码片段定义了一个返回示例数据集的 `getData()` 辅助函数：

~~~jsx title="data.js"
export function getData() {
    function getDate(addDays, hoursValue = 0, minutesValue = 0) {
        const date = new Date();
        const secondsValue = 0; // 精确到分钟
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

打开 *App.vue*，引入数据集，通过 `data()` 选项将其暴露出来，并以 prop 的形式将数据集传递给 `<Booking/>` 组件。

以下代码片段渲染了带有 `data` prop 的 Booking 组件：

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

打开 *Booking.vue*，将 `data` prop 传入 Booking 配置。

以下代码片段将 prop 连接到 Booking 构造函数：

~~~html {6,10} title="Booking.vue"
<script>
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default {
    props: ["data"],

    mounted() {
        this.booking = new Booking(this.$refs.container, {
            data: this.data,
            // 其他配置属性
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

Booking 组件现在将渲染已加载的数据。如需进一步自定义 widget，可传入额外的配置属性——完整列表请参阅 [属性概览](api/overview/booking-properties-overview.md)。

#### 处理事件 {#handle-events}

用户在 widget 中的操作会触发相应的事件。使用 `booking.api.on(eventName, handler)` 订阅事件以响应操作。完整的事件列表请参阅 [事件概览](api/overview/booking-events-overview.md)。

打开 *Booking.vue*，在 `mounted()` 中添加事件订阅。

以下代码片段在用户选择时间段时记录该时间段的 ID：

~~~html {8-11} title="Booking.vue"
<script>
// ...
export default {
    // ...
    mounted() {
        this.booking = new Booking(this.$refs.container, {});

        // 记录已选时间段的 id
        this.booking.api.on("select-slot", (obj) => {
            console.log(obj.id);
        });
    }
    // ...
}
</script>

<!--...-->
~~~

启动应用，即可看到页面中已加载数据的 Booking。

![Booking 初始化](../assets/trial-booking.png)

根据您的项目需求自定义代码。完整的参考实现可在 [GitHub](https://github.com/DHTMLX/vue-booking-demo) 上获取。
