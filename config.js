module.exports = {
	app: {
		token: `${process.env.DISCORD_TOKEN}`,
		playing: "by the Community ❤️",
		global: true,
		guild: "xxx",
		extraMessages: false,
		loopMessage: false,
		lang: "en",
		enableEmojis: true,
	},

	emojis: {
		back: "⏪",
		skip: "⏩",
		ResumePause: "⏯️",
		savetrack: "💾",
		volumeUp: "🔊",
		volumeDown: "🔉",
		loop: "🔁",
	},

	opt: {
		DJ: {
			enabled: false,
			roleName: "",
			commands: [],
		},
		Translate_Timeout: 10000,
		maxVol: 100,
		spotifyBridge: true,
		volume: 75,
		leaveOnEmpty: true,
		leaveOnEmptyCooldown: 30000,
		leaveOnEnd: true,
		leaveOnEndCooldown: 30000,
		discordPlayer: {
			ytdlOptions: {
				quality: "highestaudio",
				highWaterMark: 1 << 25,
			},
		},
	},

	discord: {
		token: `${process.env.DISCORD_TOKEN}`,
		client: {
			id: "754382634649518092",
			secret: `${process.env.CLIENT_SECRET}`,
		},
	},
	dbd: {
		port: 80,
		domain: "https://al81n053k.github.io/guanxin-discord-bot/",
		redirectUri: "/discord/callback",
		license: process.env.DASHBOARD_LICENCE,
		ownerIDs: ["250264586425466881"],
	},
};
