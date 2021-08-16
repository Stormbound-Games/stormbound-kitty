import getResolvedCardData from '~/helpers/getResolvedCardData'
import { getCardCost } from '~/helpers/getCollectionCost'

const resolveCollection = collection => {
  return collection.reduce((acc, card) => {
    const data = getResolvedCardData(card)

    // It is technically possible for the card not to be found in the collection
    // at all if it was added as a new card in a separate branch, stored in
    // local storage. Then, checking out a branch without this card in the
    // database yet would cause the card not to be found in the collection. It
    // cannot happen in production unless cards ever get removed from the game.
    if (!data) return acc

    acc[card.id] = data
    acc[card.id].maxCost = getCardCost({ ...card, level: 5 })
    acc[card.id].cost = getCardCost(card)

    return acc
  }, {})
}

export default resolveCollection
