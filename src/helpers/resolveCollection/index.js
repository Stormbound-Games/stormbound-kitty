import getResolvedCardData from '../getResolvedCardData'
import { getCardCost } from '../getCollectionCost'

const resolveCollection = collection => {
  return collection.reduce((acc, card) => {
    acc[card.id] = getResolvedCardData(card)
    acc[card.id].maxCost = getCardCost({ ...card, level: 5 })
    acc[card.id].cost = getCardCost(card)

    return acc
  }, {})
}

export default resolveCollection
