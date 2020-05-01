import React from 'react'
import Card from '../Card'
import isCard from '../../helpers/isCard'
import './index.css'

export default React.memo(function DryRunnerCard(props) {
  const cardData = props.deck.find(isCard(props.card))
  const isActive = isCard(props.activeCard)(cardData)

  if (!cardData) return null

  return (
    <div
      className={[
        'DryRunnerHand__wrapper',
        isActive && 'DryRunnerHand__wrapper--active',
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
          {isActive ? 'Unselect card' : 'Select card'}
        </span>
      </button>
      <Card
        {...cardData}
        missing={!!props.activeCard && !isActive}
        affordable={props.canCardBePlayed(props.card)}
      />
    </div>
  )
})
