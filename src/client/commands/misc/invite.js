const { Command } = require('discord.js-commando');
const link = "<https://discordapp.com/api/oauth2/authorize?client_id=689799500616957994&permissions=8&scope=bot>"
//todo make the link dynamic 
module.exports = class Invite extends Command {

    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'misc',
            memberName: 'invite',
            description: 'Get an invite link for the bot',
        })
    }

    run(message) {
        return message.say(link)
    }
}