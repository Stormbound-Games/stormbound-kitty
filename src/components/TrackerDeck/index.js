import React from 'react'
import Deck from '../Deck'
import { STATUSES } from '../../constants/tracker'

export default function TrackerDeck(props) {
  const isDeckCardDisabled = React.useCallback(
    card => {
      if (props.status === STATUSES.PLAYING_QUEEN_OF_HERDS) {
        return card.race !== 'satyr'
      }

      return props.hand.includes(card.id) || !!props.removeAllowance
    },
    [props.hand, props.removeAllowance, props.status]
  )

  const highlightedCards = React.useMemo(
    () =>
      props.deck
        .filter(card => !props.hand.includes(card.id))
        .map(card => card.id),
    [props.deck, props.hand]
  )

  const displayDeck = React.useMemo(() => {
    const sum = props.deck.map(card => card.weight).reduce((a, b) => a + b, 0)

    return props.deck.map(card => {
      const chance = ((card.weight / sum) * 100).toFixed(2)
      const name = `${card.name} ${
        props.hand.includes(card.id)
          ? '(in hand)'
          : props.untouchedCards.includes(card.id)
          ? '(?)'
          : `(${chance}%)`
      }`

      return { ...card, name }
    })
  }, [props.deck, props.hand, props.untouchedCards])

  // Display order should be:
  // 1. Untouched cards in natural order
  // 2. Probability high to low
  // 3. Cards from hand in natural order
  const sortDeckByProbability = React.useCallback(
    (a, b) => {
      const isAInHand = props.hand.includes(a.id)
      const isBInHand = props.hand.includes(b.id)

      // If card A isn’t in hand, but card B is, put A first
      if (!isAInHand && isBInHand) return -1

      // If card A is in hand, but card B isn’t, put B first
      if (isAInHand && !isBInHand) return +1

      // If both cards are in hand, use usual comparison
      if (isAInHand && isBInHand) {
        if (+a.mana > +b.mana) return +1
        if (+a.mana < +b.mana) return -1
        if (a.name > b.name) return +1
        if (a.name < b.name) return -1
      }

      const hasABeenTouched = !props.untouchedCards.includes(a.id)
      const hasBBeenTouched = !props.untouchedCards.includes(b.id)

      // If card A has not been touched yet, but card B has, put B first
      if (!hasABeenTouched && hasBBeenTouched) return +1
      // If card A has been touched yet, but card B hasn’t, put A first
      if (hasABeenTouched && !hasBBeenTouched) return -1

      // If none of the cards have been touched yet, use usual comparison
      if (!hasABeenTouched && !hasBBeenTouched) {
        if (+a.mana > +b.mana) return +1
        if (+a.mana < +b.mana) return -1
        if (a.name > b.name) return +1
        if (a.name < b.name) return -1
      }

      // Otherwise compare by probability
      const sum = props.deck.map(card => card.weight).reduce((a, b) => a + b, 0)
      const chanceA = (a.weight / sum) * 100
      const chanceB = (b.weight / sum) * 100

      if (chanceA > chanceB) return -1
      if (chanceA < chanceB) return +1

      return 0
    },
    [props.deck, props.hand, props.untouchedCards]
  )

  return (
    <Deck
      deck={displayDeck}
      sort={sortDeckByProbability}
      highlightedCards={highlightedCards}
      onClick={props.onDeckCardClick}
      isCardDisabled={isDeckCardDisabled}
    />
  )
}
