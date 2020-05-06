import getDeckDistanceToMax from '../getDeckDistanceToMax'
import resolveCollection from '../resolveCollection'

const sortDeckSuggestions = ({ hasDefaultCollection, collection }, order) => {
  const resolvedCollection = !hasDefaultCollection
    ? resolveCollection(collection)
    : null

  switch (order) {
    case 'DATE':
      return (a, b) => 0

    case 'FEASIBILITY':
      return (a, b) => {
        const distanceA = getDeckDistanceToMax(resolvedCollection)(a)
        const distanceB = getDeckDistanceToMax(resolvedCollection)(b)

        if (distanceA < distanceB) return -1
        if (distanceA > distanceB) return +1
      }

    default:
    case 'FACTION':
      return (a, b) => {
        if (a.faction > b.faction) return +1
        if (a.faction < b.faction) return -1

        return 0
      }
  }
}

export default sortDeckSuggestions
