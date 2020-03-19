const { Command } = require('discord.js-commando');
const SetTimer = require('../../../ServiceProvider/timerService.js');
module.exports = class TimerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'timer',
            group: 'misc',
            memberName: 'timer',
            description: 'Set up a countdown timer.',
            args: [
                {
                    key: 'init',
                    prompt: 'What initial time would you like to set?',
                    type: 'string',
                },
                {
                    key: 'interval',
                    prompt: 'What interval  would you like to set?',
                    type: 'string',
                },
            ],
        });
    }
    run(message, args) {
        SetTimer(message, args);
        return message.say(`Timer set for ${args.init} seconds`);

    }
} 