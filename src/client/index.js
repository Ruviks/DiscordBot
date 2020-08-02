const path = require('path');
const { Structures } = require('discord.js');
const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const filter = require('../ServiceProvider/filterService');
const sqlite = require('sqlite');

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


Structures.extend('Guild', function (Guild) {
    class MusicGuild extends Guild {
        constructor(client, data) {
            super(client, data);
            this.musicData = {
                queue: [],
                isPlaying: false,
                nowPlaying: null,
                songDispatcher: null,
                volume: 1
            };
        }
    }
    return MusicGuild;
});


const client = new CommandoClient({
    owner: process.env.OWNER_ID || null,
    invite: 'https://discord.gg/FkxwyzS',
});
//client.on("debug", (msg) => { console.log(msg) })
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['misc', 'miscellaneous'], ['games', 'Games'], ['music', 'Music'], ['economy', "Economy"]
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

});
client.on('voiceStateUpdate', async (___, newState) => {

    if (
        newState.member.user.bot &&
        !newState.channelID &&
        newState.guild.musicData.songDispatcher &&
        newState.member.user.id == client.user.id
    ) {
        newState.guild.musicData.queue.length = 0;
        newState.guild.musicData.songDispatcher.end();
    }
});

client.on('error', console.error);

module.exports = client;