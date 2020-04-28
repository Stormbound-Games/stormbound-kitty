import { increaseCardWeight } from '../../helpers/resolveDeckWeight'
import hasInHand from '../../helpers/hasInHand'

const getIncreasedDeckWeight = ({ deck, hand, reset }) =>
  deck.map(card => {
    if (hasInHand(card, hand) && !reset.includes(card)) {
      return card
    }

    const weight = reset.includes(card) ? 0 : increaseCardWeight(card.weight)

    return { ...card, weight }
  })

export default getIncreasedDeckWeight
