import getCardsForSearch from '../../../helpers/getCardsForSearch'

export default {
  command: 'cardinfo',
  name: 'Card search',
  example: 'rof',
  description:
    'Get information about the card(s) matching given search criteria',
  icon: '⚡️',
  handler: function (search) {
    return (
      getCardsForSearch(search)
        .map(card => 'https://stormbound-kitty.com/card/' + card.id)
        .slice(0, 3)
        .join('\n') || undefined
    )
  },
}
