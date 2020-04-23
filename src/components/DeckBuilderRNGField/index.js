import React from 'react'
import Radio from '../Radio'
import WikiLink from '../WikiLink'
import { FRIENDLY_CHANCES } from '../DeckMechanisms'
import './index.css'

const RNG_SENSITIVE_CARDS = {
  W9: {
    FRIENDLY: () => (
      <>
        <WikiLink id='W9' /> stays
      </>
    ),
    UNFRIENDLY: () => (
      <>
        <WikiLink id='W9' /> gets destroyed
      </>
    ),
  },
  S3: {
    FRIENDLY: () => (
      <>
        <WikiLink id='S3' /> comes back in hand
      </>
    ),
    UNFRIENDLY: () => (
      <>
        <WikiLink id='S3' /> doesn’t come back to hand
      </>
    ),
  },
  W16: {
    FRIENDLY: () => (
      <>
        <WikiLink id='W16' /> hits and stays on the board
      </>
    ),
    UNFRIENDLY: () => (
      <>
        <WikiLink id='W16' /> dies
      </>
    ),
  },
  W8: {
    FRIENDLY: () => (
      <>
        <WikiLink id='W8' /> destroys all the frozen enemies
      </>
    ),
    UNFRIENDLY: () => (
      <>
        <WikiLink id='W8' /> never destroys enemies
      </>
    ),
  },
}

const getRegularText = id => {
  return id === 'W8'
    ? [
        <WikiLink id='W8' />,
        ' has a ' +
          parseInt(FRIENDLY_CHANCES[id] * 100) +
          '% chance to destroy every frozen enemy (of those that can be in a column)',
      ]
    : parseInt(FRIENDLY_CHANCES[id] * 100) +
        '% chance per turn that ' +
        RNG_SENSITIVE_CARDS[id].FRIENDLY()
}

const DeckBuilderRNGField = props => {
  const deckIds = props.deck.map(card => card.id)
  const possibleRNGSensitiveCards = Object.keys(RNG_SENSITIVE_CARDS)
  const RNGSensitiveCards = possibleRNGSensitiveCards.filter(cardId =>
    deckIds.includes(cardId)
  )

  if (!RNGSensitiveCards.length > 0) {
    return null
  }

  return (
    <fieldset>
      <legend>RNG (luck)</legend>
      <Radio
        id='RNG-FRIENDLY'
        name='RNG'
        value='FRIENDLY'
        onChange={event => props.setRNG(event.target.value)}
        checked={props.RNG === 'FRIENDLY'}
        required
      >
        Friendly
        <span className='DeckBuilderRNGField__radio-info'>
          {RNGSensitiveCards.map(cardId => (
            <span key={cardId}>{RNG_SENSITIVE_CARDS[cardId].FRIENDLY()}</span>
          ))}
        </span>
      </Radio>
      <Radio
        id='RNG-UNFRIENDLY'
        name='RNG'
        value='UNFRIENDLY'
        onChange={event => props.setRNG(event.target.value)}
        checked={props.RNG === 'UNFRIENDLY'}
        required
      >
        Unfriendly
        <span className='DeckBuilderRNGField__radio-info'>
          {RNGSensitiveCards.map(cardId => (
            <span key={cardId}>{RNG_SENSITIVE_CARDS[cardId].UNFRIENDLY()}</span>
          ))}
        </span>
      </Radio>
      <Radio
        id='RNG-REGULAR'
        name='RNG'
        value='REGULAR'
        onChange={event => props.setRNG(event.target.value)}
        checked={props.RNG === 'REGULAR'}
        required
      >
        Regular{' '}
        <span className='DeckBuilderRNGField__radio-info'>
          <>
            {RNGSensitiveCards.map(cardId => (
              <span key={cardId}>{getRegularText(cardId)}</span>
            ))}
          </>
        </span>
      </Radio>
    </fieldset>
  )
}

export default DeckBuilderRNGField
