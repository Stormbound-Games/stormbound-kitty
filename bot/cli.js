require('module-alias').addAlias('~', __dirname + '/../src')
require('dotenv').config()

const fs = require('fs')
const Discord = require('discord.js')
const handleMessage = require('./handle').default

const client = new Discord.Client()
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

fs.readdirSync('./bot/commands').forEach(name => {
  const { default: command } = require('./commands/' + name)
  const aliases = command.aliases || []

  client.commands.set(command.command, command)
  aliases.forEach(alias => client.aliases.set(alias, command))
})

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`))
client.on('message', handleMessage(client))
client.login(process.env.DISCORD_TOKEN)
