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
                    type: 'integer',
                },
                {
                    key: 'interval',
                    prompt: 'What interval  would you like to set between 2-10?',
                    type: 'integer',
                    validate: interval => interval >= 2 && interval <= 10
                },
            ],
        });
    }
    run(message, args) {
        SetTimer(message, args);
        return null;
    }
} 