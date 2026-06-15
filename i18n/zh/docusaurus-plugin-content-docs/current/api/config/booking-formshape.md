---
sidebar_label: formShape
title: formShape
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解 formShape 配置项。浏览开发者指南和 API 参考文档，查看代码示例和在线演示，并下载 DHTMLX Booking 的 30 天免费试用版。
---

# formShape

### 描述 {#description}

@short: 可选。一个对象数组，包含用于配置 Booking 对话框中字段的设置

### 用法 {#usage}

~~~jsx {}
formShape: [{
    comp: "text" | "textarea",
    key: string,
    label?: string,
    required?: boolean,
    validation?: (value: any) => boolean,
    errorMessage?: string
}];
~~~

### 参数 {#parameters}

您可以为每个字段指定以下参数：

- `comp` - （必填）字段类型（`text` 或 `textarea`）
- `key` - （必填）字段的 id
- `label` - （可选）字段标签
- `required` - （可选）若值设置为 `true`，则该字段不得为空，且提交预订表单时为必填项；若为 `false`，则该字段可以为空
- `validation` - （可选）一个函数，接收字段值并返回布尔值；当函数返回 `true` 时，该字段被视为有效
- `errorMessage` - （可选）当值未通过验证时显示的消息

### 默认配置 {#default-config}

~~~jsx {}
const defaultFormShape = [
    {
        comp: "text",
        key: "name",
        label: "Name",
        required: true,
        validation: val => {
            return !!val.replace(/\s/g, "");
        },
        errorMessage: " should not be empty"
    },
    {
        comp: "text",
        key: "email",
        label: "Email",
        required: true,
        validation: val => {
            const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return val && regEx.test(val);
        },
        errorMessage: " should contain valid email address"
    },
    {
        comp: "textarea",
        key: "description",
        label: "Description"
    }
];
~~~

### 示例 {#example}

~~~jsx {1-17,21}
const formShape = [
    {
        comp: "text",
        key: "name",
        label: "Name"
    },
    {
        comp: "text",
        key: "contact",
        label: "Mobile"
    },
    {
        comp: "textarea",
        key: "description",
        label: "Details"
    },
];

new booking.Booking("#root", {
    data,
    formShape,
    // 其他参数
});
~~~

以下代码片段展示了如何配置 Booking 对话框中的字段：

<iframe src="https://snippet.dhtmlx.com/yeqkuzx7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
