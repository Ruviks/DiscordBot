const fs = require('fs');
const avaliableGames = JSON.parse(fs.readFileSync("./games.json"))
module.exports = avaliableGames