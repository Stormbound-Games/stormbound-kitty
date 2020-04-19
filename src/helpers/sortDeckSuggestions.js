import { deserialiseDeck } from './deserialise'
import resolveCardForLevel from './resolveCardForLevel'
import { getCardCost } from './getCollectionCost'

const getCollectionDistance = collection => deck => {
  const cards = deserialiseDeck(deck.id)
  const findInCollection = card => collection[card.id]
  const computeDistance = (distance, card) =>
    card.missing ? Infinity : distance + (card.maxCost - card.cost)

  return cards.map(findInCollection).reduce(computeDistance, 0)
}

const resolveCollection = collection => {
  return collection.reduce((acc, card) => {
    acc[card.id] = resolveCardForLevel(card)
    acc[card.id].maxCost = getCardCost({ ...card, level: 5 })
    acc[card.id].cost = getCardCost(card)

    return acc
  }, {})
}

const sortDeckSuggestions = ({ hasDefaultCollection, collection }) => {
  const resolvedCollection = !hasDefaultCollection
    ? resolveCollection(collection)
    : null

  return (a, b) => {
    if (!hasDefaultCollection) {
      const distanceA = getCollectionDistance(resolvedCollection)(a)
      const distanceB = getCollectionDistance(resolvedCollection)(b)

      if (distanceA < distanceB) return -1
      if (distanceA > distanceB) return +1
    }

    if (a.faction > b.faction) return +1
    if (a.faction < b.faction) return -1

    if (a.name > b.name) return +1
    if (a.name < b.name) return -1

    return 0
  }
}

export default sortDeckSuggestions
