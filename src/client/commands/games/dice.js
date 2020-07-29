const { Command } = require('discord.js-commando');
const { green, red } = require('../../../utils/colors')
const colorEmbed = require('../../../utils/embeds')
const typeorm = require('typeorm');
module.exports = class Dice extends Command {
    constructor(client) {
        super(client, {
            name: 'dice',
            group: 'games',
            memberName: 'dice',
            description: 'Throws a dice.',
            args: [{
                key: "guess", prompt: "Your guess from 1 to 6?", type: "integer",
                validate: guess => guess >= 1 && guess <= 6
            },
            {
                key: "amount", prompt: "Your bet", type: "integer",
                validate: guess => guess >= 500
            }
            ]


        })
    }
    async run(message, { guess, amount }) {
        const usersdb = typeorm.getConnection().getRepository("users");
        const user = await usersdb.findOne(message.author.id);
        if (guess == Math.floor(Math.random() * 7)) {
            await usersdb.save({ user_id: user.user_id, balance: user.balance + amount })
            await message.channel.send(colorEmbed(green, ` ${message.member} right guess!`))
        }
        else {
            await usersdb.save({ user_id: user.user_id, balance: user.balance - amount })
            await message.channel.send(colorEmbed(red, ` ${message.member} wrong guess!`))
        }
        return null;
    }
}