import modifyDeck from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'

describe('The `modifyDeck` helper', () => {
  it('should resolve all cards in deck', () => {
    expect(modifyDeck(global.__CARDS_INDEX__, [{ id: 'N1' }])).toEqual([
      getResolvedCardData(global.__CARDS_INDEX__, { id: 'N1' }),
    ])
  })

  it('should set all cards to level 1 in equals mode', () => {
    expect(
      modifyDeck(global.__CARDS_INDEX__, [{ id: 'N1', level: 2 }], null, true)
    ).toEqual([
      getResolvedCardData(global.__CARDS_INDEX__, { id: 'N1', level: 1 }),
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
      const deck = modifyDeck(global.__CARDS_INDEX__, [{ id }], brawl)
      expect(deck[0].mana).toEqual(mana)
      expect(deck[0].manaDecreased).toEqual(true)
    })
  })
})
