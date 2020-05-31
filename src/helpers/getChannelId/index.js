import {
  STORMBOUND_SERVER,
  TRIVIA_CHANNEL,
  KITTY_BOT_CHANNEL,
} from '../../constants/bot'

const getChannelId = (message, command) => {
  const isLocalBot = process.env.NODE_ENV === 'development'

  // If the command should not be allowed in the current channel, skip entirely.
  if (!command.isAllowed(message.channel)) return null

  if (message.channel.guild.id === STORMBOUND_SERVER) {
    // The local bot should never answer to messages from the main Stormbound
    // server to avoid having both the local and the production bots answering
    // at the same time.
    return isLocalBot
      ? null
      : command.command === 'trivia'
      ? TRIVIA_CHANNEL
      : KITTY_BOT_CHANNEL
  }

  // The production bot should only answer in the main Stormbound server to
  // avoid having duplicate answers when testing the bot locally.
  return isLocalBot
    ? command.command === 'trivia'
      ? TRIVIA_CHANNEL
      : message.channel.id
    : null
}

export default getChannelId
