import { SlashCommandBuilder } from 'discord.js'
import api from '#helpers/triviapi'

const gameid = {
  data: new SlashCommandBuilder()
    .setName('gameid')
    .setDescription(
      'Record your Stormbound game ID so people can look it up directly from Discord and add you as friend.'
    )
    .addStringOption(option =>
      option.setName('game_id').setDescription('Your own game ID to record.')
    )
    .addUserOption(option =>
      option
        .setName('member')
        .setDescription('Another player’s game ID to look up.')
    ),

  async execute(interaction, client) {
    const gameId = interaction.options.getString('game_id')
    const member = interaction.options.getUser('member')
    const guildId = interaction.guild.id

    // If the message looks like a Stormbound game ID, record it as the game ID
    // of the message author.
    if (gameId) {
      try {
        await api.setGameId(guildId, interaction.user.id, gameId)

        return interaction.reply({
          content: `Your game ID (${gameId}) has been recorded.`,
          ephemeral: !client.DEBUG_MODE,
        })
      } catch (error) {
        console.error(error)

        const content =
          error.name === 'AbortError'
            ? 'It looks like the storage service (jsonbin.org) is not responsive. Try again later!'
            : `There was an issue recording your game ID (${gameId}).`

        return interaction.reply({ content, ephemeral: !client.DEBUG_MODE })
      }
    }

    // If the message is not a Stormbound game ID but contains a mention, read
    // the game ID of that mentioned user.
    if (member) {
      try {
        const id = await api.getGameId(guildId, member.id)
        const content = id
          ? `${member.username}’s game ID is ${id}.`
          : `${member.username}’s game ID is not recorded yet.`

        return interaction.reply({ content, ephemeral: !client.DEBUG_MODE })
      } catch (error) {
        console.error(error)

        const content =
          error.name === 'AbortError'
            ? 'It looks like the storage service (jsonbin.org) is not responsive. Try again later!'
            : `There was an issue finding ${member.username}’s game ID.`

        return interaction.reply({ content, ephemeral: !client.DEBUG_MODE })
      }
    }

    try {
      const id = await api.getGameId(guildId, interaction.user.id)
      const content = id
        ? `Your game ID is ${id}.`
        : 'Your game ID is not recorded yet.'

      return interaction.reply({ content, ephemeral: !client.DEBUG_MODE })
    } catch (error) {
      console.error(error)

      const content =
        error.name === 'AbortError'
          ? 'It looks like the storage service (jsonbin.org) is not responsive. Try again later!'
          : `There was an issue finding your game ID.`

      return interaction.reply({ content, ephemeral: !client.DEBUG_MODE })
    }
  },
}

export default gameid
