import React from 'react'
import { RichTextContext } from '~/components/BlocksRenderer'
import { CardsContext } from '~/components/CardsProvider'
import Card from '~/components/Card'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import PageEmbed from '~/components/PageEmbed'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function BlockCard(props) {
  const { cards, cardsIndex } = React.useContext(CardsContext)
  const { isInColumn } = React.useContext(RichTextContext)
  const id = props.value.cardId
  const level = props.value.level || 1

  if (!id) {
    console.warn('Could not resolve card for id', id)
    return null
  }

  return isInColumn ? (
    <Card {...getResolvedCardData(cardsIndex, { id, level })} />
  ) : (
    <PageEmbed>
      <CardBuilderCardDisplay {...getInitialCardData(cards, id)} />
    </PageEmbed>
  )
})
