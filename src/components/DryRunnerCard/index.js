import React from 'react'
import Card from '../Card'
import areCardsEqual from '../../helpers/areCardsEqual'
import './index.css'

export default React.memo(function DryRunnerCard(props) {
  const cardData = props.deck.find(deckCard =>
    areCardsEqual(props.card, deckCard)
  )

  if (!cardData) return null

  return (
    <div
      className={[
        'DryRunnerHand__wrapper',
        areCardsEqual(props.activeCard, props.card) &&
          'DryRunnerHand__wrapper--active',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        className='DryRunnerHand__button'
        type='button'
        onClick={() => props.selectCard(props.card)}
      >
        <span className='VisuallyHidden'>
          {areCardsEqual(props.activeCard, cardData)
            ? 'Unselect card'
            : 'Select card'}
        </span>
      </button>
      <Card
        {...cardData}
        missing={
          !!props.activeCard && !areCardsEqual(props.activeCard, cardData)
        }
        affordable={props.canCardBePlayed(props.card)}
      />
    </div>
  )
})
