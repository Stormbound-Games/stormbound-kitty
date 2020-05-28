import COMMANDS from './commands'

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

  if (COMMANDS.map(({ command }) => command).includes(command)) {
    const { default: handler } = require('./commands/' + command)

    return reply(message, handler(search))
  }
}
