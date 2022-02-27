import canCardBePlayed from './'

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
  ;['F4', 'N15', 'W6', 'I11', 'N40'].forEach(id => {
    const cardData = global.__CARDS_INDEX__[id]
    const card = { ...cardData, mana: cardData.mana - 2 }

    it(`should return false if the card is ${cardData.name} and there is no target`, () => {
      expect(canCardBePlayed(4, card, { turn: 1, noUnits: true })).toEqual(
        false
      )
    })

    it(`should return true if the card is ${cardData.name} and there is a target`, () => {
      expect(canCardBePlayed(4, card, { turn: 1, noUnits: false })).toEqual(
        true
      )
    })
  })
})
