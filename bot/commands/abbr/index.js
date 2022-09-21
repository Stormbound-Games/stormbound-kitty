import { SlashCommandBuilder } from 'discord.js'
import toSentence from '#helpers/toSentence'
import getAbbreviations from '#api/misc/getAbbreviations'

const quotify = value => `“${value}”`

const abbr = {
  data: new SlashCommandBuilder()
    .setName('abbr')
    .setDescription(
      'Get the meaning of a card or popular abbreviation (regardless of its casing).'
    )
    .addStringOption(option =>
      option
        .setName('abbr')
        .setDescription('The abbreviation')
        .setRequired(true)
    ),

  async execute(interaction) {
    const abbr = interaction.options.getString('abbr')
    const abbreviations = await getAbbreviations({ casing: 'LOWERCASE' })
    const matches = abbreviations[abbr.toLowerCase()]
    const content = matches
      ? `“${abbr}” might mean ${toSentence(matches.map(quotify), 'or')}.`
      : `Could not find any match for abbreviation “${abbr}”.`

    return interaction.reply({ content, ephemeral: true })
  },
}

export default abbr
