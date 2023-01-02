import React from 'react'
import { useFela } from 'react-fela'
import Label from '#components/Label'
import Radio from '#components/Radio'
import CardLink from '#components/CardLink'
import { FRIENDLY_CHANCES } from '#constants/dryRunner'
import styles from './styles'
import useIsMounted from '#hooks/useIsMounted'

// prettier-ignore
const RNG_SENSITIVE_CARDS = {
  S3: {
    FRIENDLY: () => <><CardLink id='S3' /> comes back in hand</>,
    UNFRIENDLY: () => <><CardLink id='S3' /> doesn’t come back to hand</>,
    REGULAR: () => <>{parseInt(FRIENDLY_CHANCES.S3 * 100)}% chance per turn that <CardLink id='S3' /> comes back in hand</>
  },
  I29: {
    FRIENDLY: () => <><CardLink id='I29' /> comes back in hand</>,
    UNFRIENDLY: () => <><CardLink id='I29' /> doesn’t come back to hand</>,
    REGULAR: () => <>{parseInt(FRIENDLY_CHANCES.I29 * 100)}% chance per turn that <CardLink id='I29' /> comes back in hand</>
  },
  W9: {
    FRIENDLY: () => <><CardLink id='W9' /> stays</>,
    UNFRIENDLY: () => <><CardLink id='W9' /> gets destroyed</>,
    REGULAR: () => <>{parseInt(FRIENDLY_CHANCES.W9 * 100)}% chance per turn that <CardLink id='W9' /> stays</>,
  },
  W16: {
    FRIENDLY: () => <><CardLink id='W16' /> hits and stays on the board</>,
    UNFRIENDLY: () => <><CardLink id='W16' /> dies</>,
    REGULAR: () => <>{parseInt(FRIENDLY_CHANCES.W16 * 100)}% chance per turn that <CardLink id='W16' /> hits and stays on the board</>,
  },
  W33: {
    FRIENDLY: () => <><CardLink id='W33' /> stays on the board</>,
    UNFRIENDLY: () => <><CardLink id='W33' /> dies</>,
    REGULAR: () => <>{parseInt(FRIENDLY_CHANCES.W33 * 100)}% chance per turn that <CardLink id='W33' /> stays on the board</>,
  },
  N77: {
    FRIENDLY: () => <><CardLink id='N77' /> creates strong card copies</>,
    UNFRIENDLY: () => <><CardLink id='N77' /> creates weak card copies</>,
    REGULAR: () => <><CardLink id='N77' /> creates average card copies</>,
  },
  N38: {
    FRIENDLY: () => <><CardLink id='N38' /> often create strong copies</>,
    UNFRIENDLY: () => <>When <CardLink id='N38' /> manage to create a copy, it’s generally weak</>,
    REGULAR: () => <><CardLink id='N38' /> sometimes create an average copy</>,
  },
  N106: {
    FRIENDLY: () => <>The opponent never plays <CardLink id='N106' /></>,
    REGULAR: () => <>The opponent rarely plays <CardLink id='N106' /></>,
    UNFRIENDLY: () => <>The opponent often plays <CardLink id='N106' /></>,
  }
}

export default React.memo(function DryRunnerRNGField(props) {
  const { css } = useFela()
  const isMounted = useIsMounted()
  const deckIds = props.deck.map(card => card.id)
  const opponentDeckIds = props.opponentDeck.map(card => card.id)
  const possibleRNGSensitiveCards = Object.keys(RNG_SENSITIVE_CARDS)
  const RNGSensitiveCards = possibleRNGSensitiveCards.filter(
    cardId =>
      deckIds.includes(cardId) ||
      // We check whether we’re mounted to check the opponent deck otherwise we
      // may have a rendering mismatch if the server contains N106, but the
      // client doesn’t (or the opposite) — since the opponent deck is redrawn
      // on mount.
      (isMounted && cardId === 'N106' && opponentDeckIds.includes(cardId))
  )

  // The RNG settings need to be displayed if:
  // - Some RNG-sensitive cards are in the deck.
  // - Some RNG-sensitive freeze-related cards are in the deck.
  const freezeCards = ['W2', 'W6', 'W11']
  const hasFreezeCards = deckIds.find(id => freezeCards.includes(id))

  if (RNGSensitiveCards.length === 0 && !hasFreezeCards) {
    return null
  }

  return (
    <fieldset data-testid='rng-settings'>
      <Label as='legend'>RNG (luck)</Label>
      <Radio
        id='RNG-FRIENDLY'
        name='RNG'
        value='FRIENDLY'
        onChange={event => props.setRNG(event.target.value)}
        checked={props.RNG === 'FRIENDLY'}
        data-testid='RNG-input'
        required
      >
        <span className={css(styles.info)}>Friendly</span>
        {hasFreezeCards ? (
          <span className={css(styles.infoInner)}>
            Freeze cards manage to freeze many enemies
          </span>
        ) : null}
        {RNGSensitiveCards.map(cardId => (
          <span key={cardId} className={css(styles.infoInner)}>
            {RNG_SENSITIVE_CARDS[cardId].FRIENDLY()}
          </span>
        ))}
      </Radio>
      <Radio
        id='RNG-UNFRIENDLY'
        name='RNG'
        value='UNFRIENDLY'
        onChange={event => props.setRNG(event.target.value)}
        checked={props.RNG === 'UNFRIENDLY'}
        data-testid='RNG-input'
        required
      >
        <span className={css(styles.info)}>Unfriendly</span>
        {hasFreezeCards ? (
          <span className={css(styles.infoInner)}>
            Freeze cards do not manage to freeze many enemies
          </span>
        ) : null}
        {RNGSensitiveCards.map(cardId => (
          <span key={cardId} className={css(styles.infoInner)}>
            {RNG_SENSITIVE_CARDS[cardId].UNFRIENDLY()}
          </span>
        ))}
      </Radio>
      <Radio
        id='RNG-REGULAR'
        name='RNG'
        value='REGULAR'
        onChange={event => props.setRNG(event.target.value)}
        checked={props.RNG === 'REGULAR'}
        data-testid='RNG-input'
        required
      >
        <span className={css(styles.info)}>Regular </span>
        <>
          {hasFreezeCards ? (
            <span className={css(styles.infoInner)}>
              Freeze cards manage to freeze a few enemies
            </span>
          ) : null}
          {RNGSensitiveCards.map(cardId => (
            <span key={cardId} className={css(styles.infoInner)}>
              {RNG_SENSITIVE_CARDS[cardId].REGULAR()}
            </span>
          ))}
        </>
      </Radio>
    </fieldset>
  )
})
