import canCardBePlayed from './'
import getRawCardData from '~/getRawCardData'

describe('The `canCardBePlayed` helper', () => {
  it('should return false if the card costs too much mana', () => {
    expect(canCardBePlayed(3, getRawCardData('N30'))).to.equal(false)
  })

  it('should return true if the card is within the available mana', () => {
    expect(canCardBePlayed(3, getRawCardData('N1'))).to.equal(true)
  })

  it('should return false if there are no empty cells and the card is not a spell', () => {
    expect(
      canCardBePlayed(3, getRawCardData('N1'), {
        turn: 1,
        emptyCells: false,
      })
    ).to.equal(false)

    expect(
      canCardBePlayed(3, getRawCardData('N13'), {
        turn: 1,
        emptyCells: false,
      })
    ).to.equal(false)
  })

  it('should return true if there are no empty cells and the card is a spell', () => {
    expect(
      canCardBePlayed(3, getRawCardData('N2'), {
        turn: 1,
        emptyCells: false,
      })
    ).to.equal(true)
  })
  ;['F4', 'N15', 'W6', 'I11', 'N40'].forEach(id => {
    const cardData = getRawCardData(id)
    const card = { ...cardData, mana: cardData.mana - 2 }

    it(`should return false if the card is ${cardData.name} and there is no target`, () => {
      expect(canCardBePlayed(4, card, { turn: 1, noUnits: true })).to.equal(
        false
      )
    })

    it(`should return true if the card is ${cardData.name} and there is a target`, () => {
      expect(canCardBePlayed(4, card, { turn: 1, noUnits: false })).to.equal(
        true
      )
    })
  })
})
