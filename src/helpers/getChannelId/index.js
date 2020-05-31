import { STORMBOUND_SERVER, KITTY_BOT_CHANNEL } from '../../constants/bot'

const getChannelId = (message, command) => {
  const isLocalBot = process.env.NODE_ENV === 'development'

  // If the command should be restricted to a single channel, and the original
  // message has not been issued in that channel, skip entirely.
  if (command.channel && message.channel.id !== command.channel) {
    return null
  }

  if (message.channel.guild.id === STORMBOUND_SERVER) {
    // The local bot should never answer to messages from the main Stormbound
    // server to avoid having both the local and the production bots answering
    // at the same time.
    return isLocalBot ? null : command.channel || KITTY_BOT_CHANNEL
  }

  // The production bot should only answer in the main Stormbound server to
  // avoid having duplicate answers when testing the bot locally.
  return isLocalBot ? message.channel.id : null
}

export default getChannelId
