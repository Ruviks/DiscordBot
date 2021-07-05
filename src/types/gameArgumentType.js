const fs = require('fs');
const path = require("path");
const {ArgumentType} = require("discord.js-commando");
const avaliableGames = JSON.parse(fs.readFileSync(path.resolve("src/assets/gamedata.json")));
class GameArgumentType extends ArgumentType {
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
module.exports = GameArgumentType;