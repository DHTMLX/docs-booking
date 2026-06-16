---
sidebar_label: 配置
title: 配置
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解配置相关内容。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 的免费 30 天评估版本。
---

# 配置 {#configuration}

## 为卡片加载数据 {#load-data-for-cards}

将卡片对象传入 Booking 配置的 [`data`](api/config/booking-data.md) 数组。有关完整的数据格式和加载方案，请参阅[加载数据](guides/loading-data.md)指南。

## 定义卡片结构 {#define-the-structure-of-cards}

每张卡片的左侧显示一组固定的数据字段。要控制显示哪些字段或完全替换默认布局，请使用以下属性之一：

- [`cardShape`](api/config/booking-cardshape.md) — 切换默认字段的可见性
- [`cardTemplate`](api/config/booking-cardtemplate.md) — 用自定义 HTML 替换默认布局

:::info
`cardTemplate` 属性通过自定义 HTML 完全自定义卡片外观，可全面控制布局、设计和内容。`cardShape` 属性仅隐藏或显示默认模板中的字段。如果同时使用两者，`cardTemplate` 会覆盖 `cardShape` 的设置。
:::

### 切换默认卡片字段 {#toggle-default-card-fields}

卡片左侧默认显示以下字段：

- `preview` — 卡片图片
- `review` — 评分信息，包含星级数（满分五星）和评价数量
- `category` — 类别名称（例如，专家的职位）
- `title` — 卡片标题（例如，专家姓名）
- `subtitle` — 卡片副标题（例如，经验详情）
- `price` — 服务价格
- `details` — 卡片的其他详情

要隐藏某个字段，将 [`cardShape`](api/config/booking-cardshape.md) 属性中对应的参数设置为 `false`。

以下示例隐藏卡片的 `details` 字段：

~~~jsx {24}
const data = [
    {
        id: "ee828b5d-a034-420c-889b-978840015d6a",
        title: "Natalie Tyson",
        category: "Allergist",
        subtitle: "2 years of experience",
        details: "Lexington Avenue 54\nWheatfields, Hungary",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "27 $",
        review: {
        stars: 4,
        count: 120
    },
        slots: [
            {
                from: 9,
                to: 21
            }
        ]
    }
];

const cardShape = {
    details: false
};

new booking.Booking("#root", {
    data,
    cardShape,
    // 其他参数
});
~~~

:::info
请在[代码片段工具](https://snippet.dhtmlx.com/6mxd7918)中查看示例。
:::

### 应用自定义卡片模板 {#apply-a-custom-card-template}

[`cardTemplate`](api/config/booking-cardtemplate.md) 属性将卡片左侧默认区块替换为自定义 HTML。

创建一个接收卡片对象并返回 HTML 字符串的函数，将卡片条目属性组织到带有自定义样式的 HTML 块中。

以下代码片段定义了 `cardPreviewTemplate`，返回包含预览图片、类别、标题和价格的卡片 HTML：

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
    const { Booking, template } = booking;

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
</script>
~~~

导入 `template` 辅助函数，并将自定义函数赋值给 `cardTemplate` 属性。

以下代码片段将 `cardPreviewTemplate` 接入 Booking 配置：

~~~jsx
const { Booking, template } = booking;

const widget = new Booking("#root", {
	data,
	cardTemplate: template(cardPreviewTemplate),
    // 其他参数
});
~~~

:::info
请在[代码片段工具](https://snippet.dhtmlx.com/k2v01vng)中查看示例。
:::

## 为卡片填充时间段 {#fill-cards-with-slots}

时间段（slot）是可供预约的时间单元。widget 从当前日期或过滤器中选定的起始日期开始，显示六天内的可用时间段（窄屏显示四天）。

### 添加预约时间段 {#add-slots-for-booking}

要为卡片添加预约时间段，请在 [`data`](api/config/booking-data.md) 属性的 `slots` 数组中添加一个对象。

以下示例为周二和周五的 12:00 至 18:00 添加时间段，每个时间段持续 30 分钟，时间段之间间隔 10 分钟：

~~~jsx {15-22}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                from: 12,
                to: 18,
                size: 30,
                gap: 10,
                days: [2, 5]
            },
            {...}, // 其他时间段
        ]
    }
];

new booking.Booking("#root", {
    data,
    // 其他参数
});
~~~

### 定义时间段规则 {#define-slot-rules}

[`data`](api/config/booking-data.md) 属性 `slots` 数组中的每个对象指定：

- 时间段的开始和结束时间
- 时间段大小（持续时间，单位：分钟）
- 时间段间隔（时间段之间的间隔）
- 规则适用的星期几或具体日期

可以为卡片的所有天应用一条通用规则，也可以组合多条规则，为特定星期几或具体日期使用不同参数。

按以下优先级（从高到低）在三个层级设置时间段大小和间隔：

- [`data`](api/config/booking-data.md) 的 slots 数组对象内的 `size` 和 `gap` — 应用于该特定时间段规则
- [`data`](api/config/booking-data.md) 属性卡片对象内的 `slotSize` 和 `slotGap` — 应用于该卡片的所有时间段
- widget 级别的 [`slotSize`](api/config/booking-slotsize.md) 和 [`slotGap`](api/config/booking-slotgap.md) — 应用于所有卡片

:::info
当通用规则和特定规则混合使用时，widget 的解析规则如下：
- 针对特定星期几定义的时间段参数会覆盖适用于所有天的通用参数。
- 针对具体日期指定的时间段参数会覆盖针对特定星期几和所有天定义的参数。
- 如果多个时间段对象针对同一天，具有不同 `size` 或 `gap` 的时间范围（`from` 和 `to`）不得重叠。否则，widget 将跳过这些天的所有时间段数据。
:::

要限制显示时间段的范围，请在 widget 级别设置 [`start`](api/config/booking-start.md) 日期和 [`end`](api/config/booking-end.md) 日期。

#### 对所有天应用一条规则 {#apply-one-rule-to-all-days}

要为卡片的每一天添加具有相同持续时间和时间范围的时间段，在 `slots` 数组中添加一个对象即可。

以下代码片段定义了一条适用于所有天的通用规则：14:00 至 17:00，每个时间段 30 分钟，间隔 10 分钟：

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // 适用于所有天的通用规则
                from: 14, // 时间段开始时间
                to: 17, // 时间段结束时间
                size: 30, // 每个时间段的持续时间（分钟）
                gap: 10 // 时间段之间的间隔
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // 其他参数
});
~~~

#### 按星期几或具体日期应用不同规则 {#apply-different-rules-per-day-or-date}

要为特定星期几或具体日期使用不同参数，在 `slots` 数组中添加多个对象，并为每条规则设置 `days` 或 `dates` 参数。

以下代码片段组合了三条规则——通用规则、适用于周二和周五的星期规则，以及适用于周三、周四和一个具体日期的规则：

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // 适用于所有天的通用规则（下列日期除外）
                from: 14,
                to: 17,
                size: 30,
                gap: 10
            },
            {
                // 适用于周二和周五（下一条规则中的周五除外）
                from: 12,
                to: 17,
                size: 50,
                gap: 20,
                days: [2, 5]
            },
            {
                // 适用于周三、周四和一个具体日期
                from: 18,
                to: 20,
                size: 45,
                gap: 20,
                days: [3, 4],
                dates: [ 1683234000000 ] // 2023 年 5 月 5 日，周五
            }
        ]
    }
];

new booking.Booking("#root", {
    data,
    // 其他参数
});
~~~

要了解如何为 widget 中的所有时间段设置[持续时间](api/config/booking-slotsize.md)和[间隔](api/config/booking-slotgap.md)，请[打开代码片段工具](https://snippet.dhtmlx.com/pw8xsl1p)。

### 将时间段标记为已用或可用 {#mark-slots-as-used-or-available}

[`data`](api/config/booking-data.md) 卡片对象的以下两个参数控制用户可以看到或预约哪些时间段：

- `usedSlots` — 向用户隐藏已预约的时间段
- `availableSlots` — 显示可预约时间段的明确列表，并忽略 `slots` 数组中的规则

#### 将时间段标记为已用 {#mark-slots-as-used}

要隐藏已预约的时间段，将 `usedSlots` 参数设置为时间段开始时间戳的数组。

以下代码片段将一个时间段标记为已预约并隐藏：

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // 适用于所有天的通用规则
                from: 14, // 时间段开始时间
                to: 17,   // 时间段结束时间
                size: 30, // 时间段持续时间（分钟）
                gap: 10   // 时间段之间的间隔
            }
        ],
        usedSlots: [ 1683234000000 ] // 已预约时间段的时间戳（毫秒）
    }
];

new booking.Booking("#root", {
    data,
    // 其他参数
});
~~~

#### 将时间段标记为可用 {#mark-slots-as-available}

要显示可预约时间段的明确列表，请使用 [`data`](api/config/booking-data.md) 属性的 `availableSlots` 参数。设置 `availableSlots` 后，widget 将忽略 `slots` 数组中的所有条目。

以下代码片段将两个时间戳设为该卡片唯一可预约的时间段：

~~~jsx {}
const data = [
    {
        id: "5cf364d8-9997-4d8c-9586-48f90f3cb736",
        title: "Natalie Tyson",
        category: "Therapist",
        subtitle: "2 years of experience",
        details: "Cleveland Clinic\n9500 Euclid Ave",
        preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
        price: "37 $",
        review: {
            stars: 1,
            count: 40
        },
        slots: [
            {
                // 适用于所有天的通用规则
                from: 14, // 时间段开始时间
                to: 17,   // 时间段结束时间
                size: 30, // 时间段持续时间（分钟）
                gap: 10   // 时间段之间的间隔
            }
        ],
        availableSlots: [ 1693325145000, 1693584345000 ] // 可用时间段的时间戳（毫秒）
    }
];

new booking.Booking("#root", {
    data,
    // 其他参数
});
~~~

## 配置预约对话框 {#configure-the-booking-dialog}

预约对话框包含两个可配置部分：用户填写预约详情的表单字段，以及左侧的信息区块。使用以下属性分别控制各部分：

- [`formShape`](api/config/booking-formshape.md) — 配置表单字段
- [`infoShape`](api/config/booking-infoshape.md) — 切换信息区块的默认字段
- [`infoTemplate`](api/config/booking-infotemplate.md) — 用自定义 HTML 模板替换信息区块

### 配置表单字段 {#configure-form-fields}

将字段描述符数组传入 [`formShape`](api/config/booking-formshape.md) 属性。每个描述符设置字段类型、标识符、标签以及可选的 `required` 标志。

以下代码片段定义了三个表单字段，其中 `contact` 字段标记为必填：

~~~jsx {}
const formShape = [
    {
        comp: "text",
        key: "name",
        label: "Your name"
    },
    {
        comp: "text",
        key: "contact",
        label: "Mobile",
        required: true
    },
    {
        comp: "textarea",
        key: "description",
        label: "Details"
    }
];

new booking.Booking("#root", {
    formShape,
    // 其他参数
});
~~~

:::info
请在[代码片段工具](https://snippet.dhtmlx.com/yeqkuzx7)中查看示例。
:::

### 切换默认信息字段 {#toggle-default-information-fields}

[`infoShape`](api/config/booking-infoshape.md) 属性用于隐藏或显示信息区块的默认字段。将某个字段设置为 `false` 即可隐藏它。

以下代码片段隐藏信息区块的 `details` 字段：

~~~jsx {1-7,11}
const infoShape = {
    preview: true,
    category: true,
    title: true,
    price: true,
    details: false
};

new booking.Booking("#root", {
    data,
    infoShape,
    // 其他参数
});
~~~

:::info
请在[代码片段工具](https://snippet.dhtmlx.com/pd6wp1xc)中查看示例。
:::

### 应用自定义信息模板 {#apply-a-custom-information-template}

使用 [`infoTemplate`](api/config/booking-infotemplate.md) 属性，将默认信息区块完全替换为自定义 HTML。如果同时应用 `infoTemplate` 和 `infoShape`，`infoTemplate` 会覆盖 `infoShape` 的设置。

定义一个接收 `item`（卡片对象）和 `slot`（时间段时间戳）并返回 HTML 字符串的函数，将卡片条目属性组织到带有自定义样式的 HTML 块中。

以下代码片段定义了 `cardInfoTemplate`，渲染所选时间段的照片、标题、类别和格式化日期：

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
    const { Booking, template } = booking;

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
</script>
~~~

导入 `template` 辅助函数，并将自定义函数赋值给 `infoTemplate` 属性。

以下代码片段将 `cardInfoTemplate` 接入 Booking 配置：

~~~jsx
const { Booking, template } = booking;

const widget = new Booking("#root", {
    data,
    infoTemplate: template(cardInfoTemplate),
    // 其他参数
});
~~~

:::info
请在[代码片段工具](https://snippet.dhtmlx.com/byb94ipu)中查看示例。
:::

## 配置过滤器 {#configure-the-filter}

使用 [`filterShape`](api/config/booking-filtershape.md) 属性控制显示哪些过滤器输入框以及各自的行为。默认配置启用三个文本字段、一个日期选择器和三个时间范围：

~~~jsx {}
const defaultTimeRanges = [
    { from: 8, to: 12, label: "Morning" },
    { from: 12, to: 17, label: "Afternoon" },
    { from: 17, to: 20, label: "Evening" }
];

const defaultFilterShape = {
    text: [
        { id: "category", label: "speciality", suggest: true },
        { id: "title", label: "specialist", suggest: true },
        { id: "details", label: "location" }
    ],
    date: true,
    time: defaultTimeRanges,
    autoApply: false
};
~~~

### 隐藏过滤器输入字段 {#hide-filter-input-fields}

widget 默认显示所有输入字段——文本、时间和日期。要隐藏某个字段，将 [`filterShape`](api/config/booking-filtershape.md) 属性中对应的参数设置为 `false`。

以下代码片段隐藏日期过滤器：

~~~jsx {}
const filterShape = {
    date: false,
};

new booking.Booking("#root", {
    data,
    filterShape,
    // 其他参数
});
~~~

### 配置文本过滤字段 {#configure-text-filter-fields}

要在文本字段中启用自动补全，将 `suggest` 参数设置为 `true`。widget 将从 [`data`](api/config/booking-data.md) 数组中显示与用户输入匹配的值。使用 `label` 参数添加占位符文本。

以下代码片段为三个文本字段启用自动补全和自定义标签：

~~~jsx {}
const filterShape = {
    text: [
        { id: "category", label: "specialization", suggest: true },
        { id: "title", label: "doctor", suggest: true },
        { id: "details", label: "location", suggest: true }
    ],
};

new booking.Booking("#root", {
    data,
    filterShape,
    // 其他参数
});
~~~

### 配置时间范围 {#configure-time-ranges}

要定义时间过滤选项，将对象数组传入 [`filterShape`](api/config/booking-filtershape.md) 属性的 `time` 参数。每个对象接受以下键：

- `from` — 时间段开始时间，取值为 0 到 24 之间的数字（例如，`9` 表示 9:00，`8.5` 表示 8:30）或 `"h:m"` 格式的字符串（例如，`"8:30"`）
- `to` — 时间段结束时间，格式与 `from` 相同
- `label` — 时间范围的占位符文本

以下代码片段定义了四个带自定义标签的时间范围：

~~~jsx {}
const filterShape = {
    time: [
        { from: "8:30", to: "11:50", label: "Morning" },
        { from: "12:30", to: "16:50", label: "Afternoon" },
        { from: "17:00", to: "19:50", label: "Evening" },
        { from: "20:00", to: "22:50", label: "Urgent" }
    ]
};

new booking.Booking("#root", {
    data,
    filterShape,
    // 其他参数
});
~~~

### 启用 autoApply 模式 {#enable-autoapply-mode}

要隐藏**搜索**按钮并立即应用过滤器输入，将 [`filterShape`](api/config/booking-filtershape.md) 属性的 `autoApply` 参数设置为 `true`。

以下代码片段为过滤器启用自动应用：

~~~jsx {}
const filterShape = {
    autoApply: true,
};

new booking.Booking("#root", {
    data,
    filterShape,
    // 其他参数
});
~~~

### 过滤器示例 {#filter-example}

以下代码片段演示完整的过滤器配置：

<iframe src="https://snippet.dhtmlx.com/b5uj78bs?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

## 优化大数据集的渲染 {#optimize-rendering-of-large-datasets}

Booking widget 默认渲染所有已加载的卡片。对于大数据集，请启用懒加载渲染，使 widget 仅渲染可见的卡片。使用 [`renderType`](api/config/booking-rendertype.md) 属性在模式之间切换。

以下代码片段启用卡片的懒加载渲染：

~~~jsx {}
new booking.Booking("#root", {
    data,
    renderType: "lazy",
    // 其他参数
});
~~~
