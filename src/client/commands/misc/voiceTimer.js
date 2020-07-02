const { Command } = require('discord.js-commando');
const { voice } = require('../..');
module.exports = class voiceTimerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'voicetimer',
            group: 'misc',
            memberName: 'voicetimer',
            description: 'Set up a voice countdown timer.',

        });
    }
    run(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.say('Join a channel and try again');
        voiceChannel.join().then(x => { x.play("assets/60.mp3").on('finish', () => { voiceChannel.leave(); }) })
        return null;
    }
} 