module.exports = {
	docs: [
		{
			type: "doc",
			id: "index"
		},
		{
			type: "doc",
			id: "how-to-start"
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
			link: {
                type: "doc",
                id: "api/overview/booking-api-overview"
            },
			items: [


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
								"api/internal/booking-exec",
								"api/internal/booking-intercept",
								"api/internal/booking-on",
								"api/internal/booking-setnext",
							]
						},
						{
							type: "category",
							label: "State methods",
							collapsible: true,
							collapsed: true,
							items: [
								// "api/internal/booking_innermethodname_method",
								"api/internal/booking-getreactivestate",
								"api/internal/booking-getstate",
							]
						},
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
						"api/events/booking-confirmslot-event",						
						"api/events/booking-filterdata-event",
						"api/events/booking-selectslot-event",
						"api/events/booking-selectitem-event",
						"api/events/booking-selectitemdate-event",
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
						"api/config/booking-data",
						"api/config/booking-cardshape",
						"api/config/booking-filtershape",
						"api/config/booking-formshape",
						"api/config/booking-infoshape",
						"api/config/booking-slotgap",
						"api/config/booking-slotsize",
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
				"guides/localization",
				"guides/loading-data",
				"guides/styling",
				"guides/working-with-hotkeys",
			],
		},
	]
};
