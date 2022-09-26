import getEmbed from '#helpers/getEmbed'

const isProd = process.env.NODE_ENV === 'production'
const TEST_SERVER_ID = '714858253531742208'

export const handleMessage = client => async interaction => {
  if (!interaction.isChatInputCommand()) return
  if (interaction.user.bot) return
  if (isProd && interaction.guildId === TEST_SERVER_ID) return

  const command = client.commands.get(interaction.commandName)

  try {
    if (command) await command.execute(interaction, client)
  } catch (error) {
    console.error(error)

    const embed = getEmbed()
      .setTitle('🤖 KittyBot')
      .setDescription('Sorry! There was an error while executing this command.')

    await interaction.reply({
      embeds: [embed],
      ephemeral: !client.DEBUG_MODE,
    })
  }
}

export const handleAutocomplete = client => async interaction => {
  if (!interaction.isAutocomplete()) return
  if (interaction.user.bot) return
  if (isProd && interaction.guildId === TEST_SERVER_ID) return

  const command = client.commands.get(interaction.commandName)

  try {
    if (command) await command.autocomplete(interaction, client)
  } catch (error) {
    console.error(error)

    const embed = getEmbed()
      .setTitle('🤖 KittyBot')
      .setDescription(
        'Sorry! There was an error while autocompleting this command.'
      )

    await interaction.reply({
      embeds: [embed],
      ephemeral: !client.DEBUG_MODE,
    })
  }
}
