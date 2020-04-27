import React from 'react'
import Card from '../Card'
import './index.css'

const DryRunnerCard = React.memo(props => {
  const cardData = props.deck.find(card => card.id === props.card)

  if (!cardData) return null

  return (
    <div
      className={[
        'DryRunnerHand__wrapper',
        props.activeCard === cardData.id && 'DryRunnerHand__wrapper--active',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        className='DryRunnerHand__button'
        type='button'
        onClick={() => props.selectCard(cardData.id)}
      >
        <span className='VisuallyHidden'>
          {props.activeCard === cardData.id ? 'Unselect card' : 'Select card'}
        </span>
      </button>
      <Card
        {...cardData}
        missing={!!props.activeCard && props.activeCard !== cardData.id}
        affordable={props.canCardBePlayed(cardData.id)}
      />
    </div>
  )
})

export default DryRunnerCard
