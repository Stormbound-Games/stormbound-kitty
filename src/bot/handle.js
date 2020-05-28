import card from './commands/card'
import random from './commands/random'
import abbr from './commands/abbr'
import deck from './commands/deck'
import story from './commands/story'
import help from './commands/help'

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

  switch (command) {
    case '!card':
      return reply(message, card(message.content))
    case '!random':
      return reply(message, random(message.content))
    case '!abbr':
      return reply(message, abbr(message.content))
    case '!deck':
      return reply(message, deck(message.content))
    case '!story':
      return reply(message, story(message.content))
    case '!help':
      return reply(message, help(message.content))
    default:
      return
  }
}
