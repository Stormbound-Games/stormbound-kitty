import {
  canPlayAllCards,
  canSpendAllMana,
  getCycledHands,
  getEffectiveManaCost,
  getHandCost,
} from './'
import serialisation from '~/helpers/serialisation'
import getResolvedCardData from '~/helpers/getResolvedCardData'

describe('The `getEffectiveManaCost` helper', () => {
  it('should handle Gift of the Wise', () => {
    expect(
      getEffectiveManaCost(7)(getResolvedCardData({ id: 'W19', level: 1 }))
    ).toEqual(8)
    expect(
      getEffectiveManaCost(8)(getResolvedCardData({ id: 'W19', level: 1 }))
    ).toEqual(-1)
  })

  it('should handle Rimelings', () => {
    expect(
      getEffectiveManaCost(4)(getResolvedCardData({ id: 'W12', level: 1 }))
    ).toEqual(5)
    expect(
      getEffectiveManaCost(5)(getResolvedCardData({ id: 'W12', level: 1 }))
    ).toEqual(2)
  })

  it('should return mana cost otherwise', () => {
    expect(
      getEffectiveManaCost(4)(getResolvedCardData({ id: 'N1', level: 1 }))
    ).toEqual(1)
  })
})

describe('The `getCycledHands` helper', () => {
  const deck = serialisation.deck.deserialise(
    '5n15n25w25n35n45n144n185w133w164w153w192n58'
  )
  const hand = deck.slice(0, 3).concat(deck.slice(-1))

  it('should return 8 hands', () => {
    expect(getCycledHands({ deck, hand, availableMana: 5 }).length).toEqual(8)
  })

  it('should cycle the most expensive card', () => {
    const hands = getCycledHands({ deck, hand, availableMana: 5 })

    expect(
      hands.every(hand => !hand.map(card => card.id).includes('N58'))
    ).toEqual(true)
  })

  it('should take effective mana in consideration when cycling', () => {
    const deck = serialisation.deck
      .deserialise('5n15n25w25n35n44n55n144n185w133w164w153w19')
      .map(getResolvedCardData)
    const hand = deck.slice(0, 2).concat(deck.slice(-2))
    const hands = getCycledHands({ deck, hand, availableMana: 7 })

    expect(
      hands.some(hand => hand.map(card => card.id).includes('W19'))
    ).toEqual(true)
  })
})

describe('The `canSpendAllMana` helper', () => {
  const deck = serialisation.deck
    .deserialise('5n15n25w25n35n45n144n185w133w164w153w192n58')
    .map(getResolvedCardData)

  it('should return false if there is too much mana', () => {
    const hand = deck.slice(0, 4)
    expect(canSpendAllMana({ availableMana: 20, hand })).toEqual(false)
  })

  it('should return true if there is not enough mana', () => {
    const hand = deck.slice(0, 4)
    expect(canSpendAllMana({ availableMana: 3, hand })).toEqual(true)
  })

  it('should return true if there is just enough mana', () => {
    const hand = deck.slice(0, 4)
    expect(canSpendAllMana({ availableMana: 6, hand })).toEqual(true)
  })
})

describe('The `canPlayAllCards` helper', () => {
  const deck = serialisation.deck
    .deserialise('5n15n25w25n35n45n144n185w133w164w153w192n58')
    .map(getResolvedCardData)

  it('should return false if there is not enough mana', () => {
    const hand = deck.slice(0, 4)
    expect(canPlayAllCards({ availableMana: 3, hand })).toEqual(false)
  })

  it('should return true if the full hand can be played', () => {
    const hand = deck.slice(0, 4)
    expect(canPlayAllCards({ availableMana: 6, hand })).toEqual(true)
  })
})

describe('The `getHandCost` helper', () => {
  const deck = serialisation.deck
    .deserialise('5n15n25w25n35n44n55n144n185w133w164w153w19')
    .map(getResolvedCardData)

  it('should return the cost of a full hand', () => {
    const hand = deck.slice(0, 4)
    expect(getHandCost({ availableMana: 10, hand })).toEqual(6)
  })

  it('should consider effective mana when computing hand cost', () => {
    const hand = deck.slice(0, 3).concat(deck.slice(-1))
    expect(getHandCost({ availableMana: 11, hand })).toEqual(1)
  })
})
