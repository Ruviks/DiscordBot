const { Command } = require('discord.js-commando');
const c = require('config');
module.exports = class channelPrune extends Command {
    constructor(client) {
        super(client, {
            name: 'prune',
            group: 'misc',
            memberName: 'prune',
            description: 'Deletes messages  of the channel.',
            guildOnly: true,
            args: [
                {
                    key: 'number',
                    prompt: 'How many messages would you like to delete?',
                    type: 'integer',
                    default: 0,
                    validate: x => x >= 0
                },],
        });
    }
    async run(message, { number }) {
        if (number == 0) {
            let x = await message.channel.clone();
            let c = await message.channel.delete();
            x.setPosition(c.rawPosition);


            return null;
        }
        message.channel.bulkDelete(number).then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error);
        return message.say("Purge successful")
    }
}
