const config = require('config');
const discordConfig = config.get('discord')
const path = require('path');
const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const client = new CommandoClient({
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
    .registerDefaultCommands({
        help: true, ping: true
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('with Commando');
});

const sqlite = require('sqlite');
client.setProvider(
    sqlite.open(path.join(__dirname, 'db/settings.sqlite3')).then(db => new SQLiteProvider(db))
).catch(console.error);

client.on('error', console.error);
client.login(token);