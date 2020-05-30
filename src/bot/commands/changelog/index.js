import dateFormat from 'dateformat'
import changelog from '../../../data/changelog.json'
import getCardsForSearch from '../../../helpers/getCardsForSearch'

const groupByDate = (acc, change) => {
  if (typeof acc[change.date] === 'undefined') {
    acc[change.date] = []
  }
  acc[change.date].push(change)
  return acc
}

export default {
  command: 'changelog',
  name: 'Card changes',
  description: 'Get information about changes applied to a card over time',
  example: 'qoh',
  icon: '🛠',
  handler: function (message) {
    const [card] = getCardsForSearch(message)

    // If no card was found with the given search, look no further.
    if (!card) return

    const cardChanges = changelog.filter(change => change.id === card.id)
    const changesByDate = cardChanges.reduce(groupByDate, {})

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
