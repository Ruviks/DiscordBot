const { Command } = require('discord.js-commando')
const avaliableGames = require('../../types/avaliableGames');
module.exports = class FindGameServers extends Command {
    constructor(client) {
        super(client, {
            name: 'list',
            group: 'gametracker',
            memberName: 'list',
            description: 'list all the avaliable games!.',

        })
    }
    async run(msg, args) {
        console.log(avaliableGames)

    }
}