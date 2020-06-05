import canCardBePlayed from '../../components/DeckMechanisms/canCardBePlayed'

export const getUniqueHands = deck => {
  const sequence = [0, 1, 2, 3]
  const sequences = []

  while (sequence[0] <= 8) {
    while (sequence[1] <= 9) {
      while (sequence[2] <= 10) {
        for (let i = sequence[3]; i <= 11; i++) {
          sequence[3] = i
          sequences.push(sequence.slice(0))
        }
        sequence[2]++
        sequence[3] = sequence[2] + 1
      }
      sequence[1]++
      sequence[2] = sequence[1] + 1
      sequence[3] = sequence[2] + 1
    }
    sequence[0]++
    sequence[1] = sequence[0] + 1
    sequence[2] = sequence[1] + 1
    sequence[3] = sequence[2] + 1
  }

  // Resolve the 4 card indices to the actual card objects so we end up with
  // every hand being an array of 4 cards.
  return sequences.map(hand => hand.map(index => deck[index]))
}

export const getEffectiveManaCost = availableMana => card => {
  // If the card is GotW and it can be played, reduced its mana cost by the
  // amount of mana given by its ability.
  if (card.id === 'W19' && availableMana >= 7)
    return 7 - [9, 10, 11, 12, 13][card.level - 1]

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

const getCardToCycle = (availableMana, hand) => {
  const getManaCost = getEffectiveManaCost(availableMana)
  const state = {
    mana: availableMana,
    specifics: { noUnitsOnFirstTurn: true, emptyCellsIndicator: true },
    turn: availableMana - 2,
  }

  return hand.reduce((a, b) => {
    const canABePlayed = canCardBePlayed(state, a)
    const canBBePlayed = canCardBePlayed(state, b)

    if (!canABePlayed && canBBePlayed) return b
    if (canABePlayed && !canBBePlayed) return a

    const costA = getManaCost(a)
    const costB = getManaCost(b)

    if (availableMana === 6) {
      if (a.id === 'W19' && costA > costB) return b
      if (b.id === 'W19' && costB > costA) return a
    }

    return costA > costB ? a : b
  })
}

export const getCycledHands = (deck, hand, availableMana) => {
  const handIds = hand.map(card => card.id)
  const deckCards = deck.filter(card => !handIds.includes(card.id))
  const cycledCard = getCardToCycle(availableMana, hand)

  return deckCards.map(replacement =>
    hand.map(card => (cycledCard.id === card.id ? replacement : card))
  )
}

export const canSpendAllMana = (availableMana, hand) => {
  // To know whether the hand can spend all mana, we compute an array of “mana
  // amounts”. They are all the mana spending possibilities for that hand within
  // the currently available mana.
  const possibleSpentAmounts = getPossibleManaSpent(availableMana)(hand)

  return possibleSpentAmounts.includes(availableMana)
}

export const canPlayAllCards = (availableMana, hand) =>
  getHandCost(availableMana, hand) <= availableMana

export const getHandCost = (availableMana, hand) =>
  hand
    .map(getEffectiveManaCost(availableMana))
    .reduce((total, mana) => total + mana, 0)

const computeDeckChances = (deck, availableMana) => {
  // `hands` are all the combinations of 4 different cards one can have in their
  // hand based on the 12 cards of their deck.
  const hands = getUniqueHands(deck)

  // We compute a score between 0 and the amount of hands (495). This ratio
  // represents the chances of spending all the available mana.
  const handsUsingAllMana = hands
    // For each hand, we return a float that describes how likely it is to spend
    // all the available mana, cycling possibilities included.
    .reduce((total, hand) => {
      // If the hand can spend all of the available mana, we consider it
      // unnecessary to cycle and return `1` (for 1 hand being able to spend all
      // mana).
      if (canSpendAllMana(availableMana, hand)) return total + 1

      // If the hand cannot spend all of the available mana, we need to cycle
      // the most expensive card (which is a decent approximation at this stage)
      // which gives 8 news hands.
      const cycledHands = getCycledHands(deck, hand, availableMana)
      const handsSpendingAllMana = cycledHands.filter(hand =>
        canSpendAllMana(availableMana, hand)
      )

      // We check how many of these hands can spend all of the available mana
      // and return a number between 0 and 1 (0 means no hand could, 1 means
      // they all could).
      return total + handsSpendingAllMana.length / 8
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
      if (getHandCost(availableMana, hand) <= availableMana) return total + 1

      // If the hand cannot play all 4 cards within the available mana, we need
      // to cycle the most expensive card (which is a decent approximation at
      // this stage) which gives 8 news hands.
      const cycledHands = getCycledHands(deck, hand, availableMana)
      const handsPlayingAllCards = cycledHands.filter(hand =>
        canPlayAllCards(availableMana, hand)
      )

      // We check how many of these hands can play all 4 cards within the
      // available mana and return a number between 0 and 1 (0 means no hand
      // could, 1 means they all could).
      return total + handsPlayingAllCards.length / 8
    }, 0)

  return {
    usingAllMana: (handsUsingAllMana / hands.length) * 100,
    playingAllCards: (handsPlayingAllCards / hands.length) * 100,
  }
}

export default computeDeckChances
