const DOMAIN = 'https://stormbound-kitty.com'

const send = client => (message, content) => {
  if (!content) return
  const user = message.mentions.users.first() || message.author

  // If the message is sent anywhere in the Stormbound server, reply in
  // `#kitty-bot` to avoid spamming channels with bot answers.
  if (message.channel.guild.id === '293674725069029377') {
    // Make sure a local bot does not have any impact on the Stormbound server.
    if (process.env.NODE_ENV === 'production') {
      client.channels.cache.get('714880856954503239').send(`${user} ${content}`)
    }
  } else if (process.env.NODE_ENV === 'development') {
    message.reply(content)
  }
}

export default client => message => {
  const isCommand = message.content.startsWith('!')
  // If the message comes from a bot (or itself), do not process any further.
  if (message.author.bot) return
  // If the message contains the top-level domain, react with joy.
  if (message.content.includes(DOMAIN) && !isCommand) return message.react('😻')
  // If the message does not contain any command, do not process any further.
  if (!isCommand) return

  const [commandName, ...rest] = message.content.slice(1).split(' ')
  const reply = send(client)
  const search = rest.join(' ').trim()

  if (client.commands.has(commandName)) {
    const command = client.commands.get(commandName)
    reply(message, command.handler(search, client))
  }
}
