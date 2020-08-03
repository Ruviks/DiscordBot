const { Command } = require('discord.js-commando');
const searchforServer = require('../../../gtAPI/searchservers');
module.exports = class FindGameServers extends Command {
    constructor(client) {
        super(client, {
            name: 'find',
            group: 'gametracker',
            memberName: 'find',
            description: 'Find game server specified by the user.',
            args: [{
                key: "name", prompt: "What is the game you are looking form?", type: "name",
                default: 5
            }, {
                key: "number", prompt: "How many servers shall i display?", type: "integer",
                validate: number => number >= 5 && number <= 25,
                default: 5
            }
            ]
        })
    }
    async run(msg, args) {
        const response = await searchforServer(args.name);
        response = JSON.parse(response)

        console.log(result)

    }

}