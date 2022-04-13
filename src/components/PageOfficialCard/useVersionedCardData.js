import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import serialization from '~/helpers/serialization'

const useVersionedCardData = ({ card, id, versions, versionId }) => {
  const { cardsIndex } = React.useContext(CardsContext)

  if (!versionId || versions.length === 0) {
    return card
  }

  const cardData = versions
    .filter(version => version.timestamp >= Number(versionId))
    .reduce((acc, version) => ({ ...acc, ...version.from }), cardsIndex[id])

  return serialization.card.deserialize(
    cardsIndex,
    serialization.card.serialize(cardData)
  )
}

export default useVersionedCardData
