import getResolvedCardData from '~/helpers/getResolvedCardData'
import isCardMatchingCriteria from './'

describe('The `isCardMatchingCriteria` helper', () => {
  it('should handle rarity', () => {
    const isCommon = isCardMatchingCriteria({ rarity: 'common' })

    expect(isCommon(getResolvedCardData({ id: 'N1' }))).to.equal(false)
    expect(isCommon(getResolvedCardData({ id: 'N2' }))).to.equal(true)
  })

  it('should handle type', () => {
    const isSpell = isCardMatchingCriteria({ type: 'spell' })

    expect(isSpell(getResolvedCardData({ id: 'N1' }))).to.equal(false)
    expect(isSpell(getResolvedCardData({ id: 'N2' }))).to.equal(true)
  })

  it('should handle race', () => {
    const isConstruct = isCardMatchingCriteria({ race: 'construct' })

    expect(isConstruct(getResolvedCardData({ id: 'N1' }))).to.equal(true)
    expect(isConstruct(getResolvedCardData({ id: 'N2' }))).to.equal(false)
  })

  it('should handle elder', () => {
    const isElder = isCardMatchingCriteria({ elder: true })

    expect(isElder(getResolvedCardData({ id: 'N1' }))).to.equal(false)
    expect(isElder(getResolvedCardData({ id: 'N70' }))).to.equal(true)
  })

  it('should handle ability', () => {
    const isElder = isCardMatchingCriteria({ ability: /a Knight with/ })

    expect(isElder(getResolvedCardData({ id: 'N1' }))).to.equal(false)
    expect(isElder(getResolvedCardData({ id: 'N2' }))).to.equal(true)
    expect(isElder(getResolvedCardData({ id: 'N3' }))).to.equal(false)
  })

  it('should handle mix', () => {
    const isRareConstruct = isCardMatchingCriteria({
      rarity: 'rare',
      race: 'construct',
    })

    expect(isRareConstruct(getResolvedCardData({ id: 'N1' }))).to.equal(true)
    expect(isRareConstruct(getResolvedCardData({ id: 'I6' }))).to.equal(false)
  })
})
