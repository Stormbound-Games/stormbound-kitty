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

describe('The `MANA_CURVE` advice', () => {
  it('should be returned if the mana curve is deemed to high', () => {
    const cards = getCards('5n185n195n595n205n215n225n755n415n645n245n715n65')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if the mana curve is deemed alright', () => {
    const cards = getCards('5n15n25w25n35n45n124w34w44w65n285w124w14')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if the deck average level is below 2.5', () => {
    const cards = getCards('1n11i11i61i81n151i111i131n211i141i161i211i22')
    expect(advice(cards)).toEqual(null)
  })
})
