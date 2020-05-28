import 'dotenv/config'
import Discord from 'discord.js'
import handleMessage from '../src/bot/handle'

const client = new Discord.Client()

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`))
client.on('message', handleMessage(client))
client.login(process.env.DISCORD_TOKEN)
