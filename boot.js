const config = require('config');
const discordConfig = config.get('discord')
const Discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const client = new CommandoClient({
    commandPrefix: '?',
    owner: process.env.OWNER_ID || null,
    invite: 'https://discord.gg/FkxwyzS',
});
const token = process.env.DISCORD_BOT_TOKEN || discordConfig.api_key;

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['misc', 'miscellaneous'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({ help: true, ping: true })
    .registerCommandsIn(path.join(__dirname, 'commands'));
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('with Commando');
});
client.on('error', console.error);
client.login(token);
