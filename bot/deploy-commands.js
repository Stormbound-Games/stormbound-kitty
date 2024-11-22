import 'dotenv/config'
import fs from 'node:fs'
import { Routes } from 'discord.js'
import { REST } from '@discordjs/rest'

const CLIENT_ID = process.env.DISCORD_APP_ID
const DISCORD_TOKEN = process.env.DISCORD_TOKEN
const SERVER_ID = process.env.DISCORD_SERVER_ID || '714858253531742208'

const commands = (
  await Promise.all(
    fs
      .readdirSync('./bot/commands')
      .map(name => import(`./commands/${name}/index.js`)),
  )
)
  .map(module => module.default)
  .map(command => command.data.toJSON())

;(async () => {
  try {
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)
    const environment = process.env.NODE_ENV
    const global = Routes.applicationCommands(CLIENT_ID)
    const local = Routes.applicationGuildCommands(CLIENT_ID, SERVER_ID)

    console.log(
      `Started refreshing ${commands.length} application (/) commands in ${environment}.`,
    )

    if (environment === 'production') {
      const data = await rest.put(global, { body: commands })
      await rest.put(local, { body: [] })

      console.log(
        `Successfully reloaded ${data.length} application (/) commands in ${environment}.`,
      )
    } else {
      const data = await rest.put(local, { body: commands })

      console.log(
        `Successfully reloaded ${data.length} application (/) commands in ${environment}.`,
      )
    }
  } catch (error) {
    console.error(error)
  }
})()
