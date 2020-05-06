import cards from '../../data/cards'
import countCardsForRarity from './'

describe('The `countCardsForRarity` helper', () => {
  it('should return the amount of common cards + 1', () => {
    expect(countCardsForRarity('common')).to.equal(
      cards.filter(card => card.rarity === 'common').length + 1
    )
  })

  it('should return the amount of rare cards + 1', () => {
    expect(countCardsForRarity('rare')).to.equal(
      cards.filter(card => card.rarity === 'rare').length + 1
    )
  })

  it('should return the amount of epic cards + 1', () => {
    expect(countCardsForRarity('epic')).to.equal(
      cards.filter(card => card.rarity === 'epic').length + 1
    )
  })

  it('should return the amount of legendary cards + 1', () => {
    expect(countCardsForRarity('legendary')).to.equal(
      cards.filter(card => card.rarity === 'legendary').length + 1
    )
  })
})
