---
sidebar_label: locale
title: locale
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 locale 的相关内容。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# locale

### 描述 {#description}

@short: 可选。Booking 自定义语言环境的对象

### 用法 {#usage}

~~~jsx
locale?: object;
~~~

### 默认配置 {#default-config}

默认情况下，Booking 使用[英语](guides/localization.md#default-locale)语言环境。您也可以将其设置为自定义语言环境。

:::tip
如需动态切换当前语言环境，可以使用 [`setLocale()`](api/methods/booking-setlocale-method.md) 方法
:::

### 示例 {#example}

~~~jsx
const { data } = getData();
const widget = new booking.Booking("#root", {
    data,
    locale: booking.locales.de
});
~~~

**相关文章**：
- [setLocale()](api/methods/booking-setlocale-method.md)
- [本地化](guides/localization.md)
