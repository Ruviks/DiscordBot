const { options, users, user } = require("../client");
const typeorm = require('typeorm');
const random = require("../client/commands/games/random");
module.exports = async function Game(msg, interval, count, bet) {
    await msg.react("✅");
    const usersdb = typeorm.getConnection().getRepository("users");
    const filter = (reaction, user) => reaction.emoji.name === '✅' && usersdb.findOne(user.id).then(x => { return x ? x.balance >= bet : false })
    msg.awaitReactions(filter, { time: interval * 1000 })
        .then(async collection => {
            collection.first().users.fetch([limit = count]).then(async userCollection => {
                const users = userCollection.filter(x => !x.bot);
                if (!users.size) return await msg.say(`No one joined`);
                winnerid = users.randomKey();
                const winner = await usersdb.findOne(winnerid);
                await usersdb.update({ user_id: winnerid }, { balance: winner.balance + users.size * bet });
                for (x of users.keys()) {
                    usersdb.findOne(x).then(user => {
                        usersdb.update({ user_id: user.user_id }, { balance: user.balance - bet }).catch(console.error)
                    }
                    ).catch(console.error);
                }
                await msg.say(`The winner is  ${users.get(winnerid).username}`)
            })
        }).catch(console.error)
}