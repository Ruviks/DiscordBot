const { Command } = require('discord.js-commando');
const typeorm = require('typeorm');
const colors = require("../../../utils/colors");
const { MessageEmbed } = require("discord.js");
const Game = require('../../../ServiceProvider/randomgame');
module.exports = class random extends Command {
    constructor(client) {
        super(client, {
            name: "random",
            group: "games",
            memberName: "random",
            description: "random game with people",
            args: [{
                key: "players", prompt: "Enter the number of players", type: "integer", validate: x => x > 1
            }, {
                key: "time", prompt: "Lobby interval", type: "integer", validate: x => x >= 5 && x <= 15
            },
            {
                key: "bet", prompt: "Lobby bet", type: "integer", validate: x => x >= 500
            }
            ]
        })
    }
    async run(msg, args) {

        const embed = new MessageEmbed().setColor(colors.green)
            .setTitle('Random game')
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setDescription(`This is a random game session for ${args.players} players and with ${args.bet} bet value`)
            .addField('How to play', 'Join by reacting', true)
            .setTimestamp()

        return msg.channel.send(embed).then(async x => { await Game(x, args.time, args.players, args.bet) });
    }
}