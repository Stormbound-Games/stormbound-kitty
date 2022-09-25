import 'dotenv/config'
import fs from 'node:fs'
import { Routes } from 'discord.js'
import { REST } from '@discordjs/rest'

const CLIENT_ID = process.env.DISCORD_APP_ID
const DISCORD_TOKEN = process.env.DISCORD_TOKEN

const commands = (
  await Promise.all(
    fs
      .readdirSync('./bot/commands')
      .map(name => import(`./commands/${name}/index.js`))
  )
)
  .map(module => module.default)
  .map(command => command.data.toJSON())

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)

;(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )

    const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    })

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    )
  } catch (error) {
    console.error(error)
  }
})()
