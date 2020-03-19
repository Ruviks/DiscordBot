const client = require('./client');

class App {
    constructor() {
        this.client = client;
    }

    start(token) {
        this.client.login(token);
    }
}

module.exports = App;