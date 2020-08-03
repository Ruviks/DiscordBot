const { Command } = require('discord.js-commando')

module.exports = class FindGameServers extends Command {
    constructor(client) {
        super(client, {
            name: 'find',
            group: 'gametracker',
            memberName: 'find',
            description: 'Find game server specified by the user.',
            args: [{
                key: "name", prompt: "How many servers shall i display?", type: "integer",
                validate: number => number >= 5 && number <= 25,
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


    }

}