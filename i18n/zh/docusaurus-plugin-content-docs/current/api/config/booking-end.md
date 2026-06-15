---
sidebar_label: end
title: end
description: 您可以在 DHTMLX JavaScript Booking 库的文档中了解结束日期的相关内容。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Booking 免费 30 天评估版本。
---

# end

### 描述 {#description}

@short: 可选。定义显示可用时间段的截止日期

### 用法 {#usage}

~~~jsx {}
end?: Date;
~~~

### 参数 {#parameters}

- `end` - （可选）显示可用时间段的截止日期；默认值为当前日期起一年后。

### 示例 {#example}

~~~jsx {}
new booking.Booking("#root", {
    data,
    end: new Date(2025, 11, 11),
    // 其他参数
});
~~~

以下代码片段展示了如何设置 [开始](api/config/booking-start.md) 日期和结束日期：

<iframe src="https://snippet.dhtmlx.com/cc28whe7?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
