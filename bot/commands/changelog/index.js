import getEmbed from '~/helpers/getEmbed'
import searchCards from '~/helpers/searchCards'
import parseDate from '~/helpers/parseDate'
import getChangesFromCard from '~/api/changes/getChangesFromCard'
import { formatPreciseDate } from '~/helpers/formatDate'

const groupByDate = (acc, change) => {
  if (typeof acc[change.date] === 'undefined') {
    acc[change.date] = []
  }
  acc[change.date].push(change)
  return acc
}

const changelog = {
  command: 'changelog',
  label: '🛠  Card Changelog',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/changelog')
      .setDescription(
        `List the changes applied to a card over time. It expects a card abbreviation, a Stormbound-Kitty ID, or otherwise performs a “fuzzy search” on the card name and picks the first result. For instance, \`!${this.command} rof\`, \`!${this.command} N1\` or \`!${this.command} souls\`.`
      )
  },
  handler: async function (message) {
    const [card] = searchCards(message)

    // If no card was found with the given search, look no further.
    if (!card) return

    const embed = getEmbed()
      .setTitle(`${this.label}: ${card.name}`)
      .setURL(`https://stormbound-kitty.com/card/${card.id}/display`)

    const cardChanges = await getChangesFromCard({ id: card.id })
    const changesByDate = cardChanges.reduce(groupByDate, {})
    const hasChanges = Object.keys(changesByDate).length > 0

    if (!hasChanges) {
      embed.setDescription(
        `It seems there are no recorded changes for **${card.name}**.`
      )

      return embed
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

    return embed
  },
}

export default changelog
