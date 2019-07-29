import React, { Fragment } from 'react'
import Radio from '../Radio'
import WikiLink from '../WikiLink'
import './index.css'

const RNG_SENSITIVE_CARDS = {
  W9: {
    FRIENDLY: () => (
      <Fragment>
        <WikiLink id="W9" /> stays
      </Fragment>
    ),
    UNFRIENDLY: () => (
      <Fragment>
        <WikiLink id="W9" /> gets destroyed
      </Fragment>
    )
  },
  S3: {
    FRIENDLY: () => (
      <Fragment>
        <WikiLink id="S3" /> comes back in hand
      </Fragment>
    ),
    UNFRIENDLY: () => (
      <Fragment>
        <WikiLink id="S3" /> doesn’t come back to hand
      </Fragment>
    )
  },
  W16: {
    FRIENDLY: () => (
      <Fragment>
        <WikiLink id="W16" /> hits
      </Fragment>
    ),
    UNFRIENDLY: () => (
      <Fragment>
        <WikiLink id="W16" /> dies
      </Fragment>
    )
  }
}

const DBRNGField = props => {
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
        id="RNG-FRIENDLY"
        name="RNG"
        value="FRIENDLY"
        onChange={event => props.setRNG(event.target.value)}
        checked={props.RNG === 'FRIENDLY'}
        required
      >
        Friendly
        <span className="DBRNGField__radio-info">
          {RNGSensitiveCards.map(cardId => (
            <span key={cardId}>{RNG_SENSITIVE_CARDS[cardId].FRIENDLY()}</span>
          ))}
        </span>
      </Radio>
      <Radio
        id="RNG-UNFRIENDLY"
        name="RNG"
        value="UNFRIENDLY"
        onChange={event => props.setRNG(event.target.value)}
        checked={props.RNG === 'UNFRIENDLY'}
        required
      >
        Unfriendly
        <span className="DBRNGField__radio-info">
          {RNGSensitiveCards.map(cardId => (
            <span key={cardId}>{RNG_SENSITIVE_CARDS[cardId].UNFRIENDLY()}</span>
          ))}
        </span>
      </Radio>
      <Radio
        id="RNG-REGULAR"
        name="RNG"
        value="REGULAR"
        onChange={event => props.setRNG(event.target.value)}
        checked={props.RNG === 'REGULAR'}
        required
      >
        Regular{' '}
        <span className="DBRNGField__radio-info">
          {RNGSensitiveCards.length === 1 ? (
            <Fragment>
              50% chance per turn that{' '}
              {RNG_SENSITIVE_CARDS[RNGSensitiveCards[0]].FRIENDLY()}
            </Fragment>
          ) : (
            <Fragment>
              50% chance per turn that:
              {RNGSensitiveCards.map(cardId => (
                <span key={cardId}>
                  {RNG_SENSITIVE_CARDS[cardId].FRIENDLY()}
                </span>
              ))}
            </Fragment>
          )}
        </span>
      </Radio>
    </fieldset>
  )
}

export default DBRNGField
