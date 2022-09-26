import { SlashCommandBuilder } from 'discord.js'
import getEmbed from '#helpers/getEmbed'
import searchCards from '#helpers/searchCards'
import parseDate from '#helpers/parseDate'
import getChangesFromCard from '#api/changes/getChangesFromCard'
import { formatPreciseDate } from '#helpers/formatDate'
import trackBotCommand from '#helpers/trackBotCommand'

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
        .setDescription('An abbreviation, ID, or approximate name.')
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const input = interaction.options.getString('card')
    const cards = [...client.cards.values()]
    const abbreviations = Object.fromEntries(client.abbreviations)
    const [card] = searchCards(cards, abbreviations, input)
    const embed = getEmbed().setTitle('🛠 Card Changelog')

    trackBotCommand(interaction, { card: input })

    if (!card) {
      embed
        .setURL('https://stormbound-kitty.com/changelog')
        .setDescription(`Could not find a card matching “${input}”.`)

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    embed
      .setURL(`https://stormbound-kitty.com/cards/${card.id}`)
      .setImage(card.image)

    const cardChanges = await getChangesFromCard({ id: card.id })
    const changesByDate = cardChanges.reduce(groupByDate, {})

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

    return interaction.reply({ embeds: [embed], ephemeral })
  },
}

export default changelog
