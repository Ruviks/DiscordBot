const { Command } = require('discord.js-commando');
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
    run(message, { number }) {
        if (number == 0) {
            let channel = message.channel,
                guild = message.guild;

            channel.delete()
                .then((x) => {

                    guild.channels.create(x.name, { topic: x.topic, parent: x.parent, position: x.rawPosition, nsfw: x.nsfw, rateLimitPerUser: x.rateLimitPerUser })
                        .then((x) => console.log(`Channel purged successfully at ${x.guild.name}`))
                }).catch(console.error)
                .catch(console.error);
            return null;
        }
        message.channel.bulkDelete(number).then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error);
        return message.say("Purge successful")
    }
}
