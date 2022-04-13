import React from 'react'
import { useFela } from 'react-fela'
import { RichTextContext } from '~/components/BlocksRenderer'
import { CardsContext } from '~/components/CardsProvider'
import Card from '~/components/Card'
import CardDisplay from '~/components/CardDisplay'
import PageEmbed from '~/components/PageEmbed'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function BlockCard(props) {
  const { css } = useFela()
  const { cards, cardsIndex } = React.useContext(CardsContext)
  const { columns } = React.useContext(RichTextContext)
  const id = props.value.cardId
  const level = props.value.level || 1

  if (!id) {
    console.warn('Could not resolve card for id', id)
    return null
  }

  return columns.count > 0 ? (
    <div
      className={css({
        marginBottom: 'var(--s-large)',
        medium: { marginBottom: 0 },
      })}
    >
      <Card
        {...getResolvedCardData(cardsIndex, { id, level })}
        containerWidth={(columns.wide ? 1200 : 700) / columns.count}
      />
    </div>
  ) : (
    <PageEmbed>
      <CardDisplay {...getInitialCardData(cards, id)} id={id} />
    </PageEmbed>
  )
})
