import { SlashCommandBuilder } from 'discord.js'
import toSentence from '#helpers/toSentence'
import getEmbed from '#helpers/getEmbed'
import trackBotCommand from '#helpers/trackBotCommand'

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
    const ephemeral = !client.DEBUG_MODE
    const abbr = interaction.options.getString('abbr')
    const abbreviations = Object.fromEntries(client.abbreviations)
    const matches = abbreviations[abbr.toLowerCase()]
    const embed = getEmbed()
      .setTitle('❔ Abbreviation')
      .setURL('https://stormbound-kitty.com/lexicon')
      .setDescription(
        matches
          ? `“${abbr}” might mean ${toSentence(matches.map(quotify), 'or')}.`
          : `Could not find any match for abbreviation “${abbr}”.`
      )

    trackBotCommand(interaction, { abbr })

    return interaction.reply({ embeds: [embed], ephemeral })
  },
}

export default abbr
