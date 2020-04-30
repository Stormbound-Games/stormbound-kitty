import React from 'react'
import Card from '../Card'
import isCard from '../../helpers/isCard'
import './index.css'

export default React.memo(function DryRunnerCard(props) {
  const cardData = props.deck.find(isCard(props.card))

  if (!cardData) return null

  return (
    <div
      className={[
        'DryRunnerHand__wrapper',
        isCard(props.activeCard)(props.card) &&
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
          {isCard(props.activeCard)(cardData) ? 'Unselect card' : 'Select card'}
        </span>
      </button>
      <Card
        {...cardData}
        missing={!!props.activeCard && !isCard(props.activeCard)(cardData)}
        affordable={props.canCardBePlayed(props.card)}
      />
    </div>
  )
})
