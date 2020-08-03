const commando = require("discord.js-commando");
const avaliableGames = require('./avaliableGames');

class gameArgumentType extends commando.ArgumentType {

    constructor(client) {
        super(client, 'game');
    }

    validate(val) {
        const avaliableGames = JSON.parse(fs.readFileSync("./games.json"))
        return val.toLowerCase() === 'dank';
    }

    parse(val) {
        return val;
    }
}

module.exports = gameArgumentType;