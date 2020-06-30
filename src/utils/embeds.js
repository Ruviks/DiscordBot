const Discord = require('discord.js');
module.exports = function colorEmbed(color, description) {
    return new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(description)
}