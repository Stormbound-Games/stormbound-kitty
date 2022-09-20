import 'dotenv/config'
import fs from 'fs'
import Discord from 'discord.js'
import handleMessage from './handle.js'

const client = new Discord.Client()
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

fs.readdirSync('./bot/commands').forEach(async name => {
  const { default: command } = await import(`./commands/${name}/index.js`)
  const aliases = command.aliases || []
  client.commands.set(command.command, command)
  aliases.forEach(alias => client.aliases.set(alias, command))
})

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`))
client.on('message', handleMessage(client))
client.login(process.env.DISCORD_TOKEN)
