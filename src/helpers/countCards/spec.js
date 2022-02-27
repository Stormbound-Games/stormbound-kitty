import CARDS from '~/data/cards'
import countCards from './'

// I’m not sure how to stub the cards array at the moment.
describe.skip('The `countCards` helper', () => {
  it('should handle rarity count + fusion stones', () => {
    expect(countCards({ rarity: 'common' })).toEqual(
      CARDS.filter(card => card.rarity === 'common').length + 1
    )
    expect(countCards({ rarity: 'rare' })).toEqual(
      CARDS.filter(card => card.rarity === 'rare').length + 1
    )
    expect(countCards({ rarity: 'epic' })).toEqual(
      CARDS.filter(card => card.rarity === 'epic').length + 1
    )
    expect(countCards({ rarity: 'legendary' })).toEqual(
      CARDS.filter(card => card.rarity === 'legendary').length + 1
    )
  })

  it('should handle race count + fusion stones', () => {
    expect(countCards({ race: 'feline' })).toEqual(
      CARDS.filter(card => card.race === 'feline').length + 1
    )
  })

  it('should handle elder count + fusion stones', () => {
    expect(countCards({ elder: true })).toEqual(
      CARDS.filter(card => card.elder).length + 1
    )
  })

  it('should handle mix count + fusion stones', () => {
    expect(countCards({ rarity: 'epic', race: 'feline' })).toEqual(
      CARDS.filter(card => card.rarity === 'epic' && card.race === 'feline')
        .length + 1
    )
  })
})
