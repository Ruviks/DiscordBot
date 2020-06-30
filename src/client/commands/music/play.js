const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');
const { voice } = require('../..');
module.exports = class play extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Plays music from youtube',
            args: [
                {
                    key: 'link',
                    prompt: 'Youtube link to the music',
                    type: 'string',
                }
            ]
        });
    }
    async run(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.say('Join a channel and try again');
        const stream = ytdl(args.link, { filter: 'audioonly' });
        const connection = await voiceChannel.join();
        const dispatcher = connection.play(stream);
        message.guild.musicData.songDispatcher = dispatcher;

        return null;
    }
} 