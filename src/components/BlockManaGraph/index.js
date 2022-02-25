import React from 'react'
import DeckStatsChart from '~/components/DeckStatsChart'
import serialization from '~/helpers/serialization'
import getResolvedCardData from '~/helpers/getResolvedCardData'

export default React.memo(function BlockManaGraph(props) {
  const { deckId, modifier = 'NONE' } = props.value
  const deck = React.useMemo(
    () => serialization.deck.deserialize(deckId).map(getResolvedCardData),
    [deckId]
  )

  return <DeckStatsChart deck={deck} modifier={modifier} />
})
