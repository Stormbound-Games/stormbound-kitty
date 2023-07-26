import canCardBePlayed from './index.js'

describe('The `canCardBePlayed` helper', () => {
  it('should return false if the card costs too much mana', () => {
    expect(canCardBePlayed(3, global.__CARDS_INDEX__.N30)).toEqual(false)
  })

  it('should return true if the card is within the available mana', () => {
    expect(canCardBePlayed(3, global.__CARDS_INDEX__.N1)).toEqual(true)
  })

  it('should return false if there are no empty cells and the card is not a spell', () => {
    expect(
      canCardBePlayed(3, global.__CARDS_INDEX__.N1, {
        turn: 1,
        emptyCells: false,
      })
    ).toEqual(false)

    expect(
      canCardBePlayed(3, global.__CARDS_INDEX__.N13, {
        turn: 1,
        emptyCells: false,
      })
    ).toEqual(false)
  })

  it('should return true if there are no empty cells and the card is a spell', () => {
    expect(
      canCardBePlayed(3, global.__CARDS_INDEX__.N2, {
        turn: 1,
        emptyCells: false,
      })
    ).toEqual(true)
  })

  // Tests for spells needing an enemy target
  ;['N9', 'N63', 'S10', 'W1', 'F4', 'N94'].forEach(id => {
    const cardData = global.__CARDS_INDEX__[id]

    it(`should return false if the card is ${cardData.name} and turn is 1`, () => {
      expect(canCardBePlayed(4, cardData, { turn: 1 })).toEqual(false)
    })
  })

  // Tests for spells needing a friendly target
  ;['N100', 'N105'].forEach(id => {
    const cardData = global.__CARDS_INDEX__[id]

    it(`should return false if the card is ${cardData.name} and there are no friendly units at turn 1`, () => {
      expect(canCardBePlayed(4, cardData, { turn: 1, noUnits: true })).toEqual(
        false
      )
    })

    it(`should return true if the card is ${cardData.name} and there are friendly units at turn 1`, () => {
      expect(canCardBePlayed(4, cardData, { turn: 1, noUnits: false })).toEqual(
        true
      )
    })
  })

  // Tests for spells needing a friendly target in Eye of the Tempest Brawl
  ;['W6', 'I11', 'N40', 'N15', 'N98'].forEach(id => {
    const cardData = global.__CARDS_INDEX__[id]
    const card = { ...cardData, mana: cardData.mana - 2 }
    const state = { turn: 1, modifier: 'SPELL_MANA' }

    it(`should return false if the card is ${cardData.name} and there is no target in Eye of the Tempest Brawl`, () => {
      expect(canCardBePlayed(4, card, { ...state, noUnits: true })).toEqual(
        false
      )
    })

    it(`should return true if the card is ${cardData.name} and there is a target in Eye of the Tempest Brawl`, () => {
      expect(canCardBePlayed(4, card, { ...state, noUnits: false })).toEqual(
        true
      )
    })
  })

  // Tests for spells needing an enemy target in Eye of the Tempest Brawl
  ;['N21', 'I18', 'F11', 'F22'].forEach(id => {
    const cardData = global.__CARDS_INDEX__[id]
    const card = { ...cardData, mana: cardData.mana - 2 }
    const state = { turn: 1, modifier: 'SPELL_MANA' }

    it(`should return false if the card is ${cardData.name} in Eye of the Tempest Brawl`, () => {
      expect(canCardBePlayed(4, card, state)).toEqual(false)
    })
  })
})
