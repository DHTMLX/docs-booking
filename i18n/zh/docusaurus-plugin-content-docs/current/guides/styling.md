---
sidebar_label: 样式定制
title: 样式定制
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解样式定制的相关内容。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Booking 30 天免费评估版本。
---

# 样式定制

通过 CSS 自定义属性定制 Booking widget。widget 在 `--wx-booking-*` 命名空间下提供 Booking 特定的布局 token，并在 `--wx-*` 命名空间下共享通用设计 token（颜色、边框、排版）。

## 默认样式 {#default-style}

Booking widget 使用 CSS 自定义属性来控制布局尺寸和共享主题 token。在您自己的 CSS 中覆盖这些变量以定制外观。

以下代码片段展示了 widget 提供的 Booking 特定变量的子集（显示的是桌面端默认值；widget 内部会根据屏幕尺寸——桌面端、平板端和移动端——分别重新定义部分变量）：

~~~css
.wx-booking {
    --wx-booking-content-min-width: 984px;
    --wx-booking-content-max-width: 1132px;
    --wx-booking-content-padding: 0 var(--wx-booking-content-h-padding) 28px;
    --wx-booking-slots-width: 602px;
    --wx-booking-slots-padding: 0 30px 0 50px;
    --wx-booking-separator: var(--wx-border);
}
~~~

:::tip 注意
后续版本的 Booking 可能会更改变量名称。升级到新版本后请检查变量名，并相应调整代码以避免显示问题。
:::

## 应用内置主题 {#apply-the-built-in-theme}

widget 提供一个内置主题——Material 主题。

通过向 widget 容器添加对应的 CSS 类来应用主题。

以下代码片段将 Material 主题附加到 Booking 容器：

~~~html {}
<!-- Booking 容器 -->
<div id="root" class="wx-material-theme"></div>
~~~

要从 skins 文件夹加载主题样式表，请在页面中添加 link 标签。

以下代码片段引入 Material 主题样式表：

~~~html {}
<link rel="stylesheet" href="path/to/booking/skins/material.css"/>
~~~

## 定制内置主题 {#customize-the-built-in-theme}

在 `.wx-material-theme` 选择器下覆盖 Material 主题变量。

以下代码片段将 Material 主题重新配色为深色布局：

~~~html
<style>
    .wx-material-theme {
        color-scheme: dark;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-icon-color-hover: rgba(255, 255, 255, 0.2);
        --wx-background: #949393;
        --wx-booking-background: #c0bbbb;
        --wx-background-alt: #a5a3a3;
        --wx-booking-content-background: #a3a1a1;
        --wx-border: 1px solid #818080;
        --wx-border-medium: 1px solid #9e9e9e;
        --wx-input-background: #d6d3d3;
    }
</style>
~~~

## 应用自定义样式 {#apply-custom-styles}

为了与您的项目设计保持一致，可在 Booking 容器上使用自定义类来限定 CSS 变量的作用范围。

以下代码片段为 `.demo` 容器定义了一套自定义调色板：

~~~html
<div id="root" class="demo"></div>
<style>
    .demo {
        --wx-background: #c4c7e0;
        --wx-color-font: rgba(12, 12, 116, 0.9);
        --wx-color-secondary-font: rgba(34, 33, 33, 0.904);
        --wx-icon-color: rgba(149, 179, 223, 0.7);
        --wx-booking-primary-hover: #194e9e;
        --wx-booking-border-color: 1px solid #818080;
        --wx-border: 1px dashed #818080;
    }
</style>
~~~

以下代码片段更改卡片和日期项的背景颜色：

~~~html
<style>
    .demo {
        .wx-booking .wx-list > .wx-card,
        .wx-booking .wx-slot-dates > .wx-date-item {
            background-color: #e8f3f7;
        }

        .wx-booking .wx-slot-dates > .wx-date-item.wx-selected {
            background-color: #bfdde7;
        }
    }
</style>
~~~

## 示例 {#example}

以下代码片段演示了一个自定义 Booking 样式：

<iframe src="https://snippet.dhtmlx.com/d7w3jtqz?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
