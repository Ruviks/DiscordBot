const { Command } = require('discord.js-commando');
const timeParser = require('../../../utils/common.js');
module.exports = class TimerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reminder',
            group: 'misc',
            memberName: 'reminder',
            description: 'Sets up a reminder.',
            args: [{
                key: 'member',
                prompt: ' Whom shall i remind ?',
                type: 'member',
                default: 0,

            },
            {
                key: 'channel',
                prompt: ' In which channel should i remind you ?',
                type: 'channel',

            },
            {
                key: 'message',
                prompt: 'What message should i remind you with?',
                type: 'string',

            },
            {
                key: 'time',
                prompt: 'The delay in "1h 1m 1s" format?',
                type: 'string',

            },
            ]
        })

    }
    run(message, args) {
        let member = args.member;
        if (member == 0) { member = ` @everyone` }
        setTimeout(() => { return message.say(` ${member} ${args.message} `); }, timeParser(args.time) * 1000)


    }
}