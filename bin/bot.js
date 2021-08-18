require('module-alias').addAlias('~', __dirname + '/../src')
require('dotenv').config()

const fs = require('fs')
const Discord = require('discord.js')
const handleMessage = require('~/bot/handle').default

const client = new Discord.Client()
client.commands = new Discord.Collection()

fs.readdirSync('./src/bot/commands').forEach(name => {
  const { default: command } = require('~/bot/commands/' + name)
  client.commands.set(command.command, command)
})

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`))
client.on('message', handleMessage(client))
client.login(process.env.DISCORD_TOKEN)
