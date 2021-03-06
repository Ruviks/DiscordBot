const { Command } = require('discord.js-commando');
module.exports = class play extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            description: 'Pause the current music',

        });
    }
    async run(message) {
        var voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Join a channel and try again');

        if (
            typeof message.guild.musicData.songDispatcher == 'undefined' ||
            message.guild.musicData.songDispatcher == null
        ) {
            return message.say('There is no song playing right now!');
        }

        message.say('Song paused :pause_button:');

        message.guild.musicData.songDispatcher.pause();
    }
}

