import React from 'react'
import { RichTextContext } from '~/components/BlocksRenderer'
import Card from '~/components/Card'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import PageEmbed from '~/components/PageEmbed'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function BlockCard(props) {
  const { isInColumn } = React.useContext(RichTextContext)
  const id = props.value.cardId
  const level = props.value.level || 1

  return isInColumn ? (
    <Card {...getResolvedCardData({ id, level })} />
  ) : (
    <PageEmbed>
      <CardBuilderCardDisplay {...getInitialCardData(id)} />
    </PageEmbed>
  )
})
