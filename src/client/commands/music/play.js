const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');
const { voice } = require('../..');
module.exports = class PlayCommand extends Command {
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

        message.guild.musicData.queue.push(
            {
                url: args.link,
                voiceChannel
            }
        );
        if (
            message.guild.musicData.isPlaying == false ||
            typeof message.guild.musicData.isPlaying == 'undefined'
        ) {
            message.guild.musicData.isPlaying = true;
            return PlayCommand.playSong(message.guild.musicData.queue, message);
        } else if (message.guild.musicData.isPlaying == true) {
            return message.say(`Song added to queue`);

        }
    }

    static playSong(queue, message) {
        const classThis = this; // use classThis instead of 'this' because of lexical scope below
        queue[0].voiceChannel
            .join()
            .then(function (connection) {
                const dispatcher = connection
                    .play(
                        ytdl(queue[0].url, {
                            filter: 'audioonly',
                            quality: 'highestaudio',
                            highWaterMark: 1 << 25
                        })
                    )
                    .on('start', function () {
                        message.guild.musicData.songDispatcher = dispatcher;
                        dispatcher.setVolume(message.guild.musicData.volume);
                        message.guild.musicData.nowPlaying = queue[0];
                        return queue.shift();
                    })
                    .on('finish', function () {
                        if (queue.length >= 1) {
                            return classThis.playSong(queue, message);
                        } else {
                            message.guild.musicData.isPlaying = false;
                            message.guild.musicData.nowPlaying = null;
                            message.guild.musicData.songDispatcher = null;
                            if (message.guild.me.voice.channel) {
                                return message.guild.me.voice.channel.leave();
                            }
                        }
                    })
                    .on('error', function (e) {
                        message.say('Cannot play song');
                        console.error(e);
                        message.guild.musicData.queue.length = 0;
                        message.guild.musicData.isPlaying = false;
                        message.guild.musicData.nowPlaying = null;
                        message.guild.musicData.songDispatcher = null;
                        return message.guild.me.voice.channel.leave();
                    });
            })
            .catch(function (e) {
                console.error(e);
                return message.guild.me.voice.channel.leave();
            });
    }
} 