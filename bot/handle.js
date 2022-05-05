import getChannelId from '~/helpers/getChannelId'

const handle = client => async message => {
  const isCommand = message.content.startsWith('!')

  // If the message comes from a bot (or itself), do not process any further.
  if (message.author.bot) return

  // If the message contains the top-level domain, react with joy.
  if (!isCommand) {
    if (message.content.includes('https://stormbound-kitty.com')) {
      return message.react('😻')
    }

    // If the message does not contain any command, do not process any further.
    return
  }

  const [commandName, ...rest] = message.content.slice(1).split(' ')
  const content = rest
    .filter(term => !term.startsWith('<@'))
    .join(' ')
    .trim()
  const command =
    client.commands.get(commandName) || client.aliases.get(commandName)

  if (!command) return

  const user = message.mentions.users.first() || message.author
  const ping = command.ping === false ? '' : user
  const channelId = getChannelId(message, command)
  const answer = /\bhelp\b/.test(content)
    ? await command.help(content, client, message)
    : await command.handler(content, client, message)

  if (answer && channelId) {
    const channel = client.channels.cache.get(channelId)

    if (typeof answer === 'string') {
      channel.send([ping, answer].join(' '))
    } else {
      channel.send(ping, answer)
    }
  }
}

export default handle
