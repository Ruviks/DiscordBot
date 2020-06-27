const path = require('path');
const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const filter = require('../ServiceProvider/filterService');
const sqlite = require('sqlite');

const client = new CommandoClient({
    owner: process.env.OWNER_ID || null,
    invite: 'https://discord.gg/FkxwyzS',
});
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['misc', 'miscellaneous'], ['games', 'games']
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

client.on('message', msg => {
    if (msg.author.id === client.user.id) {
        return
    }

    if (msg.content === 'uwu') { //This is the original message that triggered the message event.
        msg.reply("(。U⁄ ⁄ω⁄ ⁄ U。)") //Send a lenny face in response to the user saying "lenny"
        return;
    }

    filter(msg, { text: msg.content })

})

client.on('error', console.error);

module.exports = client;