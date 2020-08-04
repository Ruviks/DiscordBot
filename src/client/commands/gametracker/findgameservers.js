const { Command } = require('discord.js-commando');
const searchforServer = require('../../../gtAPI/searchservers');
const getServerInfo = require('../../../gtAPI/serverinfo');
const { MessageEmbed } = require("discord.js");
module.exports = class FindGameServers extends Command {
    constructor(client) {
        super(client, {
            name: 'find',
            group: 'gametracker',
            memberName: 'find',
            description: 'Find game server specified by the user and return top servers.',
            args: [{
                key: "name", prompt: "What is the game you are looking form?", type: "name",
            }, {
                key: "number", prompt: "How many servers shall i display?", type: "integer",
                validate: number => number >= 5 && number <= 10,
                default: 5
            }
            ]
        })
    }
    async run(msg, args) {
        await msg.react("✔️")
        const response = await searchforServer(args.name);
        //console.log(response)

        let x = response.data.splice(0, args.number);
        // console.log(x)
        let value = ""
        for (const server of x) {

            // let result = await getServerInfo(server['IP:Port']);

            value += "IP:" + `**${server['IP:Port']}**` + "\xa0\xa0\xa0\xa0\xa0\xa0" + "Players:" + `**${server['Players▲']}**` + "\xa0\xa0\xa0\xa0\xa0\xa0" + "Map:" + `**${server['Server Map']}**` //+ "\xa0\xa0\xa0\xa0\xa0\xa0" + "Status: " + `**${result.server_summary.Status}**` + "\n"
        }
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Server List')
            .addFields(
                { name: ' Avaliable Servers', value: value },
            )
            .setTimestamp()
        await msg.say(exampleEmbed);
    }

}