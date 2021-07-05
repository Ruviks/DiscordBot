const commando = require("discord.js-commando");
const fs = require('fs');
const avaliableGames = JSON.parse(fs.readFileSync("src/types/gamedata.json"))

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