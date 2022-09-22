import 'dotenv/config'
import fs from 'fs'
import Discord, { GatewayIntentBits } from 'discord.js'
import { handleMessage, handleAutocomplete } from './handle.js'
import getAbbreviations from '#api/misc/getAbbreviations'
import getBooks from '#api/books/getBooks'
import getBrawls from '#api/brawls/getBrawls'
import getCards from '#api/cards/getCards'

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.commands = new Discord.Collection()
fs.readdirSync('./bot/commands').forEach(async name => {
  const { default: command } = await import(`./commands/${name}/index.js`)
  if (command.data) client.commands.set(command.data.name, command)
})

// When enabled, this causes all ephemeral messages no longer to be ephemeral.
client.DEBUG_MODE = true

Promise.all([
  getAbbreviations({ casing: 'LOWERCASE' }),
  getBooks(),
  getBrawls(),
  getCards(),
]).then(([abbreviations, books, brawls, cards]) => {
  // Store some collections on the client, particularly the ones that are used
  // within autocompletion so they don’t get queried on every keystroke — this
  // could be problematic in terms of usage of the Sanity API.
  client.abbreviations = new Discord.Collection(Object.entries(abbreviations))
  client.books = new Discord.Collection(books.map(book => [book.id, book]))
  client.brawls = new Discord.Collection(brawls.map(brawl => [brawl.id, brawl]))
  client.cards = new Discord.Collection(cards.map(card => [card.id, card]))

  client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`))
  client.on('interactionCreate', handleMessage(client))
  client.on('interactionCreate', handleAutocomplete(client))
  client.login(process.env.DISCORD_TOKEN)
})
