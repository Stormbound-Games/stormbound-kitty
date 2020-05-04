import modifyDeck from '../../../src/helpers/modifyDeck'
import getResolvedCardData from '../../../src/helpers/getResolvedCardData'

describe('The `modifyDeck` helper', () => {
  it('should resolve all cards in deck', () => {
    expect(modifyDeck([{ id: 'N1' }])).to.deep.equal([
      getResolvedCardData({ id: 'N1' }),
    ])
  })

  it('should set all cards to level 1 in equals mode', () => {
    expect(modifyDeck([{ id: 'N1', level: 2 }], null, true)).to.deep.equal([
      getResolvedCardData({ id: 'N1', level: 1 }),
    ])
  })
  ;[
    ['STRUCTURE_MANA', 'N13', 2],
    ['TOAD_MANA', 'N52', 2],
    ['KNIGHT_MANA', 'N7', 1],
    ['DWARF_MANA', 'W17', 4],
    ['SPELL_MANA', 'N21', 2],
  ].forEach(([brawl, id, mana]) => {
    it(`should handle ${brawl} brawl`, () => {
      const deck = modifyDeck([{ id }], brawl)
      expect(deck[0].mana).to.equal(mana)
      expect(deck[0].costReduced).to.equal(true)
    })
  })
})
