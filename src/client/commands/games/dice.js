const { Command } = require('discord.js-commando');
const { green, red } = require('../../../utils/colors')
const timerEmbed = require('../../../utils/embeds')
module.exports = class Dice extends Command {
    constructor(client) {
        super(client, {
            name: 'dice',
            group: 'games',
            memberName: 'dice',
            description: 'Throws a dice.',
            args: [{ key: "guess", prompt: "Your guess from 1 to 6?", type: "integer", validate: guess => guess >= 1 && guess <= 6 }]


        })
    }
    async run(message, { guess }) {

        if (guess == Math.floor(Math.random() * 7))
            await message.channel.send(timerEmbed(green, ` ${message.member} right guess!`))
        else
            await message.channel.send(timerEmbed(red, ` ${message.member} wrong guess!`))
        return null;
    }
}