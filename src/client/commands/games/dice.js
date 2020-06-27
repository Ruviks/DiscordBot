const { Command } = require('discord.js-commando');

module.exports - class Dice extends Command {
    constructor(client) {
        super(client, {
            name: 'dice',
            group: 'games',
            memberName: 'dice',
            description: 'Throws a dice.',
        })
    }
    run(message) {
        return message.say(Math.random() * 6)

    }
}