import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'
import Teaser from '~/components/Teaser'
import Spacing from '~/components/Spacing'
import { getCardData } from '~/components/CardBuilderHallOfFame'
import serialization from '~/helpers/serialization'
import styles from './styles'

export default React.memo(function FeedCardEntry(props) {
  const { css } = useFela()
  const card = serialization.card.deserialize(props.winner.id)
  const cardData = getCardData(props.winner.id)

  return (
    <FeedEntry icon='hammer' date={props.date}>
      {props.winner.author} has won the 🥇{' '}
      <Link to='/card/contest'>Stormbound Weekly Card Contest</Link> (week #
      {props.id}, themed <span className='Highlight'>{props.name}</span>) with a
      card called <Link to={'/card/' + props.winner.id}>{card.name}</Link>.
      <Spacing top='BASE'>
        <div className={css(styles.container)}>
          <Teaser
            card={cardData}
            title={cardData.name}
            meta={`Week #${props.id} – ${props.name}`}
            to={`/card/${props.winner.id}/display`}
            excerpt={
              <>
                <strong className='Highlight'>Ability:</strong>{' '}
                {cardData.ability}
              </>
            }
          />
        </div>
      </Spacing>
    </FeedEntry>
  )
})
