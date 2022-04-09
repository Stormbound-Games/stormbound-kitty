import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Teasers from '~/components/Teasers'
import { CardsContext } from '~/components/CardsProvider'
import serialization from '~/helpers/serialization'
import parseDate from '~/helpers/parseDate'
import microMarkdown from '~/helpers/microMarkdown'
import { formatDate } from '~/helpers/formatDate'

export const getCardData = (cardsIndex, id) => {
  const data = serialization.card.deserialize(cardsIndex, id)
  data.image = cardsIndex[data.imageCardId]?.image ?? data.imageURL
  data.strength = data.strength.values[0]
  data.mana = data.mana.values[0]
  data.ability = data.ability.values[0]
  data.level = 1
  return data
}

export const CardBuilderHallOfFameSeason = React.memo(function SWCCSeason(
  props
) {
  const { cardsIndex } = React.useContext(CardsContext)
  const items = props.weeks.map(week => {
    const cardData = getCardData(cardsIndex, week.winner.id)
    const date = formatDate(parseDate(week.date))

    return {
      id: week.winner.id,
      card: cardData,
      title: week.name,
      meta: (
        <>
          By{' '}
          <Link to={`/members/${week.winner.user.slug}`}>
            {week.winner.user.name}
          </Link>{' '}
          in {date}
        </>
      ),
      to: `/card/${week.winner.id}/display`,
      excerpt: (
        <>
          <strong className='Highlight'>{cardData.name}</strong> —{' '}
          {microMarkdown(cardData.ability)}
        </>
      ),
    }
  })

  return <Teasers items={items} />
})

export default React.memo(function PageSWCCSeason(props) {
  return (
    <Page
      title={'SWCC Season ' + props.number}
      description={`All the cards from the Stormbound Weekly Card Contest season ${props.number}`}
      authors={[
        { name: 'TaKo_G', slug: 'tako_g' },
        props.number >= 4 && { name: 'Grimm', slug: 'grimm' },
      ].filter(Boolean)}
      action={{ to: '/swcc', children: 'Back to SWCC' }}
      meta={`${props.weeks.length} weeks`}
    >
      <CardBuilderHallOfFameSeason weeks={props.weeks} />
    </Page>
  )
})
