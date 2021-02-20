import cards from '../../data/cards'
import countCards from './'

describe('The `countCards` helper', () => {
  it('should handle rarity count + fusion stones', () => {
    expect(countCards({ rarity: 'common' })).to.equal(
      cards.filter(card => card.rarity === 'common').length + 1
    )
    expect(countCards({ rarity: 'rare' })).to.equal(
      cards.filter(card => card.rarity === 'rare').length + 1
    )
    expect(countCards({ rarity: 'epic' })).to.equal(
      cards.filter(card => card.rarity === 'epic').length + 1
    )
    expect(countCards({ rarity: 'legendary' })).to.equal(
      cards.filter(card => card.rarity === 'legendary').length + 1
    )
  })

  it('should handle race count + fusion stones', () => {
    expect(countCards({ race: 'feline' })).to.equal(
      cards.filter(card => card.race === 'feline').length + 1
    )
  })

  it('should handle elder count + fusion stones', () => {
    expect(countCards({ elder: true })).to.equal(
      cards.filter(card => card.elder).length + 1
    )
  })

  it('should handle mix count + fusion stones', () => {
    expect(countCards({ rarity: 'epic', race: 'feline' })).to.equal(
      cards.filter(card => card.rarity === 'epic' && card.race === 'feline')
        .length + 1
    )
  })
})
