import React from 'react'
import Link from '~/components/Link'
import ListLayoutItem from '~/components/ListLayoutItem'
import Teasers from '~/components/Teasers'
import { CardsContext } from '~/components/CardsProvider'
import parseDate from '~/helpers/parseDate'
import microMarkdown from '~/helpers/microMarkdown'
import getSWCCCardData from '~/helpers/getSWCCCardData'
import { formatDate } from '~/helpers/formatDate'

export default React.memo(function SWCCSeason(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const items = props.weeks.map(week => {
    const cardData = getSWCCCardData(cardsIndex, week.winner.id)
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
      to: `/swcc/season/${week.season}/week/${week.week}`,
      excerpt: (
        <>
          <strong className='Highlight'>{cardData.name}</strong> —{' '}
          {microMarkdown(cardData.ability)}
        </>
      ),
    }
  })

  if (props.layout === 'GRID') {
    return <Teasers items={items} />
  }

  if (props.layout === 'LIST') {
    return props.weeks.map(week => {
      const cardData = getSWCCCardData(cardsIndex, week.winner.id)

      return (
        <ListLayoutItem
          key={week.winner.id}
          date={week.date}
          dateFormat='LONG'
          title={
            <>
              Week {week.week}: {week.name}
            </>
          }
          author={week.winner.user}
          icon='wand'
          path={`/swcc/season/${week.season}/week/${week.week}`}
          excerpt={
            <>
              <strong className='Highlight'>{cardData.name}</strong> —{' '}
              {[cardData.rarity, cardData.faction, cardData.type, cardData.race]
                .filter(Boolean)
                .join(' · ')}
              <br />
              {microMarkdown(cardData.ability)}
            </>
          }
        />
      )
    })
  }

  return null
})
