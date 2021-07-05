const fs = require('fs');
const avaliableGames = JSON.parse(fs.readFileSync("src/types/gamedata.json"))
module.exports = avaliableGames