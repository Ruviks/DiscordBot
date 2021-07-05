    const config = require('config');
    const App = require('./src/app')
    
    if (Object.keys(config) != 0 ){
        const discordConfig = config.get('discord')
    }

    const token = process.env.DISCORD_BOT_TOKEN || discordConfig.api_key;

    App.start(token);
