import { increaseCardWeight } from '../../helpers/resolveDeckWeight'

export const getIncreasedDeckWeight = ({ state, reset }) => {
  const { deck, hand } = state

  return deck.map(card => {
    if (hand.includes(card.id) && !reset.includes(card.id)) {
      return card
    }

    const weight = reset.includes(card.id) ? 0 : increaseCardWeight(card.weight)

    return { ...card, weight }
  })
}
