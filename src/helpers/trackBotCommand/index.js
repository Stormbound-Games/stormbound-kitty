import trackAsync from '#helpers/trackAsync'

const trackBotCommand = (interaction, params = {}) =>
  trackAsync(
    {
      // This TEST-NET-1 IP can be used as a “null route”.
      // https://superuser.com/questions/698244/ip-address-that-is-the-equivalent-of-dev-null
      ip: '192.0.2.0/24',
      headers: { 'user-agent': 'DiscordBot' },
    },
    'bot_' + interaction.commandName,
    'bot',
    {
      params,
      user: { id: interaction.user.id, name: interaction.user.username },
      guildId: interaction.guildId,
      channelId: interaction.channelId,
    }
  ).catch(error => console.error(error))

export default trackBotCommand
