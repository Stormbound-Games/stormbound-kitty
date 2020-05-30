import dateFormat from 'dateformat'
import changelog from '../../../data/changelog.json'
import getCardsForSearch from '../../../helpers/getCardsForSearch'

export default {
  command: 'changelog',
  name: 'Card changes',
  description: 'Get information about changes applied to a card over time',
  example: 'qoh',
  icon: '🛠',
  handler: function (search) {
    const [card] = getCardsForSearch(search)
    if (!card) return
    const cardChanges = changelog.filter(change => change.id === card.id)
    const changesByDate = cardChanges.reduce((acc, change) => {
      if (typeof acc[change.date] === 'undefined') {
        acc[change.date] = []
      }
      acc[change.date].push(change)
      return acc
    }, {})

    return (
      `Changes for **${card.name}**:` +
      Object.keys(changesByDate)
        .sort((a, b) => (+a > +b ? -1 : +a < +b ? +1 : 0))
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
