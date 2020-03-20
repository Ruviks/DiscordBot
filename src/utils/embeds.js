const Discord = require('discord.js');
module.exports = function timerEmbed(color, description) {
    return new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(description)
}