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
  const items = props.contests.map(contest => {
    const cardData = getSWCCCardData(cardsIndex, contest.winner.id)
    const date = formatDate(parseDate(contest.date))

    return {
      id: contest.winner.id,
      card: cardData,
      title: contest.name,
      meta: (
        <>
          By{' '}
          <Link to={`/members/${contest.winner.user.slug}`}>
            {contest.winner.user.name}
          </Link>{' '}
          in {date}
        </>
      ),
      to: `/swcc/season/${contest.season}/week/${contest.week}`,
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
    return props.contests.map(contest => {
      const cardData = getSWCCCardData(cardsIndex, contest.winner.id)

      return (
        <ListLayoutItem
          key={contest.winner.id}
          date={contest.date}
          dateFormat='LONG'
          title={
            <>
              Week {contest.week}: {contest.name}
            </>
          }
          author={contest.winner.user}
          icon='wand'
          path={`/swcc/season/${contest.season}/week/${contest.week}`}
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
