const { Command } = require('discord.js-commando');
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
                prompt: 'The delay?',
                type: 'integer',

            },
            ]
        })

    }
    run(message, args) {
        let member = args.member;
        if (member == 0) { member = ` @everyone` }
        setTimeout(() => { return message.say(`${args.message} ${member}`); }, args.time * 1000)


    }
}