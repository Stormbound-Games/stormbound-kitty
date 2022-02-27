import serialization from '~/helpers/serialization'

const getDeckDistanceToMax = (collection, cardsIndexBySid) => deck => {
  const cards = serialization.deck.deserialize(cardsIndexBySid, deck.id)
  const findInCollection = card => collection[card.id]
  const computeDistance = (distance, card) =>
    // It is technically possible for the card not to be found in the collection
    // at all if it was added as a new card in a separate branch, stored in
    // local storage. Then, checking out a branch without this card in the
    // database yet would cause the card not to be found in the collection. It
    // cannot happen in production unless cards ever get removed from the game.
    !card || card.missing ? Infinity : distance + (card.maxCost - card.cost)

  return cards.map(findInCollection).reduce(computeDistance, 0)
}

export default getDeckDistanceToMax
