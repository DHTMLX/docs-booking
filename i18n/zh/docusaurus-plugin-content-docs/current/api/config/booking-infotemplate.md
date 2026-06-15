---
sidebar_label: infoTemplate
title: infoTemplate
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 infoTemplate 配置项。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载免费的 30 天试用版 DHTMLX Booking。
---

# infoTemplate

### 描述 {#description}

@short: 可选。允许为 Booking 对话框中的信息块应用模板

### 用法 {#usage}

~~~jsx {}
infoTemplate?: ({item: obj, slot: number}) => string;
~~~

### 参数 {#parameters}

`infoTemplate` 接收 `card` 条目对象和选定的 `slot` 时间戳作为输入，并返回一个 HTML 字符串。


### 示例 {#example}

在下面的示例中，我们定义了 `cardInfoTemplate` 函数，用于为信息块生成自定义 HTML。该函数接收 `item`（卡片对象）和 `slot`（时间槽时间戳）作为输入参数。函数返回 div 容器，表示所选预订条目的信息块，包括图片、分类、标题和格式化日期。您还需要导入 `template` 辅助函数，并将自定义函数赋值给 `infoTemplate`。

~~~html
<style>
	.custom-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.info-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding: 34px;
		background: rgba(128, 128, 155, 0.12);
		border-radius: 8px;
	}
    /* 其他样式 */
</style>

<script>
    const { Booking, template } = booking; // 导入 template 辅助函数

    function cardInfoTemplate({
        item,
        slot,
    }) {
            return `
                <div class="custom-info">
                    <div class="info-wrapper">
                        <div class="photo-wrapper">
                            ${getPhotoElement(item.preview, "info")}
                        </div>
                        <span class="info-title">${item.title}</span>
                        <span class="info-category">${item.category}</span>
                        <div class="date" data-action="reset-slot">
                            <i class="icon wxi-calendar"></i>
                            <span>${formatDate(slot, { dateFormat, timeFormat })}</span>
                        </div>
                    </div>
                </div>
            `;
        }

    const widget = new Booking("#root", {
	    data,
	    infoTemplate: template(cardInfoTemplate), // 将函数传入 widget 配置
    });
</script>
~~~

以下代码片段展示了如何为 Booking 对话框的信息块应用模板，该对话框会在用户点击时间槽按钮时出现：

<iframe src="https://snippet.dhtmlx.com/byb94ipu?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

:::info
您也可以使用 [`infoShape`](api/config/booking-infoshape.md) 属性控制 Booking 对话框信息块中显示的字段。但如果两个属性同时使用，`infoTemplate` 将覆盖 `infoShape` 的设置。
:::

**相关文章**：

- [配置 Booking 对话框](guides/configuration.md#configure-the-booking-dialog)
- [`infoShape`](api/config/booking-infoshape.md)
