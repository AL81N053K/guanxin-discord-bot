const { Client, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, StringSelectMenuBuilder} = require("discord.js")
let DBD = require("discord-dashboard");
const KeyvMongo = require("@keyv/mongo");
const os = require("os");
const SoftUI = require("dbd-soft-ui");

var express = require("express");
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

const config = client.config;

var store = new MongoDBStore({
	uri: process.env.MONGO_URI,
	collection: "mySessions",
});

store.on("error", function (error) {
	console.log(error);
});

const WelcomeDB = require("./schemas/Welcome.js");
const MusicSettingsDB = require("./schemas/MusicSettings.js");

const Handler = new DBD.Handler({
	store: new KeyvMongo(process.env.MONGO_URI),
});

(async () => {
    const { user } = client

	let Core = [];
	let Music = [];

	const core = client.commands.filter((x) => x.category === "Core");
	const mus = client.commands.filter((x) => x.category === "Music");

	CommandPush(core, Core);
	CommandPush(mus, Music);

	await DBD.useLicense(config.dbd.license);
	DBD.Dashboard = DBD.UpdatedClass();

	const Dashboard = new DBD.Dashboard({
		port: config.dbd.port,
		client: config.discord.client,
		redirectUri: `${config.dbd.domain}${config.dbd.redirectUri}`,
		domain: config.dbd.domain,
		ownerIDs: config.dbd.ownerIDs,
		useThemeMaintenance: true,
		useTheme404: true,
		acceptPrivacyPolicy: true,
		bot: client,
		sessionSaveSession: store,
		theme: SoftUI({
			storage: Handler,
			customThemeOptions: {
				index: async ({ req, res, config }) => {
					return {
						values: [],
						graph: {}, // More info at https://dbd-docs.assistantscenter.com/soft-ui/docs/customThemeOptions/
						cards: [],
					};
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
					description: "UwU",
					image: "/img/soft-ui.webp",
					// link: {
					// 	enabled: true,
					// 	url: "https://google.com",
					// },
				},
				graph: {
					enabled: true,
					lineGraph: false,
					tag: "Memory (MB)",
					max: 100,
				},
			},
			sweetalert: {
				errors: {},
				success: {
					login: "Successfully logged in.",
				},
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
					serverUUIDs: [],
				},
			},
			commands: [
				{
					category: "Core",
					subTitle: "Core commands",
					alliasesDisabled: false,
					list: Core,
				},
				{
					category: "Music",
					subTitle: "Music commands",
					alliasesDisabled: false,
					list: Music,
				},
			],
		}),
		settings: [
			// Welcome System
			/* {
				categoryId: "welcome",
				categoryName: "Welcome",
				categoryDescription: "Setup the Welcome Channel",
				categoryImageURL:
					"https://cdn.assistantscenter.com/lgsgky05",
				categoryOptionsList: [
					{
						optionId: "welch",
						optionName: "Welcome Channel",
						optionDescription: "Set or reset the server's welcome channel",
						optionType: DBD.formTypes.channelsSelect(
							false,
							(channelTypes = [ChannelType.GuildText])
						),
						getActualSet: async ({ guild }) => {
							let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);
							if (data) return data.Channel;
							else return null;
						},
						setNew: async ({ guild, newData }) => {
							let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);

							if (!newData) newData = null;

							if (!data) {
								data = new WelcomeDB({
									Guild: guild.id,
									Channel: newData,
									Msg: null,
									Content: false,
									Embed: false,
								});

								await data.save();
							} else {
								data.Channel = newData;
								await data.save();
							}

							return;
						},
					},
					{
						optionId: "welmsg",
						optionName: "Welcome Message",
						optionDescription: "Set the welcome messsage",
						optionType: DBD.formTypes.input(
							"Welcome to my server!",
							1,
							256,
							false,
							false
						),
						getActualSet: async ({ guild }) => {
							let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);
							if (data) return data.Msg;
							else return null;
						},
						setNew: async ({ guild, newData }) => {
							let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);

							if (!newData) newData = null;

							if (!data) {
								data = new WelcomeDB({
									Guild: guild.id,
									Channel: null,
									Msg: newData,
									Content: false,
									Embed: false,
								});

								await data.save();
							} else {
								data.Msg = newData;
								await data.save();
							}

							return;
						},
					},
					{
						optionId: "welmsg",
						optionName: "Welcome Message Background",
						optionDescription: "Set the welcome messsages background image",
						optionType: DBD.formTypes.input(
							"Welcome to my server!",
							1,
							256,
							false,
							false
						),
						getActualSet: async ({ guild }) => {
							let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);
							if (data) return data.Msg;
							else return null;
						},
						setNew: async ({ guild, newData }) => {
							let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);

							if (!newData) newData = null;

							if (!data) {
								data = new WelcomeDB({
									Guild: guild.id,
									Channel: null,
									Msg: newData,
									Content: false,
									Embed: false,
								});

								await data.save();
							} else {
								data.Msg = newData;
								await data.save();
							}

							return;
						},
					},
					{
						optionId: "welcembed",
						optionName: "",
						optionDescription: "Send Embed",
						optionType: DBD.formTypes.switch(false),
						themeOptions: {
							minimalbutton: {
								last: true,
							},
						},
						getActualSet: async ({ guild }) => {
							let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);
							if (data) return data.Embed;
							else return false;
						},
						setNew: async ({ guild, newData }) => {
							let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);

							if (!newData) newData = false;

							if (!data) {
								data = new WelcomeDB({
									Guild: guild.id,
									Channel: null,
									Msg: null,
									Content: false,
									Embed: newData,
								});

								await data.save();
							} else {
								data.Embed = newData;
								await data.save();
							}

							return;
						},
					},
				],
			}, */
            // Music Settings
            {
                categoryId: "music",
				categoryName: "Music",
				categoryDescription: "Setup the Music Component",
				categoryImageURL:
					"https://cdn.assistantscenter.com/lgsgky05",
				categoryOptionsList: [
                    {
                        optionId: "dj",
                        optionName: "DJ",
                        optionDescription: "Set up for Djs.",
                        optionType: SoftUI.formTypes.multiRow([
                            {
                                optionId: "enabledj",
                                optionName: "Enable DJ",
                                optionDescription: "Should bot only allow DJs to control the music.",
                                optionType: DBD.formTypes.switch(false),
                                getActualSet: async ({ guild }) => {
                                    let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
                                        (err) => {}
                                    );
                                    if (data) return data.dj.enabled;
                                    else return false;
                                },
                                setNew: async ({ guild, newData }) => {
                                    let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
                                        (err) => {}
                                    );
        
                                    if (!newData) newData = false;
        
                                    if (!data) {
                                        data = new MusicSettingsDB({
                                            Guild: guild.id,
                                            dj: {enabled: false},
                                        });
        
                                        await data.save();
                                    } else {
                                        data.dj.enabled = newData;
                                        await data.save();
                                    }
        
                                    return;
                                },
                            },
                            {
                                optionId: "rolesdj",
                                optionName: "DJ Roles",
                                optionDescription: "Choose role(s) for DJs.",
                                optionType: DBD.formTypes.rolesMultiSelect(false, false, true, false),
                                getActualSet: async ({ guild }) => {
                                    let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
                                        (err) => {}
                                    );
                                    if (data) return data.dj.roleNames;
                                    else return false;
                                },
                                setNew: async ({ guild, newData }) => {
                                    let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
                                        (err) => {}
                                    );
        
                                    if (!newData) newData = false;
        
                                    if (!data) {
                                        data = new MusicSettingsDB({
                                            Guild: guild.id,
                                            dj: {roleNames: []},
                                        });
        
                                        await data.save();
                                    } else {
                                        data.dj.roleNames = newData;
                                        await data.save();
                                    }
        
                                    return;
                                },
                            },
                        ])
                    },
                    {
						optionId: "defvol",
						optionName: "Default Volume",
						optionDescription: "Set the default volume when bot joins voice chat.",
						optionType: SoftUI.formTypes.numberPicker(0, 100, false),
						getActualSet: async ({ guild }) => {
							let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);
							if (data) return data.defaultvolume;
							else return null;
						},
						setNew: async ({ guild, newData }) => {
							let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);

							if (!newData) newData = null;

							if (!data) {
								data = new MusicSettingsDB({
									Guild: guild.id,
                                    defaultvolume : newData
								});

								await data.save();
							} else {
								data.defaultvolume = newData;
								await data.save();
							}

							return;
						},
					},
                    {
						optionId: "maxvol",
						optionName: "Max Allowed Volume",
						optionDescription: "Set the max allowed volume for bot to play.",
						optionType: SoftUI.formTypes.numberPicker(0, 150, false),
						getActualSet: async ({ guild }) => {
							let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);
							if (data) return data.maxVol;
							else return null;
						},
						setNew: async ({ guild, newData }) => {
							let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);

							if (!newData) newData = null;

							if (!data) {
								data = new MusicSettingsDB({
									Guild: guild.id,
                                    maxVol : newData
								});

								await data.save();
							} else {
								data.maxVol = newData;
								await data.save();
							}

							return;
						},
					},
                    {
						optionId: "leaveonend",
						optionName: "Leave on End",
						optionDescription: "Should bot leave when the queue is finished.",
						optionType: DBD.formTypes.switch(false),
						getActualSet: async ({ guild }) => {
							let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);
							if (data) return data.leaveOnEnd;
							else return false;
						},
						setNew: async ({ guild, newData }) => {
							let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);

							if (!newData) newData = false;

							if (!data) {
								data = new MusicSettingsDB({
									Guild: guild.id,
                                    leaveOnEnd: true,
								});

								await data.save();
							} else {
								data.leaveOnEnd = newData;
								await data.save();
							}

							return;
						},
					},
                    {
						optionId: "leaveonempty",
						optionName: "Leave on Empty",
						optionDescription: "Should bot leave when the voice channel is empty.",
						optionType: DBD.formTypes.switch(false),
						getActualSet: async ({ guild }) => {
							let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);
							if (data) return data.leaveOnEmpty;
							else return false;
						},
						setNew: async ({ guild, newData }) => {
							let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);

							if (!newData) newData = false;

							if (!data) {
								data = new MusicSettingsDB({
									Guild: guild.id,
                                    leaveOnEmpty: true,
								});

								await data.save();
							} else {
								data.leaveOnEmpty = newData;
								await data.save();
							}

							return;
						},
					},
                    {
						optionId: "loopmsg",
						optionName: "Loop Message",
						optionDescription: "Should bot re-send message when song is looping.",
						optionType: DBD.formTypes.switch(false),
						getActualSet: async ({ guild }) => {
							let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);
							if (data) return data.loopMessage;
							else return false;
						},
						setNew: async ({ guild, newData }) => {
							let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);

							if (!newData) newData = false;

							if (!data) {
								data = new MusicSettingsDB({
									Guild: guild.id,
                                    loopMessage: false,
								});

								await data.save();
							} else {
								data.loopMessage = newData;
								await data.save();
							}

							return;
						},
					},
                    {
						optionId: "spotbrig",
						optionName: "Spotify Bridge",
						optionDescription: "Should bot be able to play songs from Spotify.",
						optionType: DBD.formTypes.switch(false),
						getActualSet: async ({ guild }) => {
							let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);
							if (data) return data.spotifyBridge;
							else return false;
						},
						setNew: async ({ guild, newData }) => {
							let data = await MusicSettingsDB.findOne({ Guild: guild.id }).catch(
								(err) => {}
							);

							if (!newData) newData = false;

							if (!data) {
								data = new MusicSettingsDB({
									Guild: guild.id,
                                    spotifyBridge: false,
								});

								await data.save();
							} else {
								data.spotifyBridge = newData;
								await data.save();
							}

							return;
						},
					},
                ]
            },
		],
	});
	Dashboard.init();
})();

function CommandPush(filteredArray, CategoryArray) {
	filteredArray.forEach((obj) => {
		let cmdObject = {
			commandName: obj.name,
			commandUsage: obj.usage,
			commandDescription: obj.description,
			commandAlias: "/",
		};

		CategoryArray.push(cmdObject);
	});
}
