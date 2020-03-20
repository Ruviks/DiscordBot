const { Command } = require('discord.js-commando');
module.exports = class channelPurge extends Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            group: 'misc',
            memberName: 'purge',
            description: 'Deletes messages  of the channel.',
            args: [
                {
                    key: 'number',
                    prompt: 'How many messages would you like to delete?',
                    type: 'integer',
                    default: 0
                },],
        });
    }
    run(message, { number }) {
        if (number == 0) {
            let channel = message.channel, parent = message.channel.parent, rawposition = message.channel.rawposition, guild = message.guild;

            channel.delete()
                .then((x) => {

                    guild.channels.create(x.name, { parent: parent, position: x.rawPosition })
                        .then(() => console.log(`Channel purged successfully`))
                })
                .catch(console.error)
                .catch(console.error);
            return null;
        }
        message.channel.bulkDelete(number).then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error);
        return message.say("Purge successful")
    }
}
