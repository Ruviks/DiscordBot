const config =  require('config');

const discordConfig = config.get('discord')


console.log(process.env.DISCORD_BOT_TOKEN || discordConfig.api_key)