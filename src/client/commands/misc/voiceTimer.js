const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');
module.exports = class play extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'misc',
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
        const stream = ytdl(args.link, { filter: 'audioonly' });
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(stream);
        return null;
    }
} 