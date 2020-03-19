const path = require('path');
const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const sqlite = require('sqlite');

const client = new CommandoClient({
    owner: process.env.OWNER_ID || null,
    invite: 'https://discord.gg/FkxwyzS',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['misc', 'miscellaneous'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, './commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('with Commando');
});

client.setProvider(
    sqlite.open(path.join(__dirname, '../../db/settings.sqlite3')).then(db => new SQLiteProvider(db))
).catch(console.error);

client.on('error', console.error);

module.exports = client;