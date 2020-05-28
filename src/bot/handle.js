import abbr from './commands/abbr'
import deckadvice from './commands/deckadvice'
import cardinfo from './commands/cardinfo'
import decks from './commands/decks'
import help from './commands/help'
import randomcard from './commands/randomcard'
import randomdeck from './commands/randomdeck'
import story from './commands/story'
import suggestdeck from './commands/suggestdeck'

const send = client => (message, content) => {
  if (!content) return

  // If the message is sent anywhere in the Stormbound server, reply in
  // `#kitty-bot` to avoid spamming channels with bot answers.
  if (message.channel.guild.id === '293674725069029377') {
    if (process.env.NODE_ENV !== 'development') {
      client.channels.cache
        .get('714880856954503239')
        .send(message.author.toString() + ' ' + content)
    }
  } else {
    message.reply(content)
  }
}

export default client => message => {
  const [command] = message.content.split(' ')
  const reply = send(client)
  const search = message.content.replace(command, '').trim()

  switch (command) {
    case '!abbr':
      return reply(message, abbr(search))
    case '!cardinfo':
      return reply(message, cardinfo(search))
    case '!decks':
      return reply(message, decks(search))
    case '!deckadvice':
      return reply(message, deckadvice(search))
    case '!help':
      return reply(message, help(search))
    case '!randomcard':
      return reply(message, randomcard(search))
    case '!randomdeck':
      return reply(message, randomdeck(search))
    case '!story':
      return reply(message, story(search))
    case '!suggestdeck':
      return reply(message, suggestdeck(search))
    default:
      return
  }
}
