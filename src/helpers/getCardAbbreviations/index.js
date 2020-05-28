import cards from '../../data/cards'
import abbreviate from '../abbreviate'

export default () =>
  cards
    .filter(card => !card.token)
    .reduce((acc, card) => {
      const short = abbreviate(card.name)
      return short.length === 1 ? acc : { ...acc, [short]: card.id }
    }, {})
