import React from 'react'
import { CollectionContext } from '#components/CollectionProvider'
import { CardsContext } from '#components/CardsProvider'
import getDeckDistanceToMax from '#helpers/getDeckDistanceToMax'
import getFactionFromDeckID from '#helpers/getFactionFromDeckID'
import resolveCollection from '#helpers/resolveCollection'

const useFeaturedDecksSorting = order => {
  const { hasDefaultCollection, collection } =
    React.useContext(CollectionContext)
  const { cardsIndex, cardsIndexBySid } = React.useContext(CardsContext)
  const resolvedCollection = !hasDefaultCollection
    ? resolveCollection(collection, cardsIndex)
    : null

  switch (order) {
    case 'DATE':
      return () => 0

    case 'FEASIBILITY':
      return (a, b) => {
        const distanceA = getDeckDistanceToMax(
          resolvedCollection,
          cardsIndexBySid
        )(a)
        const distanceB = getDeckDistanceToMax(
          resolvedCollection,
          cardsIndexBySid
        )(b)

        if (distanceA < distanceB) return -1
        if (distanceA > distanceB) return +1
      }

    default:
    case 'FACTION':
      return (a, b) => {
        if (getFactionFromDeckID(a.id) > getFactionFromDeckID(b.id)) return +1
        if (getFactionFromDeckID(a.id) < getFactionFromDeckID(b.id)) return -1

        return 0
      }
  }
}

export default useFeaturedDecksSorting
