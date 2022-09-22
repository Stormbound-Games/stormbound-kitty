export const handleMessage = client => async interaction => {
  if (!interaction.isChatInputCommand() || interaction.user.bot) return

  const command = client.commands.get(interaction.commandName)

  try {
    if (command) await command.execute(interaction, client)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'Sorry! There was an error while executing this command.',
      ephemeral: !client.DEBUG_MODE,
    })
  }
}

export const handleAutocomplete = client => async interaction => {
  if (!interaction.isAutocomplete() || interaction.user.bot) return

  const command = client.commands.get(interaction.commandName)

  try {
    if (command) await command.autocomplete(interaction, client)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'Sorry! There was an error while autocompleting this command.',
      ephemeral: !client.DEBUG_MODE,
    })
  }
}
