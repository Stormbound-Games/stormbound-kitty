import React from 'react'
import Card from '../Card'
import Column from '../Column'
import Row from '../Row'
import chunk from '../../helpers/chunk'
import arrayPad from '../../helpers/arrayPad'
import './index.css'

const DryRunnerCard = props => {
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
        missing={
          !!props.activeCard &&
          props.activeCard !== cardData.id &&
          'DryRunnerHand__wrapper--inactive'
        }
        affordable={props.canCardBePlayed(cardData.id)}
      />
    </div>
  )
}

const DryRunnerHand = props => {
  const hand = props.hand.slice(0)
  const paddedHand = arrayPad(hand, 4, null, +1)

  return (
    <Row data-testid='hand' desktopOnly>
      {chunk(paddedHand, 2).map(([cardA, cardB], index) => {
        return (
          <Column key={cardA || index}>
            <Row>
              <Column>
                <DryRunnerCard {...props} card={cardA} />
              </Column>
              <Column>
                <DryRunnerCard {...props} card={cardB} />
              </Column>
            </Row>
          </Column>
        )
      })}
    </Row>
  )
}

export default DryRunnerHand
