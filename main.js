const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require('discord-player');
const ms = require("ms")
require('dotenv').config();

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
		GatewayIntentBits.DirectMessages,
    ],
    allowedMentions: { parse: ["everyone", "roles", "users"] },
    rest: { timeout: ms("1m") }
});

client.config = require('./config');

const player = new Player(client, client.config.opt.discordPlayer);
player.extractors.loadDefault();

console.clear()
require('./loader');

client.login(process.env.DISCORD_TOKEN)
.catch(async (e) => {
    if(e.message === 'An invalid token was provided.'){
    require('./process_tools')
    .throwConfigError('app', 'token', '\n\t   ❌ Invalid Token Provided! ❌ \n\tchange the token in the config file\n')}

    else{
        console.error('❌ An error occurred while trying to login to the bot! ❌ \n', e)
    }
});