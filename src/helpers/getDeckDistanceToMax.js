import serialisation from './serialisation'

const getDeckDistanceToMax = collection => deck => {
  const cards = serialisation.deck.deserialise(deck.id)
  const findInCollection = card => collection[card.id]
  const computeDistance = (distance, card) =>
    card.missing ? Infinity : distance + (card.maxCost - card.cost)

  return cards.map(findInCollection).reduce(computeDistance, 0)
}

export default getDeckDistanceToMax
