module.exports = {
	docs: [
		{
			type: "doc",
			id: "index"
		},
		{
			type: "doc",
			id: "how_to_start"
		},
		{
			type: "doc",
			id: "news/whats_new"
		},
		{
			type: "category",
			label: "API",
			collapsible: true,
			collapsed: false,
			items: [
				"api/api_overview",
				// Booking methods
				{
					type: "category",
					label: "Booking methods",
					collapsible: true,
					collapsed: true,
					items: [
						"api/methods/booking_methodname_method",
					]
				},
				// Booking internal methods
				{
					type: "category",
					label: "Booking internal API",
					collapsible: true,
					collapsed: true,
					items: [
						{
							type: "category",
							label: "Event Bus methods",
							collapsible: true,
							collapsed: true,
							items: [
								//"api/internal/booking_innermethodname_method",
								"api/internal/js_booking_exec",
								"api/internal/js_booking_intercept",
								"api/internal/js_booking_on",
								"api/internal/js_booking_setnext",
							]
						},
						{
							type: "category",
							label: "State methods",
							collapsible: true,
							collapsed: true,
							items: [
								// "api/internal/booking_innermethodname_method",
								"api/internal/js_booking_getreactivestate",
								"api/internal/js_booking_getstate",
							]
						},
						{
							type: "category",
							label: "REST methods",
							collapsible: true,
							collapsed: true,
							items: [
								"api/internal/booking_innermethodname_method",
							]
						}
					]
				},
				{
					type: "category",
					label: "Booking events",
					collapsible: true,
					collapsed: true,
					items: [
						// Booking events
						//"api/events/booking_eventname_event",
						"api/events/js_booking_confirmslot_event",
						"api/events/js_booking_selectslot_event",
						"api/events/js_booking_setfilter_event",
					]
				},
				{
					type: "category",
					label: "Booking properties",
					collapsible: true,
					collapsed: true,
					items: [
						// Booking properties
						// "api/config/booking_configname_config", // To delete before release! 
						"api/config/js_booking_data",
						"api/config/js_booking_cardshape",
						"api/config/js_booking_filteredcards",
						"api/config/js_booking_filtershape",
						"api/config/js_booking_formshape",
						"api/config/js_booking_infoshape",
					]
				}
			]
		},
		{
			type: "category",
			label: "Guides",
			collapsible: true,
			collapsed: true,
			items: [
				"guides/initialization",
				"guides/configuration",
				"guides/customization",
				"guides/localization",
				"guides/loading_data",
				"guides/working_with_server",
				"guides/working_with_hotkeys",
			],
		},
	]
};
