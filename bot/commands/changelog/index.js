import { SlashCommandBuilder } from 'discord.js'
import getEmbed from '#helpers/getEmbed'
import searchCards from '#helpers/searchCards'
import parseDate from '#helpers/parseDate'
import getChangesFromCard from '#api/changes/getChangesFromCard'
import { formatPreciseDate } from '#helpers/formatDate'

const groupByDate = (acc, change) => {
  if (typeof acc[change.date] === 'undefined') {
    acc[change.date] = []
  }
  acc[change.date].push(change)
  return acc
}

const changelog = {
  data: new SlashCommandBuilder()
    .setName('changelog')
    .setDescription('List the changes applied to a card over time.')
    .addStringOption(option =>
      option
        .setName('card')
        .setDescription(
          'A card abbreviation, a Stormbound-Kitty ID, or otherwise performs a “fuzzy search” on the card name'
        )
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused()
    const cards = [...client.cards.values()]
    const abbreviations = Object.fromEntries(client.abbreviations)
    const filtered = searchCards(cards, abbreviations, focusedValue)

    return interaction.respond(
      filtered.map(card => ({ name: card.name, value: card.id }))
    )
  },

  async execute(interaction, client) {
    const id = interaction.options.getString('card')
    const card = client.cards.get(id)

    if (!card) {
      return interaction.reply({
        content: `Could not find a card matching “${id}”.`,
        ephemeral: true,
      })
    }

    const embed = getEmbed()
      .setTitle(`🛠  Card Changelog: ${card.name}`)
      .setURL(`https://stormbound-kitty.com/cards/${card.id}`)

    const cardChanges = await getChangesFromCard({ id: card.id })
    const changesByDate = cardChanges.reduce(groupByDate, {})
    const hasChanges = Object.keys(changesByDate).length > 0

    if (!hasChanges) {
      return interaction.reply({
        content: `It seems there are no recorded changes for **${card.name}**.`,
        ephemeral: true,
      })
    }

    embed.addFields(
      ...Object.keys(changesByDate)
        .sort((a, b) => parseDate(b) - parseDate(a))
        .map(date => {
          const name = formatPreciseDate(parseDate(date))
          const value = changesByDate[date]
            .map(change => '- ' + change.description)
            .join('\n')

          return { name, value }
        })
    )

    return interaction.reply({ embeds: [embed], ephemeral: true })
  },
}

export default changelog
