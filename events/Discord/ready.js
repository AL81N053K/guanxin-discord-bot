const { Translate } = require("../../process_tools");
const ms = require("ms")
const mongoose = require("mongoose")
const mongodbURL = process.env.MONGO_URI

module.exports = async (client) => {
	console.log(
		await Translate(`Logged to the client <${client.user.username}>.`)
	);
	console.log(await Translate("Let's play some music !"));

	mongoose.set("strictQuery", true);

	const { user, ws } = client;

	//client.player.init(user.id);

	/* setInterval(() => {
		const ping = ws.ping;

		user.setActivity({
			name: ` ${client.guilds.cache.size} servers`,
			type: 5,
		});
	}, ms("5s")); */

	if (!mongodbURL) return;

	mongoose
		.connect(mongodbURL)
		.then(() => {
			console.log("Connected to Database!");
		})
		.catch((err) => console.log(err));

	client.user.setActivity(client.config.app.playing);
};
