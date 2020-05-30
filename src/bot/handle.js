const send = client => (message, content) => {
  if (!content) return

  // If the message is sent anywhere in the Stormbound server, reply in
  // `#kitty-bot` to avoid spamming channels with bot answers.
  if (message.channel.guild.id === '293674725069029377') {
    // Make sure a local bot does not have any impact on the Stormbound server.
    if (process.env.NODE_ENV === 'production') {
      client.channels.cache
        .get('714880856954503239')
        .send(`${message.author} ${content}`)
    }
  } else if (process.env.NODE_ENV === 'development') {
    message.reply(content)
  }
}

export default client => message => {
  if (!message.content.startsWith('!') || message.author.bot) return

  const [commandName, ...rest] = message.content.slice(1).split(' ')
  const reply = send(client)
  const search = rest.join(' ').trim()

  if (client.commands.has(commandName)) {
    const command = client.commands.get(commandName)
    reply(message, command.handler(search, client))
  }
}
