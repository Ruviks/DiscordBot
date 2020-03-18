const { Command } = require('discord.js-commando');
module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'meow',
            aliases: ['kitty-cat'],
            group: 'misc',
            memberName: 'meow',
            description: 'Replies with a meow, kitty cat.',
        });
    }
};