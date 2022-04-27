import getResolvedCardData from '~/helpers/getResolvedCardData'
import isCardMatchingCriteria from './'

describe('The `isCardMatchingCriteria` helper', () => {
  it('should handle rarity', () => {
    const isCommon = isCardMatchingCriteria({ rarity: 'common' })

    expect(
      isCommon(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N1' }))
    ).toEqual(false)
    expect(
      isCommon(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N2' }))
    ).toEqual(true)
  })

  it('should handle type', () => {
    const isSpell = isCardMatchingCriteria({ type: 'spell' })

    expect(
      isSpell(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N1' }))
    ).toEqual(false)
    expect(
      isSpell(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N2' }))
    ).toEqual(true)
  })

  it('should handle unit types', () => {
    const isConstruct = isCardMatchingCriteria({ unitType: 'construct' })

    expect(
      isConstruct(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N1' }))
    ).toEqual(true)
    expect(
      isConstruct(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N2' }))
    ).toEqual(false)

    const isElder = isCardMatchingCriteria({ unitType: 'elder' })

    expect(
      isElder(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N1' }))
    ).toEqual(false)
    expect(
      isElder(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N70' }))
    ).toEqual(true)
  })

  it('should handle ability', () => {
    const hasAbility = isCardMatchingCriteria({ ability: 'a Knight with' })

    expect(
      hasAbility(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N1' }))
    ).toEqual(false)
    expect(
      hasAbility(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N2' }))
    ).toEqual(true)
    expect(
      hasAbility(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N3' }))
    ).toEqual(false)
  })

  it('should handle name', () => {
    const isTemple = isCardMatchingCriteria({ name: 'Temple' })

    expect(
      isTemple(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N1' }))
    ).toEqual(false)
    expect(
      isTemple(getResolvedCardData(global.__CARDS_INDEX__, { id: 'S29' }))
    ).toEqual(true)
  })

  it('should handle mix', () => {
    const isRareConstruct = isCardMatchingCriteria({
      rarity: 'rare',
      unitType: 'construct',
    })

    expect(
      isRareConstruct(getResolvedCardData(global.__CARDS_INDEX__, { id: 'N1' }))
    ).toEqual(true)
    expect(
      isRareConstruct(getResolvedCardData(global.__CARDS_INDEX__, { id: 'I6' }))
    ).toEqual(false)
  })
})
