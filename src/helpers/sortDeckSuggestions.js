import { deserialiseDeck } from './deserialise'
import resolveCollection from './resolveCollection'

const getCollectionDistance = collection => deck => {
  const cards = deserialiseDeck(deck.id)
  const findInCollection = card => collection[card.id]
  const computeDistance = (distance, card) =>
    card.missing ? Infinity : distance + (card.maxCost - card.cost)

  return cards.map(findInCollection).reduce(computeDistance, 0)
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
