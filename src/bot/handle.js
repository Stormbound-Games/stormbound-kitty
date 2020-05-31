const DOMAIN = 'https://stormbound-kitty.com'
export const STORMBOUND_SERVER = '293674725069029377'
export const KITTY_BOT_CHANNEL = '714880856954503239'
export const TRIVIA_CHANNEL = '716595582428512289'
export const KITTY_ID = '368097495605182483'

const getChannelId = (message, commandName) => {
  const isFromStormboundServer = message.channel.guild.id === STORMBOUND_SERVER

  // The local bot should never answer to messages from the main Stormbound
  // server to avoid having both the local and the production bots answering
  // at the same time.
  if (process.env.NODE_ENV === 'development') {
    return isFromStormboundServer ? null : message.channel.id
  }

  return isFromStormboundServer
    ? commandName === 'trivia'
      ? TRIVIA_CHANNEL
      : KITTY_BOT_CHANNEL
    : null
}

const send = (client, commandName) => (message, content) => {
  if (!content) return

  const user = message.mentions.users.first() || message.author
  // Do not use pings/replies during trivia to keep the channel a little
  // lighter and avoid constant notifications for participants.
  const ping = commandName === 'trivia' ? '' : ` ${user} `
  const channelId = getChannelId(message, commandName)

  if (channelId) {
    client.channels.cache.get(channelId).send(`${ping}${content}`)
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
  const reply = send(client, commandName)
  const search = rest
    .filter(term => !term.startsWith('<@'))
    .join(' ')
    .trim()

  if (client.commands.has(commandName)) {
    const command = client.commands.get(commandName)

    if (!command.channel || message.channel.name === command.channel) {
      reply(message, command.handler(search, client, message))
    }
  }
}
