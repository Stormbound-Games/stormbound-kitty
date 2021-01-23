import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id).deck, modifier).map(
    getResolvedCardData
  )

describe('The `MANA_COST_AVERAGE` advice', () => {
  it('should be returned if the deck average cost is above 5.5', () => {
    const cards = getCards('1n701n481n491n501n511n521n531n541n551n561n571n58')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if the deck average cost is below 5.5', () => {
    const cards = getCards('5n15n25w25n35n45n124w34w44w65n285w124w14')
    expect(advice(cards)).to.equal(null)
  })

  it('should be returned if the deck average cost is below 2.8', () => {
    const cards = getCards('1n11n21n31n41n51n61n621n631n671n661n71n8')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if the deck average cost is above 2.8', () => {
    const cards = getCards('5n15n25w25n35n45n124w34w44w65n285w124w14')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if there is a mana brawl modifier', () => {
    const cards = getCards('1n11n21n31n41n51n61n621n631n671n661n71n8')
    expect(advice(cards, 'SPELL_MANA')).to.equal(null)
    expect(advice(cards, 'DWARF_MANA')).to.equal(null)
    expect(advice(cards, 'KNIGHT_MANA')).to.equal(null)
    expect(advice(cards, 'STRUCTURE_MANA')).to.equal(null)
    expect(advice(cards, 'TOAD_MANA')).to.equal(null)
  })
})
