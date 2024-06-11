const { ApplicationCommandType, ApplicationCommandOptionType, Guild, BaseGuildTextChannel } = require('discord.js');

module.exports = {
	name: "message",
	description: "Talk to others as me!",
    category: "Core",
	showHelp: false,
	options: [
		{
			name: "text",
			description: "what do you want bot to say",
			type: ApplicationCommandOptionType.String,
			required: true
		}
	],
	async execute({ client, inter }) {

        const text = inter.options.getString('text')
        inter.editReply({ content:`${text}`})
	},
};
