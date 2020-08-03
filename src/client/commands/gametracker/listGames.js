const { Command } = require('discord.js-commando');
const avaliableGames = require('../../../types/avaliableGames');
const searchservers = require('../../../gtAPI/searchservers');
const { MessageEmbed } = require("discord.js");
module.exports = class FindGameServers extends Command {
    constructor(client) {
        super(client, {
            name: 'list',
            group: 'gametracker',
            memberName: 'list',
            description: 'list all the avaliable gamecodes!.',
            args: [{
                key: "page",
                prompt: "what page to display",
                default: 0,
                type: "integer",

            }]
        })
    }
    async run(msg, args) {

        let result = JSON.stringify(avaliableGames).split(",");
        if (args.page * 25 + 25 > result.size || args.page < 0) return;
        result = result.splice(args.page * 25, 25).join("\n ").replace(/"/g, '').replace('{', '').replace('}', '')
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Game List')
            .addFields(
                { name: ' Avaliable Games', value: result },
            )
            .setTimestamp()
        await msg.say(exampleEmbed);
    }
}