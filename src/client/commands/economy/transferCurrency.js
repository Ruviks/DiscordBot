const { Command } = require('discord.js-commando');
const typeorm = require('typeorm');
module.exports = class transferCurrency extends Command {
    constructor(client) {
        super(client, {
            name: 'transfer',
            group: 'economy',
            memberName: 'transfer',
            description: 'Transfer Currency from your balance.',
            args: [{
                key: 'member',
                prompt: ' Whom shall i transfer the money ?',
                type: 'member',
            }, {
                key: 'amount',
                prompt: 'amount of money to transfer',
                type: 'integer',
                validate: x => x > 0
            }],

        })
    }
    async run(message, { member, amount }) {
        if (member.id = message.author.id) return
        const usersdb = typeorm.getConnection().getRepository("users");
        const user = await usersdb.findOne(message.author.id);
        if (!user) return message.say("You do not have enough money!");
        if (user.balance >= amount) {
            const reciever_user = await usersdb.findOne(member.id);
            if (reciever_user) {
                await usersdb.save({ user_id: reciever_user.user_id, balance: reciever_user.balance + amount });
                await usersdb.save({ user_id: user.user_id, balance: user.balance - amount });
                return message.say("Transaction successfull!");
            }
            else {
                //todo encapsulate the logic of adding a new user
                await usersdb.save({ user_id: member.id, balance: amount })
                return message.say("Transaction successfull!");
            }
        }
        else {

            message.say("You do not have enough balance!");
        }
    }
}