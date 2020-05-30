import fs from 'fs'
import 'dotenv/config'
import Discord from 'discord.js'
import handleMessage from '../src/bot/handle'

const client = new Discord.Client()
client.commands = new Discord.Collection()

fs.readdirSync('./src/bot/commands').forEach(name => {
  const { default: command } = require('../src/bot/commands/' + name)
  client.commands.set(command.command, command)
})

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`))
client.on('message', handleMessage(client))
client.login(process.env.DISCORD_TOKEN)
