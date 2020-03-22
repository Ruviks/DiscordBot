const { Command } = require('discord.js-commando');
const filter = require('../../../ServiceProvider/filterService.js');

module.exports = class TimerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'filter',
            group: 'misc',
            memberName: 'filter',
            description: 'Filter testing.',
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like to filter ?',
                    type: 'string',
                }
            ],
        });
    }
    run(message, args) {
        filter(message, args);
        return null;
    }
} 