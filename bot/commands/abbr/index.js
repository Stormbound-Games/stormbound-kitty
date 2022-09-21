import { SlashCommandBuilder } from 'discord.js'
import toSentence from '#helpers/toSentence'

const quotify = value => `“${value}”`

const abbr = {
  data: new SlashCommandBuilder()
    .setName('abbr')
    .setDescription('Get the meaning of a card or popular abbreviation.')
    .addStringOption(option =>
      option
        .setName('abbr')
        .setDescription('The abbreviation to demystify.')
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const abbr = interaction.options.getString('abbr')
    const abbreviations = Object.fromEntries(client.abbreviations)
    const matches = abbreviations[abbr.toLowerCase()]
    const content = matches
      ? `“${abbr}” might mean ${toSentence(matches.map(quotify), 'or')}.`
      : `Could not find any match for abbreviation “${abbr}”.`

    return interaction.reply({ content, ephemeral: true })
  },
}

export default abbr
