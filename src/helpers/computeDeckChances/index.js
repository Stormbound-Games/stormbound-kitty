import canCardBePlayed from '../../components/DeckMechanisms/canCardBePlayed'
import getCombinations from '../getCombinations'

export const getEffectiveManaCost = availableMana => card => {
  // If the card is GotW and it can be played, reduced its mana cost by the
  // amount of mana given by its ability.
  if (card.id === 'W19' && availableMana >= card.mana)
    return card.mana - [9, 10, 11, 12, 13][card.level - 1]

  // If the card is Rimelings and it can be played, reduced its mana cost by
  // the amount of mana given by its ability.
  if (card.id === 'W12' && availableMana >= 5) return 2

  return card.mana
}

const getPossibleManaSpent = availableMana => cards => {
  const [A, B, C, D] = cards.map(getEffectiveManaCost(availableMana))

  return [
    A,
    A + B,
    A + C,
    A + D,
    A + B + C,
    A + B + D,
    A + C + D,
    A + B + C + D,
    B,
    B + C,
    B + D,
    B + C + D,
    C,
    C + D,
    D,
  ]
}

export const getCycledHands = ({ deck, hand, cycledCard }) => {
  const handIds = hand.map(card => card.id)
  const deckCards = deck.filter(card => !handIds.includes(card.id))

  return deckCards.map(replacement =>
    hand.map(card => (cycledCard.id === card.id ? replacement : card))
  )
}

export const canSpendAllMana = ({ availableMana, hand }) => {
  // To know whether the hand can spend all mana, we compute an array of “mana
  // amounts”. They are all the mana spending possibilities for that hand within
  // the currently available mana.
  const possibleSpentAmounts = getPossibleManaSpent(availableMana)(hand)

  return possibleSpentAmounts.includes(availableMana)
}

export const canPlayAllCards = ({ availableMana, hand }) =>
  getHandCost({ availableMana, hand }) <= availableMana

export const getHandCost = ({ availableMana, hand }) => {
  const getManaCost = getEffectiveManaCost(availableMana)

  return hand.map(getManaCost).reduce((total, mana) => total + mana, 0)
}

const canUseAllMana = ({ availableMana, hand, deckCards, cycled }) => {
  const handIds = hand.map(card => card.id)

  // If there is no more available mana, or the hand can spend all the available
  // mana, or the hand contains a playable Lady Rime, consider the hand to be
  // able to spend all mana.
  if (
    availableMana === 0 ||
    canSpendAllMana({ availableMana, hand }) ||
    (availableMana >= 6 && handIds.includes('W10'))
  ) {
    return 1
  }

  // If the hand hasn’t cycled yet, try cycling every card of the hand
  // individually to get the best outcome.
  if (!cycled) {
    return hand
      .map(card => getCycledHands({ deck: deckCards, hand, cycledCard: card }))
      .reduce((best, hands) => {
        const chance = hands.reduce((total, cycledHand) => {
          const options = {
            availableMana,
            hand: cycledHand,
            deckCards: deckCards.filter(card => !cycledHand.includes(card)),
            cycled: true,
          }

          return total + canUseAllMana(options) / hands.length
        }, 0)

        return Math.max(chance, best)
      }, 0)
  }

  if (handIds.includes('N14')) {
    const chance = deckCards.reduce((total, deckCard) => {
      const newHand = hand.map(card => (card.id === 'N14' ? deckCard : card))
      const newMana = availableMana - 3
      const options = {
        availableMana: newMana,
        hand: newHand,
        deckCards: deckCards.filter(card => !newHand.includes(card)),
        cycled,
      }

      return total + canUseAllMana(options) / deckCards.length
    }, 0)

    return chance >= 0.66 ? chance : 0
  }

  return 0
}

const computeDeckChances = (deck, availableMana) => {
  // `hands` are all the combinations of 4 different cards one can have in their
  // hand based on the 12 cards of their deck.
  const hands = getCombinations(deck, 4)

  // We compute a score between 0 and the amount of hands (495). This ratio
  // represents the chances of spending all the available mana.
  const handsUsingAllMana = hands
    // For each hand, we return a float that describes how likely it is to spend
    // all the available mana, cycling possibilities included.
    .reduce((total, hand) => {
      return (
        total +
        canUseAllMana({ availableMana, hand, deckCards: deck, cycled: false })
      )
    }, 0)

  // We compute a score between 0 and the amount of hands (495). This ratio
  // represents the chances of playing all 4 cards within the available mana.
  const handsPlayingAllCards = hands
    // For each hand, we return a float that describes how likely it is to play
    // all 4 cards within the available mana, cycling possibilities included.
    .reduce((total, hand) => {
      // If the hand can play all 4 cards within the available mana, we consider
      // it unnecessary to cycle and return `1` (for 1 hand being able to play
      // all 4 cards).
      if (canPlayAllCards({ availableMana, hand })) return total + 1

      // If the hand cannot play all 4 cards within the available mana, we need
      // to cycle. We try cycling all 4 cards individually and keep the best
      // option.
      const cycledHands = hand.map(card => {
        const deckCards = deck.filter(card => !hand.includes(card))

        return getCycledHands({ deck: deckCards, hand, cycledCard: card })
      })

      return (
        total +
        cycledHands.reduce((best, hands) => {
          const handsPlayingAllCards = hands.filter(hand =>
            canPlayAllCards({ availableMana, hand })
          )

          return Math.max(handsPlayingAllCards.length / hands.length, best)
        }, 0)
      )
    }, 0)

  return {
    usingAllMana: (handsUsingAllMana / hands.length) * 100,
    playingAllCards: (handsPlayingAllCards / hands.length) * 100,
  }
}

export default computeDeckChances
