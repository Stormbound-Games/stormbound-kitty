import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import Link from '~/components/Link'
import FeedDetailDisplay from '~/components/FeedDetailDisplay'
import FeedEntry from '~/components/FeedEntry'
import Teaser from '~/components/Teaser'
import serialization from '~/helpers/serialization'
import getSWCCCardData from '~/helpers/getSWCCCardData'

export default React.memo(function FeedSWCCEntry(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const card = serialization.card.deserialize(cardsIndex, props.winner.id)
  const cardData = getSWCCCardData(cardsIndex, props.winner.id)

  return (
    <FeedEntry icon='hammer' date={props.date}>
      {props.user.name} has won the 🥇{' '}
      <Link to='/swcc'>Stormbound Weekly Card Contest</Link> (season{' '}
      {props.season} week #{props.week}, themed{' '}
      <span className='Highlight'>{props.name}</span>) with a card called{' '}
      <Link to={'/card/' + props.winner.id}>{card.name}</Link>.
      <FeedDetailDisplay label='card'>
        <Teaser
          card={cardData}
          title={cardData.name}
          meta={`Week #${props.id} – ${props.name}`}
          to={`/card/${props.winner.id}/display`}
          excerpt={
            <>
              <strong className='Highlight'>Ability:</strong> {cardData.ability}
            </>
          }
        />
      </FeedDetailDisplay>
    </FeedEntry>
  )
})
