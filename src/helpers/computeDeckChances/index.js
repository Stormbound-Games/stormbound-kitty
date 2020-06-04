const getUniqueHands = () => {
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

  return sequences
}

const UNIQUE_HANDS = getUniqueHands()

const getEffectiveManaCost = mana => card => {
  // If the card is GotW and it can be played, reduced its mana cost by the
  // amount of mana given by its ability.
  if (card.id === 'W19' && mana >= 7)
    return 7 - [9, 10, 11, 12, 13][card.level - 1]

  // If the card is Rimelings and it can be played, reduced its mana cost by
  // the amount of mana given by its ability.
  if (card.id === 'W12' && mana >= 5) return 2

  return card.mana
}

const getPossibleManaSpent = mana => cards => {
  const [A, B, C, D] = cards.map(getEffectiveManaCost(mana))

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

const sum = sequence => sequence.reduce((acc, value) => acc + value, 0)

const computeDeckChances = (deck, mana) => {
  const getCardAtIndex = index => deck[index]

  // `UNIQUE_HANDS` are all the combinations of 4 different cards one can have
  // in their hand based on the 12 cards of their deck. A “hand” is an array of
  // 4 numbers from 0 to 11 (the index of the card in the deck).
  const handsUsingAllMana = UNIQUE_HANDS.map(hand =>
    // For each hand, we resolve the 4 card indices to the actual card
    // objects so we end up with every hand being an array of 4 cards.
    hand.map(getCardAtIndex)
  )
    // Then, we map every hand of 4 cards to an array of “mana amounts”. Mana
    // amounts are all the mana spending possibilities for that hand within the
    // currently available mana. So it is an array of mana amounts that can be
    // spent for that hand and that mana.
    .map(getPossibleManaSpent(mana))
    // Then, we keep only the hands which contain a mana amount which exactly
    // matches the available mana. These are the hands that spent all of the
    // available mana.
    .filter(amounts => amounts.includes(mana))

  // `UNIQUE_HANDS` are all the combinations of 4 different cards one can have
  // in their hand based on the 12 cards of their deck. A “hand” is an array of
  // 4 numbers from 0 to 11 (the index of the card in the deck).
  const handsPlayingAllCards = UNIQUE_HANDS.map(hand =>
    hand
      // For each hand, we resolve the 4 card indices to the actual card
      // objects so we end up with every hand being an array of 4 cards.
      .map(getCardAtIndex)
      // Then, we resolve the effective mana cost of each card composing the
      // hand. This is to take into account cards giving mana such as Gift of
      // the Wise or Rimelings. Their effective mana cost varies from their
      // official mana cost based on whether or not they can be played within
      // the available mana.
      .map(getEffectiveManaCost(mana))
  )
    // Then, for each hand, we compute its total mana cost by adding the effect-
    // ive mana cost of every card composing it.
    .map(sum)
    // Finally, we preserve only the hands with a total cost within the
    // available mana. These are the hands that can play all cards.
    .filter(handCost => handCost <= mana)

  return {
    usingAllMana: (handsUsingAllMana.length / UNIQUE_HANDS.length) * 100,
    playingAllCards: (handsPlayingAllCards.length / UNIQUE_HANDS.length) * 100,
  }
}

export default computeDeckChances
