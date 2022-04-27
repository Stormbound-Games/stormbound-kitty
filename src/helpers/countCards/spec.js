import countCards from './'

describe('The `countCards` helper', () => {
  it('should handle rarity count + fusion stones', () => {
    expect(countCards(global.__CARDS__, { rarity: 'common' })).toEqual(
      global.__CARDS__.filter(card => card.rarity === 'common').length + 1
    )
    expect(countCards(global.__CARDS__, { rarity: 'rare' })).toEqual(
      global.__CARDS__.filter(card => card.rarity === 'rare').length + 1
    )
    expect(countCards(global.__CARDS__, { rarity: 'epic' })).toEqual(
      global.__CARDS__.filter(card => card.rarity === 'epic').length + 1
    )
    expect(countCards(global.__CARDS__, { rarity: 'legendary' })).toEqual(
      global.__CARDS__.filter(card => card.rarity === 'legendary').length + 1
    )
  })

  it('should handle unit type count + fusion stones', () => {
    expect(countCards(global.__CARDS__, { unitType: 'feline' })).toEqual(
      global.__CARDS__.filter(card => card.unitTypes.includes('feline'))
        .length + 1
    )
  })

  it('should handle mix count + fusion stones', () => {
    expect(
      countCards(global.__CARDS__, { rarity: 'epic', unitType: 'feline' })
    ).toEqual(
      global.__CARDS__.filter(
        card => card.rarity === 'epic' && card.unitTypes.includes('feline')
      ).length + 1
    )
  })
})
