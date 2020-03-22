const typeorm = require('typeorm')
const badWords = require('../dump/badwords.json');
const BadWords = require("../../src/entity/BadWords");
const EntitySchema = typeorm.EntitySchema;

typeorm.createConnection({
    type: "sqlite",
    database: "./db/settings.sqlite3",
    entities: [
        new EntitySchema(BadWords)
    ]
}).then(async connection => {
    await connection.synchronize();
    let badWordsRepository = connection.getRepository("BadWords");
    connection.createQueryBuilder().delete().from("BadWords").where("true").execute();
    await badWordsRepository.save(badWords);
    console.log('done');
}).catch(error => console.log(error));