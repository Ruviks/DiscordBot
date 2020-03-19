const config = require('config');
const App = require('./src/app')

const discordConfig = config.get('discord')
const token = process.env.DISCORD_BOT_TOKEN || discordConfig.api_key;

const app = new App();

app.start(token);
