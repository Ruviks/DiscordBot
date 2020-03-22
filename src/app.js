const client = require('./client');
const typeorm = require('typeorm');
const EntitySchema = typeorm.EntitySchema;

class App {
    constructor() {
        this.client = client;
    }

    async start(token) {
        await typeorm.createConnection({
            type: "sqlite",
            database: "./db/settings.sqlite3",
            entities: [
                new EntitySchema(require('./entity/BadWords'))
            ]
        }).then(connection => connection.synchronize())
        
        this.client.login(token);
    }
}

module.exports = new App();