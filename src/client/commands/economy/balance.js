const { Command } = require('discord.js-commando');
const typeorm = require('typeorm');
module.exports = class balance extends Command {
    constructor(client) {
        super(client, {
            name: "balance",
            group: 'economy',
            memberName: 'balance',
            description: 'Check current balance.',
        })

    }
    async run(msg) {
        const usersdb = typeorm.getConnection().getRepository("users");
        const user = await usersdb.findOne(msg.author.id);
        if (user) msg.say(user.balance)
        else {
            await usersdb.save({ user_id: msg.author.id, balance: 0 })
            msg.say(0);
        }

    }
}