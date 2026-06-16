---
sidebar_label: 与 Angular 集成
title: 与 Angular 集成
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解与 Angular 集成的相关内容。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载免费的 30 天评估版 DHTMLX Booking。
---

# 与 Angular 集成 {#integration-with-angular}

DHTMLX Booking 通过自定义组件包装 widget 构造函数，与 Angular 进行集成。本指南将带您完成创建新 Angular 项目、安装 Booking 以及渲染含数据和事件的 widget 的全过程。完整的参考实现请参见 [GitHub 上的 Angular 示例](https://github.com/DHTMLX/angular-booking-demo)。

:::tip
本指南假设您已熟悉 Angular 核心概念。如需入门介绍，请参阅 [Angular 文档](https://v17.angular.io/docs)。
:::

## 创建项目 {#create-a-project}

在添加 Booking 集成之前，先使用 Angular CLI 创建一个新的 Angular 应用。

:::info
开始前请先安装 [Angular CLI](https://v17.angular.io/cli) 和 [Node.js](https://nodejs.org/en/)。
:::

以下命令将创建一个名为 *my-angular-booking-app* 的新项目：

~~~bash
ng new my-angular-booking-app
~~~

:::note
当 CLI 提示时，请禁用服务端渲染（SSR）和静态站点生成（SSG/Prerendering）。Booking widget 在客户端挂载到 DOM。
:::

该命令会安装所有必要的工具，无需执行额外命令。

### 安装依赖 {#install-dependencies}

切换到项目目录。

以下命令将打开新创建的应用文件夹：

~~~bash
cd my-angular-booking-app
~~~

使用您的包管理器安装依赖并启动开发服务器。

以下命令使用 [yarn](https://yarnpkg.com/)：

~~~bash
yarn
yarn start
~~~

以下命令使用 [npm](https://www.npmjs.com/)：

~~~bash
npm install
npm start
~~~

应用将在本地运行，例如 *[http://localhost:4200](http://localhost:4200)*。

## 将 Booking 添加到应用 {#add-booking-to-the-app}

在安装 Booking 包之前，请先停止开发服务器，然后创建一个包装 widget 的 Angular 组件。

### 第 1 步：安装包 {#step-1-install-the-package}

下载 [试用版 Booking 包](how-to-start.md#installing-trial-booking-via-npm-or-yarn) 并按照包中 README 的步骤操作。试用版有效期为 30 天。

### 第 2 步：创建 Booking 组件 {#step-2-create-the-booking-component}

在 *src/app/* 目录下创建 *booking* 文件夹，并在其中添加 *booking.component.ts* 文件。按照以下步骤完成 widget 的连接。

#### 导入源文件 {#import-the-source-files}

根据您使用的发行版，通过对应路径导入 Booking 类：

- *dhx-booking-package* — 从本地文件夹安装的 PRO 版本
- *@dhx/trial-booking* — 试用版

以下代码片段从 PRO 包导入 Booking：

~~~ts
import { Booking } from 'dhx-booking-package';
~~~

以下代码片段从试用包导入 Booking：

~~~ts
import { Booking } from '@dhx/trial-booking';
~~~

:::info
本教程使用 Booking 试用版。
:::

#### 设置容器并初始化 Booking {#set-the-container-and-initialize-booking}

在组件模板中定义宿主容器，并在 `ngOnInit()` 中实例化 Booking。在 `ngOnDestroy()` 中调用 `destructor()`，以便在 Angular 移除组件时卸载 widget。

以下代码片段声明了一个带有容器元素和生命周期钩子的 Booking 组件：

~~~ts {1,8,12-13,18-19} title="booking.component.ts"
import { Booking } from '@dhx/trial-booking';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "booking", // 在 app.component.ts 中以 <booking /> 使用
    styleUrls: ["./booking.component.css"],
    template: `<div #container class="widget"></div>`,
})

export class BookingComponent implements OnInit, OnDestroy {
    // Booking 的宿主容器
    @ViewChild('container', { static: true }) booking_container!: ElementRef;

    private _booking!: Booking;

    ngOnInit() {
        // 创建 Booking 实例
        this._booking = new Booking(this.booking_container.nativeElement, {});
    }

    ngOnDestroy(): void {
        this._booking.destructor(); // 卸载 Booking
    }
}
~~~

#### 添加样式 {#add-the-styles}

Booking 需要 widget 样式表和一个具有尺寸的容器。

在 *src/app/booking/* 目录下创建 *booking.component.css* 文件。

以下代码片段导入 Booking 样式表，并为页面和 widget 容器设置全高：

~~~css title="booking.component.css"
/* 导入 Booking 样式 */
@import "@dhx/trial-booking/dist/booking.css";

/* 页面样式 */
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

/* Booking 容器 */
.widget {
    height: 100%;
}
~~~

#### 加载数据 {#load-data}

要向 Booking 加载卡片数据，请准备符合 [`data`](api/config/booking-data.md) 属性格式的数据集。有关完整的数据格式和加载场景，请参阅[加载数据](guides/loading-data.md)指南。

在 *src/app/booking/* 目录下创建 *data.ts* 文件。

以下代码片段定义了一个返回示例数据集的 `getData()` 辅助函数：

~~~ts title="data.ts"
export function getData() : any {
    function getDate(addDays : any, hoursValue = 0, minutesValue = 0) {
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
                },
            ],
            usedSlots: [getDate(0, 12), getDate(0, 18)]
        },
        // ...
    ];
}
~~~

打开 *booking.component.ts*，导入数据集，并在 `ngOnInit()` 中将其传入 Booking 配置。

以下代码片段将 `getData()` 连接到 Booking 构造函数：

~~~ts {2,18,20} title="booking.component.ts"
import { Booking } from '@dhx/trial-booking';
import { getData } from "./data"; // 导入数据
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "booking",
    styleUrls: ["./booking.component.css"],
    template: `<div #container class="widget"></div>`,
})

export class BookingComponent implements OnInit, OnDestroy {
    @ViewChild('container', { static: true }) booking_container!: ElementRef;

    private _booking!: Booking;

    ngOnInit() {
        const data = getData(); // 加载数据集
        this._booking = new Booking(this.booking_container.nativeElement, {
            data
        });
    }

    ngOnDestroy(): void {
        this._booking.destructor();
    }
}
~~~

Booking 组件现在将渲染已加载的数据。如需进一步自定义 widget，可传入额外的配置属性——完整列表请参阅 [Properties 概览](api/overview/booking-properties-overview.md)。

#### 处理事件 {#handle-events}

用户在 widget 中执行操作时会触发相应事件。使用 `booking.api.on(eventName, handler)` 订阅事件以响应该操作。完整的事件列表请参阅 [Events 概览](api/overview/booking-events-overview.md)。

打开 *booking.component.ts*，在 `ngOnInit()` 中添加事件订阅。

以下代码片段在用户选择时段时记录时段 ID：

~~~ts {7-10} title="booking.component.ts"
// ...
ngOnInit() {
    this._booking = new Booking(this.booking_container.nativeElement, {
        start: new Date(2024, 5, 10),
    });

    // 记录已选时段的 id
    this._booking.api.on("select-slot", (obj) => {
        console.log(obj.id);
    });
}

ngOnDestroy(): void {
    this._booking.destructor();
}
~~~

### 第 3 步：在应用中注册 Booking {#step-3-register-booking-in-the-app}

将 `BookingComponent` 添加到应用引导程序中。打开 *src/app/app.component.ts* 并替换默认代码。

以下代码片段在 `AppComponent` 中渲染 Booking 组件：

~~~ts {5} title="app.component.ts"
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<booking/>` // 模板定义于 booking.component.ts
})
export class AppComponent {
    name = "";
}
~~~

在 *src/app/* 中创建 *app.module.ts*，并声明两个组件。

以下代码片段在根模块中注册 `AppComponent` 和 `BookingComponent`：

~~~ts {4-5,8} title="app.module.ts"
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BookingComponent } from "./booking/booking.component";

@NgModule({
    declarations: [AppComponent, BookingComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
~~~

打开 *src/main.ts* 并引导根模块。

以下代码片段使用 `AppModule` 启动应用：

~~~ts title="main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
~~~

启动应用，即可看到页面上已加载数据的 Booking。

![在 Angular 应用中加载数据的 DHTMLX Booking 小部件](/img/trial-booking.png)

根据您的项目需求自定义代码。完整的参考实现可在 [GitHub](https://github.com/DHTMLX/angular-booking-demo) 上获取。
