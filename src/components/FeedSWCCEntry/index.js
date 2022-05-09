import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import Link from '~/components/Link'
import FeedDetailDisplay from '~/components/FeedDetailDisplay'
import FeedEntry from '~/components/FeedEntry'
import Teaser from '~/components/Teaser'
import microMarkdown from '~/helpers/microMarkdown'
import serialization from '~/helpers/serialization'
import getSWCCCardData from '~/helpers/getSWCCCardData'

export default React.memo(function FeedSWCCEntry(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const card = serialization.card.deserialize(cardsIndex, props.id)
  const cardData = getSWCCCardData(cardsIndex, props.id)

  return (
    <FeedEntry icon='hammer' date={props.date}>
      {props.user.name} has won the 🥇{' '}
      <Link to='/swcc'>Stormbound Weekly Card Contest</Link> (
      <Link to={`/swcc/season/${props.season}`}>season {props.season}</Link>{' '}
      week {props.week}, theme <span className='Highlight'>{props.name}</span>)
      with a card called{' '}
      <Link to={`/swcc/season/${props.season}/week/${props.week}`}>
        {card.name}
      </Link>
      .
      <FeedDetailDisplay label='card'>
        <Teaser
          card={cardData}
          title={props.name}
          meta={`Season ${props.season} week ${props.week}`}
          to={`/swcc/season/${props.season}/week/${props.week}`}
          excerpt={
            <>
              <strong className='Highlight'>{cardData.name}</strong> —{' '}
              {microMarkdown(cardData.ability)}
            </>
          }
        />
      </FeedDetailDisplay>
    </FeedEntry>
  )
})
