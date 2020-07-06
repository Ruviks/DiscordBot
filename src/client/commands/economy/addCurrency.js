const { Command } = require('discord.js-commando');
const typeorm = require('typeorm');
module.exports = class addCurrency extends Command {
    constructor(client) {
        super(client, {
            name: 'add',
            group: 'economy',
            memberName: 'add',
            description: 'adds money to the member.',
            args: [{
                key: 'member',
                prompt: ' Whom shall i add the money ?',
                type: 'member',
            }, {
                key: 'amount',
                prompt: 'amount of money to add',
                type: 'integer'

            }],
            ownerOnly: true,
        })
    }
    async run(message, { member, amount }) {
        const usersdb = typeorm.getConnection().getRepository("users");
        const user = await usersdb.findOne(member.id);
        if (user) await usersdb.save({ user_id: user.user_id, balance: user.balance + amount })
        else await usersdb.save({ user_id: member.id, balance: amount })
    }
}