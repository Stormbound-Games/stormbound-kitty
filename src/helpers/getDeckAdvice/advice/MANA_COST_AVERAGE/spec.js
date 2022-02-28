import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(
    global.__CARDS_INDEX__,
    serialization.deck.deserialize(global.__CARDS_INDEX_BY_SID__, id),
    modifier
  ).map(card => getResolvedCardData(global.__CARDS_INDEX__, card))

describe('The `MANA_COST_AVERAGE` advice', () => {
  it('should be returned if the deck average cost is above 5.5', () => {
    const cards = getCards('1n701n481n491n501n511n521n531n541n551n561n571n58')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if the deck average cost is below 5.5', () => {
    const cards = getCards('5n15n25w25n35n45n124w34w44w65n285w124w14')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if the deck average cost is below 2.8', () => {
    const cards = getCards('1n11n21n31n41n51n61n621n631n671n661n71n8')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if the deck average cost is above 2.8', () => {
    const cards = getCards('5n15n25w25n35n45n124w34w44w65n285w124w14')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if there is a mana brawl modifier', () => {
    const cards = getCards('1n11n21n31n41n51n61n621n631n671n661n71n8')
    expect(advice(cards, 'SPELL_MANA')).toEqual(null)
    expect(advice(cards, 'DWARF_MANA')).toEqual(null)
    expect(advice(cards, 'KNIGHT_MANA')).toEqual(null)
    expect(advice(cards, 'STRUCTURE_MANA')).toEqual(null)
    expect(advice(cards, 'TOAD_MANA')).toEqual(null)
  })
})
