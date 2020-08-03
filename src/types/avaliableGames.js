const fs = require('fs');
const avaliableGames = JSON.parse(fs.readFileSync("C:/Users/Ruvik/Desktop/DiscordBot/src/types/gamedata.json"))
module.exports = avaliableGames