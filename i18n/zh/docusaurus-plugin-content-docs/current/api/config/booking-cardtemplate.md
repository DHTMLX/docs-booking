---
sidebar_label: cardTemplate
title: cardTemplate
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 cardTemplate 配置项。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# cardTemplate

### 描述 {#description}

@short: 可选。允许为卡片左侧区块应用自定义模板

该属性用于指定每张卡片区块（即每张卡片左侧部分）的 HTML 结构和布局。您可以控制显示哪些字段、字段的排列方式以及外观样式。

:::info
您也可以使用 [`cardShape`](api/config/booking-cardshape.md) 属性来指定要显示的字段
:::

### 用法 {#usage}

~~~jsx {}
cardTemplate?: ({item: obj}) => string;
~~~

### 参数 {#parameters}

`cardTemplate` 接受一个函数，该函数以 `item`（卡片）对象为输入，并返回一个定义卡片外观的 HTML 字符串。

### 示例 {#example}

在以下示例中，我们创建了一个函数，该函数接收 `item`（卡片）对象，并返回包含预览图片（item.preview）、分类（item.category）、标题（item.title）和价格（item.price）的卡片 HTML。您需要创建自己的 HTML 模板并导入 `template` 辅助函数，然后将该函数赋值给 `cardTemplate` 属性，传入 Booking 配置中。

~~~html {}
<style>
    .custom-preview {
        display: flex;
        width: 100%;
        height: 100%;
        gap: 30px;
    }

    .preview-left {
        width: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    /* 其他样式 */
</style>

<script>
    const { Booking, template } = booking; //导入 template 辅助函数

    function cardPreviewTemplate({ item }) {
        return `
            <div class="custom-preview" data-action="preview-click">
                <div class="preview-left">
                    <div
                        style="background-image: url(${item.preview})"
                        class="card-photo"
                    ></div>
                    <!-- <div class="card-photo-empty" /> -->
                    </div>

                    <div class="preview-right">
                    <div class="category">${item.category}</div>
                    <div class="title">${item.title}</div>
                    <div class="price">${item.price}</div>
                </div>
            </div>
            `;
    }

    const widget = new Booking("#root", {
	    data,
	    cardTemplate: template(cardPreviewTemplate), // 将函数传入 Booking 配置
    });
    // 其他参数
</script>
~~~

以下代码片段演示了如何为卡片左侧区块应用模板：

<iframe src="https://snippet.dhtmlx.com/k2v01vng?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**相关文章**：

- [定义卡片结构](guides/configuration.md#define-the-structure-of-cards)
- [`cardShape`](api/config/booking-cardshape.md)
