export const handleAutocomplete = client => async interaction => {
  if (!interaction.isAutocomplete()) return
  if (interaction.user.bot) return

  const { commandName } = interaction
  const command = client.commands.get(commandName)

  if (!command) return

  try {
    await command.autocomplete(interaction, client)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'Sorry! There was an error while autocompleting this command.',
      ephemeral: true,
    })
  }
}

export const handleMessage = client => async interaction => {
  if (!interaction.isChatInputCommand()) return
  if (interaction.user.bot) return

  const { commandName } = interaction
  const command = client.commands.get(commandName)

  if (!command) return

  try {
    await command.execute(interaction, client)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'Sorry! There was an error while executing this command.',
      ephemeral: true,
    })
  }
}
