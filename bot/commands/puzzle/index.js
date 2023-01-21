import { SlashCommandBuilder } from 'discord.js'
import arrayRandom from '#helpers/arrayRandom'
import trackBotCommand from '#helpers/trackBotCommand'
import getPuzzles from '#api/puzzles/getPuzzles'

const BASE_URL = 'https://stormbound-kitty.com/puzzles/'

const puzzle = {
  data: new SlashCommandBuilder()
    .setName('puzzle')
    .setDescription('Get a random Stormbound buzzle.'),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const puzzles = await getPuzzles()
    const puzzle = arrayRandom(puzzles)

    trackBotCommand(interaction)

    return interaction.reply({ content: BASE_URL + puzzle.slug, ephemeral })
  },
}

export default puzzle
