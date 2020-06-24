const KITTY_SERVER = '714858253531742208'

const getChannelId = (message, command) => {
  const isLocalBot = process.env.NODE_ENV === 'development'
  const isTest = message.channel.guild.id === KITTY_SERVER
  const triviaChannel = message.guild.channels.cache.find(
    channel => channel.name === 'trivia'
  )
  const botChannel = message.guild.channels.cache.find(
    channel => channel.name === 'stormbot'
  )

  // If the command should not be allowed in the current channel, skip entirely.
  if (!command.isAllowed(message.channel)) return null

  // The local bot should only reply when the message issued on the test server,
  // and non-local bots should not reply on the test server.
  if ((isLocalBot && !isTest) || (!isLocalBot && isTest)) return null

  // If the command is trivia, reply in the dedicated trivia channel.
  if (command.command === 'trivia') {
    return triviaChannel ? triviaChannel.id : null
  }

  // Otherwise reply in the dedicated bot channel.
  return botChannel ? botChannel.id : null
}

export default getChannelId
