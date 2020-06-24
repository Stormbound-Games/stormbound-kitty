import dateFormat from 'dateformat'
import changelog from '../../../data/changelog.json'
import searchCards from '../../../helpers/searchCards'

const groupByDate = (acc, change) => {
  if (typeof acc[change.date] === 'undefined') {
    acc[change.date] = []
  }
  acc[change.date].push(change)
  return acc
}

export default {
  command: 'changelog',
  help: function () {
    return `🛠  **Card Changes:** List the changes applied to a card over time. It expects a card abbreviation, a Stormbound-Kitty ID, or otherwise performs a “fuzzy search” on the card name and picks the first result. For instance, \`!${this.command} rof\`, \`!${this.command} N1\` or \`!${this.command} souls\`.`
  },
  handler: function (message) {
    const [card] = searchCards(message)

    // If no card was found with the given search, look no further.
    if (!card) return

    const cardChanges = changelog.filter(change => change.id === card.id)
    const changesByDate = cardChanges.reduce(groupByDate, {})
    const hasChanges = Object.keys(changesByDate).length > 0

    if (!hasChanges) {
      return `It seems there are no recorded changes for **${card.name}**.`
    }

    return (
      `Changes for **${card.name}**:` +
      Object.keys(changesByDate)
        .sort((a, b) => +b - +a)
        .reduce((acc, date) => {
          const formattedDate = dateFormat(new Date(+date), 'd mmm yyyy')
          const changes = changesByDate[date]
          return (
            acc +
            `\n*${formattedDate}*\n` +
            changes.map(change => `- ${change.description}`).join('\n')
          )
        }, '')
    )
  },
}
