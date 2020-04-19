import getDeckDistanceToMax from './getDeckDistanceToMax'
import resolveCollection from './resolveCollection'

const sortDeckSuggestions = ({ hasDefaultCollection, collection }) => {
  const resolvedCollection = !hasDefaultCollection
    ? resolveCollection(collection)
    : null

  return (a, b) => {
    if (!hasDefaultCollection) {
      const distanceA = getDeckDistanceToMax(resolvedCollection)(a)
      const distanceB = getDeckDistanceToMax(resolvedCollection)(b)

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
