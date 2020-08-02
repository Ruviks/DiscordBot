const typeorm = require('typeorm');
module.exports = async function Game(msg, interval, count, bet) {
    let users = [];
    await msg.react("✅");
    const usersdb = typeorm.getConnection().getRepository("users");
    const filter = (reaction, user) => reaction.emoji.name === '✅' && !user.bot
    const collector = msg.createReactionCollector(filter, { time: interval * 1000, dispose: true });
    collector.on('collect', async (r, user) => {
        const db_user = await usersdb.findOne(user.id)
        if (!user.bot && db_user ? db_user.balance > bet : false) {
            users.push(user.id);
            msg.say(`${user} Joined `);
        }
        else {
            r.users.remove(user.id);
            msg.say("You can not join,because your balance is low ")
        }

    });
    collector.on('remove', async (r, user) => {
        await msg.say(`${user} left `);
        if (users.includes(user.id)) {
            users.remove(user.id);
        }
    })



    collector.on('end', async () => {
        if (users.length <= 1) return await msg.say(`No one joined`);
        const random = Math.floor(Math.random() * users.length);
        winnerid = users[random];
        const winner = await usersdb.findOne(winnerid);
        await usersdb.update({ user_id: winnerid }, { balance: winner.balance + users.length * bet });
        for (x of users) {
            usersdb.findOne(x).then(user => {
                usersdb.update({ user_id: user.user_id }, { balance: user.balance - bet }).catch(console.error)
            }
            ).catch(console.error);
        }
        const winnerobj = await msg.guild.members.fetch(winnerid);
        await msg.say(`The winner is  ${winnerobj.user.username}`)
    })
}