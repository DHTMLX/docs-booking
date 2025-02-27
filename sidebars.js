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
					link: {
							type: "doc",
							id: "api/overview/booking-methods-overview"
					},
			     	items: [
						"api/methods/booking-serialize-method",
						"api/methods/booking-setconfig-method",
						"api/methods/booking-setconfirmhandler-method",
						"api/methods/booking-setlocale-method"
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
							link: {
								type: "doc",
								id: "api/overview/booking-internal-eventbus-overview"
							},
							items: [
								//"api/internal/booking_innermethodname_method",
								"api/internal/booking-detach",
								"api/internal/booking-exec",
								"api/internal/booking-intercept",
								"api/internal/booking-on",
								"api/internal/booking-setnext"
							]
						},
						{
							type: "category",
							label: "State methods",
							collapsible: true,
							collapsed: true,
							link: {
								type: "doc",
								id: "api/overview/booking-internal-state-overview"
							},
							items: [
								// "api/internal/booking_innermethodname_method",
								"api/internal/booking-getreactivestate",
								"api/internal/booking-getstate"
							]
						}
					]
				},
				{
					type: "category",
					label: "Booking events",
					collapsible: true,
					collapsed: true,
					link: {
                        type: "doc",
                        id: "api/overview/booking-events-overview"
                    },
					items: [
						// Booking events
						//"api/events/booking_eventname_event",
						"api/events/booking-confirmslot-event",						
						"api/events/booking-filterdata-event",
						"api/events/booking-selectslot-event",
						"api/events/booking-selectitem-event",
						"api/events/booking-selectitemdate-event"
					]
				},
				{
					type: "category",
					label: "Booking properties",
					collapsible: true,
					collapsed: true,
					link: {
                        type: "doc",
                        id: "api/overview/booking-properties-overview"
                    },
					items: [
						// Booking properties
						"api/config/booking-cardshape",
						"api/config/booking-cardtemplate",
						"api/config/booking-data",
						"api/config/booking-end",
						"api/config/booking-filtershape",
						"api/config/booking-formshape",
						"api/config/booking-infoshape",
						"api/config/booking-infotemplate",
						"api/config/booking-locale",
						"api/config/booking-rendertype",
						"api/config/booking-slotgap",
						"api/config/booking-slotsize",
						"api/config/booking-start"
					]
				}
			]
		},
		//start Backend and frameworks integration
        {
            type: "category",
            label: "Backend and frameworks integration",
            link: {
                type: 'generated-index',
                title: "Backend and frameworks integration",
                keywords: ['backend and frameworks integration'],
                image: '/img/docusaurus.png'
            },
            items: [
				"guides/saving-reservations",
                "guides/integration-with-angular",
                "guides/integration-with-react",
                "guides/integration-with-vue",
                "guides/integration-with-svelte"
            ]
        },
        // end Backend and frameworks integration
		{
			type: "category",
			label: "Guides",
			collapsible: true,
			collapsed: false,
			link: {
				type: 'generated-index',
				title: 'Guides',
				keywords: ['guides'],
				image: '/img/docusaurus.png'
			},
			items: [
				"guides/initialization",
				"guides/loading-data",
				"guides/configuration",
				"guides/localization",				
				"guides/styling"
			]
		}
	]
};
