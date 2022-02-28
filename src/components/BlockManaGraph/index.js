import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import DeckStatsChart from '~/components/DeckStatsChart'
import serialization from '~/helpers/serialization'
import getResolvedCardData from '~/helpers/getResolvedCardData'

export default React.memo(function BlockManaGraph(props) {
  const { deckId, modifier = 'NONE' } = props.value
  const { cardsIndex, cardsIndexBySid } = React.useContext(CardsContext)
  const deck = React.useMemo(
    () =>
      serialization.deck
        .deserialize(cardsIndexBySid, deckId)
        .map(card => getResolvedCardData(cardsIndex, card)),
    [cardsIndex, cardsIndexBySid, deckId]
  )

  return <DeckStatsChart deck={deck} modifier={modifier} />
})
