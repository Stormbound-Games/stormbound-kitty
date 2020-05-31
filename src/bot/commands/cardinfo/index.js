import getCardsForSearch from '../../../helpers/getCardsForSearch'
import { TRIVIA_CHANNEL } from '../../../constants/bot'

export default {
  command: 'cardinfo',
  name: 'Card search',
  example: 'rof',
  description:
    'Get information about the card(s) matching given search criteria',
  icon: '⚡️',
  isAllowed: channel => channel.id !== TRIVIA_CHANNEL,
  handler: function (message) {
    return (
      getCardsForSearch(message)
        .map(card => 'https://stormbound-kitty.com/card/' + card.id)
        .slice(0, 3)
        .join('\n') || undefined
    )
  },
}
