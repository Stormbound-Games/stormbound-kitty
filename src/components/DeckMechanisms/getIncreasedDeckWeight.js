import { increaseCardWeight } from '../../helpers/resolveDeckWeight'

const getIncreasedDeckWeight = ({ deck, hand, reset }) =>
  deck.map(card => {
    if (hand.includes(card.id) && !reset.includes(card.id)) {
      return card
    }

    const weight = reset.includes(card.id) ? 0 : increaseCardWeight(card.weight)

    return { ...card, weight }
  })

export default getIncreasedDeckWeight
