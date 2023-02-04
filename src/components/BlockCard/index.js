import React from 'react'
import { useFela } from 'react-fela'
import { RichTextContext } from '#components/BlocksRenderer'
import { CardsContext } from '#components/CardsProvider'
import Card from '#components/Card'
import CardDisplay from '#components/CardDisplay'
import PageEmbed from '#components/PageEmbed'
import getResolvedCardData from '#helpers/getResolvedCardData'
import getInitialCardData from '#helpers/getInitialCardData'
import parseDate from '#helpers/parseDate'
import serialization from '#helpers/serialization'

const statsToObject = from =>
  from.reduce((acc, entry) => ({ ...acc, [entry.stat]: entry.value }), {})

const useCorrectCardData = value => {
  const { cardId, versions } = value
  const { cards, cardsIndex } = React.useContext(CardsContext)
  const { date: itemDate } = React.useContext(RichTextContext)

  // If there is no date in the rich text context, it means the card is in its
  // latest version and can be retrieved from the cards index.
  if (!itemDate) {
    return getInitialCardData(cards, cardId)
  }

  const date = parseDate(itemDate)

  // Apply all versions of the card one by one until reaching the date of the
  // rich text entry to get the version of the card as it was back then.
  const cardData = versions
    .filter(version => new Date(version.date) >= date)
    .reduce(
      (data, version) => ({ ...data, ...statsToObject(version.from) }),
      cardsIndex[cardId]
    )

  // Pass the card data through the serializer so it can be passed to the card
  // display (which needs resolved leveled data, not raw data).
  return serialization.card.deserialize(
    cardsIndex,
    serialization.card.serialize(cardData)
  )
}

export default React.memo(function BlockCard(props) {
  const { css } = useFela()
  const { cardsIndex } = React.useContext(CardsContext)
  const { columns } = React.useContext(RichTextContext)
  const { cardId: id, level } = props.value
  const cardData = useCorrectCardData(props.value)

  if (!(id in cardsIndex)) {
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
      <CardDisplay
        {...cardData}
        // Skip the `id` to avoid showing missing levels in guides and release
        // notes.
        id={undefined}
      />
    </PageEmbed>
  )
})
