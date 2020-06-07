import {
  canPlayAllCards,
  canSpendAllMana,
  getCycledHands,
  getEffectiveManaCost,
  getHandCost,
} from './'
import serialisation from '../serialisation'
import getResolvedCardData from '../getResolvedCardData'

describe('The `getEffectiveManaCost` helper', () => {
  it('should handle Gift of the Wise', () => {
    expect(
      getEffectiveManaCost(6)(getResolvedCardData({ id: 'W19', level: 1 }))
    ).to.equal(7)
    expect(
      getEffectiveManaCost(7)(getResolvedCardData({ id: 'W19', level: 1 }))
    ).to.equal(-2)
  })

  it('should handle Rimelings', () => {
    expect(
      getEffectiveManaCost(4)(getResolvedCardData({ id: 'W12', level: 1 }))
    ).to.equal(5)
    expect(
      getEffectiveManaCost(5)(getResolvedCardData({ id: 'W12', level: 1 }))
    ).to.equal(2)
  })

  it('should return mana cost otherwise', () => {
    expect(
      getEffectiveManaCost(4)(getResolvedCardData({ id: 'N1', level: 1 }))
    ).to.equal(1)
  })
})

describe('The `getCycledHands` helper', () => {
  const deck = serialisation.deck.deserialise(
    '5n15n25w25n35n45n144n185w133w164w153w192n58'
  )
  const hand = deck.slice(0, 3).concat(deck.slice(-1))

  it('should return 8 hands', () => {
    expect(getCycledHands({ deck, hand, availableMana: 5 }).length).to.equal(8)
  })

  it('should cycle the most expensive card', () => {
    const hands = getCycledHands({ deck, hand, availableMana: 5 })

    expect(
      hands.every(hand => !hand.map(card => card.id).includes('N58'))
    ).to.equal(true)
  })

  it('should take effective mana in consideration when cycling', () => {
    const deck = serialisation.deck
      .deserialise('5n15n25w25n35n44n55n144n185w133w164w153w19')
      .map(getResolvedCardData)
    const hand = deck.slice(0, 2).concat(deck.slice(-2))
    const hands = getCycledHands({ deck, hand, availableMana: 7 })

    expect(
      hands.some(hand => hand.map(card => card.id).includes('W19'))
    ).to.equal(true)
  })
})

describe('The `canSpendAllMana` helper', () => {
  const deck = serialisation.deck
    .deserialise('5n15n25w25n35n45n144n185w133w164w153w192n58')
    .map(getResolvedCardData)

  it('should return false if there is too much mana', () => {
    const hand = deck.slice(0, 4)
    expect(canSpendAllMana({ availableMana: 20, hand })).to.equal(false)
  })

  it('should return true if there is not enough mana', () => {
    const hand = deck.slice(0, 4)
    expect(canSpendAllMana({ availableMana: 3, hand })).to.equal(true)
  })

  it('should return true if there is just enough mana', () => {
    const hand = deck.slice(0, 4)
    expect(canSpendAllMana({ availableMana: 6, hand })).to.equal(true)
  })
})

describe('The `canPlayAllCards` helper', () => {
  const deck = serialisation.deck
    .deserialise('5n15n25w25n35n45n144n185w133w164w153w192n58')
    .map(getResolvedCardData)

  it('should return false if there is not enough mana', () => {
    const hand = deck.slice(0, 4)
    expect(canPlayAllCards({ availableMana: 3, hand })).to.equal(false)
  })

  it('should return true if the full hand can be played', () => {
    const hand = deck.slice(0, 4)
    expect(canPlayAllCards({ availableMana: 6, hand })).to.equal(true)
  })
})

describe('The `getHandCost` helper', () => {
  const deck = serialisation.deck
    .deserialise('5n15n25w25n35n44n55n144n185w133w164w153w19')
    .map(getResolvedCardData)

  it('should return the cost of a full hand', () => {
    const hand = deck.slice(0, 4)
    expect(getHandCost({ availableMana: 10, hand })).to.equal(6)
  })

  it('should consider effective mana when computing hand cost', () => {
    const hand = deck.slice(0, 3).concat(deck.slice(-1))
    expect(getHandCost({ availableMana: 10, hand })).to.equal(0)
  })
})
