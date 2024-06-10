// Define Packages
const config = require("./config.json");
let DBD = require("discord-dashboard");
const KeyvMongo = require("@keyv/mongo");
const SoftUI = require("dbd-soft-ui")

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const Handler = new DBD.Handler({
	store: new KeyvMongo(`${process.env.MONGO_URI}`),
});

(async () => {
	await DBD.useLicense(process.env.DASHBOARD_LICENCE);
	DBD.Dashboard = DBD.UpdatedClass();

	const Dashboard = new DBD.Dashboard({
		port: config.dbd.port,
		client: config.discord.client,
		redirectUri: `${config.dbd.domain}${config.dbd.redirectUri}`,
		domain: config.dbd.domain,
		ownerIDs: config.dbd.ownerIDs,
		useThemeMaintenance: true,
		useTheme404: true,
		bot: client,
        theme: SoftUI({
            storage: Handler,
            customThemeOptions: {
                index: async ({ req, res, config }) => {
                    return {
                        values: [],
                        graph: {}, // More info at https://dbd-docs.assistantscenter.com/soft-ui/docs/customThemeOptions/
                        cards: [],
                    }
                },
            },
            websiteName: "Guanxin",
			colorScheme: "blue",
			supporteMail: "adrianfory899+support@gmail.com",
			icons: {
				favicon: "https://cdn.assistantscenter.com/lgsgky05",
				noGuildIcon:
					"https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Circle-1024x1024.png",
				sidebar: {
					darkUrl: "https://cdn.assistantscenter.com/lgsgky05",
					lightUrl: "https://cdn.assistantscenter.com/lgsgky05",
					hideName: false,
					borderRadius: true,
					alignCenter: true,
					gestures: {
						disabled: false,
						gestureTimer: 200,
						gestureSensitivity: 50,
					},
				},
			},
            index: {
                card: {
					category: "Dashboard",
					title: "Beep Boop",
					description:
						"UwU",
					image: "/img/soft-ui.webp",
					// link: {
					// 	enabled: true,
					// 	url: "https://google.com",
					// },
				},
                graph: {
                    enabled: true,
                    lineGraph: false,
                    tag: 'Memory (MB)',
                    max: 100
                },
            },
            sweetalert: {
                errors: {},
                success: {
                    login: "Successfully logged in.",
                }
            },
            preloader: {
                image: "/img/soft-ui.webp",
                spinner: false,
                text: "Page is loading",
            },
            admin: {
                pterodactyl: {
                    enabled: false,
                    apiKey: "apiKey",
                    panelLink: "https://panel.website.com",
                    serverUUIDs: []
                }
            },
            commands: [],
        }),        
		settings: [],
	});
	Dashboard.init();
})();
