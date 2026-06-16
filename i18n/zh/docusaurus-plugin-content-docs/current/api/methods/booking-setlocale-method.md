---
sidebar_label: setLocale()
title: setLocale() 方法
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 setLocale() 方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天试用版本。
---

# setLocale()

### 描述 {#description}

@short: 为 Booking 应用新的语言环境

### 用法 {#usage}

~~~jsx
setLocale(locale?: object | null): void;
~~~

### 参数 {#parameters}

- `null` - （可选）重置为默认语言环境（英语）
- `locale` - （可选）要应用的新语言环境的数据对象

### 示例 {#example}

~~~jsx {}
// 创建 Booking
const widget = new booking.Booking("#root", {
    data,
    // 初始配置参数
});

// 为 Booking 应用 "de" 语言环境
widget.setLocale(booking.locales.de);

// 为 Booking 应用默认语言环境
widget.setLocale(); // 或 setLocale(null);
~~~

**相关文章**：
- [locale](api/config/booking-locale.md)
- [本地化](guides/localization.md)
