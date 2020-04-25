import React from 'react'
import Card from '../Card'
import Column from '../Column'
import Row from '../Row'
import './index.css'

const DryRunnerHand = props => {
  const { activeCard } = props

  return (
    <Row data-testid='hand'>
      {props.hand.map(cardId => {
        const cardData = props.deck.find(card => card.id === cardId)

        return (
          <Column key={cardId} width={25} style={{ flexGrow: 0 }}>
            <div
              className={[
                'DryRunnerHand__wrapper',
                activeCard === cardId && 'DryRunnerHand__wrapper--active',
                !!activeCard &&
                  activeCard !== cardId &&
                  'DryRunnerHand__wrapper--inactive',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <button
                className='DryRunnerHand__button'
                type='button'
                onClick={() => props.selectCard(cardId)}
              >
                <span className='VisuallyHidden'>
                  {activeCard === cardId ? 'Unselect card' : 'Select card'}
                </span>
              </button>
              <Card {...cardData} affordable={props.canCardBePlayed(cardId)} />
            </div>
          </Column>
        )
      })}
    </Row>
  )
}

export default DryRunnerHand
