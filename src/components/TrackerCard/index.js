import React from 'react'
import Card from '../Card'
import { STATUSES } from '../../constants/tracker'
import './index.css'

export default React.memo(function TrackerCard(props) {
  const cardData = props.deck.find(card => card.id === props.card)

  if (!cardData) return null

  return (
    <div
      className={[
        'TrackerCard',
        props.activeCard === cardData.id && 'TrackerCard--active',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        className='TrackerCard__button'
        type='button'
        disabled={
          ![
            STATUSES.PLAYING,
            STATUSES.PLAYING_FIRST_MUTINEER,
            STATUSES.PLAYING_GOLDGRUBBERS_REMOVING,
            STATUSES.PLAYING_ARCHDRUID_EARYN,
          ].includes(props.status) ||
          (props.status === STATUSES.PLAYING_FIRST_MUTINEER &&
            cardData.race === 'pirate') ||
          (props.status === STATUSES.PLAYING_GOLDGRUBBERS_REMOVING &&
            cardData.race === 'pirate') ||
          (props.status === STATUSES.PLAYING_ARCHDRUID_EARYN &&
            cardData.type !== 'spell')
        }
        onClick={() => props.selectCard(cardData.id)}
      >
        <span className='VisuallyHidden'>
          {props.activeCard === cardData.id ? 'Unselect card' : 'Select card'}
        </span>
      </button>
      <Card
        {...cardData}
        missing={!!props.activeCard && props.activeCard !== cardData.id}
        affordable={
          props.status === STATUSES.PLAYING &&
          props.canCardBePlayed(cardData.id)
        }
      />
    </div>
  )
})
