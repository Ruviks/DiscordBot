const config = require('config');

const discordConfig = config.get('discord')
const Discord = require('discord.js');
let token = process.env.DISCORD_BOT_TOKEN || discordConfig.api_key
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

client.login(token);
