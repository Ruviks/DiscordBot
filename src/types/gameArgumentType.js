const commando = require("discord.js-commando");
const avaliableGames = require('./avaliableGames');

class gameArgumentType extends commando.ArgumentType {

    constructor(client) {
        super(client, 'name');
    }

    validate(val) {
        const values = Object.values(avaliableGames);
        return values.includes(val) ? true : false
    }

    parse(val) {
        return val;
    }
}

module.exports = gameArgumentType;