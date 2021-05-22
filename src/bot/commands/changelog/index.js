import dateFormat from 'dateformat'
import changelog from '../../../data/changelog'
import getEmbed from '../../../helpers/getEmbed'
import searchCards from '../../../helpers/searchCards'
import parseDate from '../../../helpers/parseDate'

const groupByDate = (acc, change) => {
  if (typeof acc[change.date] === 'undefined') {
    acc[change.date] = []
  }
  acc[change.date].push(change)
  return acc
}

export default {
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
  handler: function (message) {
    const [card] = searchCards(message)

    // If no card was found with the given search, look no further.
    if (!card) return

    const embed = getEmbed()
      .setTitle(`${this.label}: ${card.name}`)
      .setURL('https://stormbound-kitty.com/changelog')

    const cardChanges = changelog.filter(change => change.id === card.id)
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
        .sort((a, b) => {
          const dateA = parseDate(a)
          const dateB = parseDate(b)

          return dateA < dateB ? -1 : dateA > dateB ? +1 : 0
        })
        .map(date => {
          const name = dateFormat(parseDate(date), 'd mmm yyyy')
          const value = changesByDate[date]
            .map(change => '- ' + change.description)
            .join('\n')

          return { name, value }
        })
    )

    return embed
  },
}
