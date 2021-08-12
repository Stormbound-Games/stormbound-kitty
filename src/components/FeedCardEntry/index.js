import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import FeedEntry from '../FeedEntry'
import Teaser from '../Teaser'
import Spacing from '../Spacing'
import { getCardData } from '../CardBuilderHallOfFame'
import serialisation from '../../helpers/serialisation'
import styles from './styles'

export default React.memo(function FeedCardEntry(props) {
  const { css } = useFela()
  const card = serialisation.card.deserialise(props.winner.id)
  const cardData = getCardData(props.winner.id)

  return (
    <FeedEntry icon='wand' date={props.date}>
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
