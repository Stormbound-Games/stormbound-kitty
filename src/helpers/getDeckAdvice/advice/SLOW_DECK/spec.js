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

describe('The `SLOW_DECK` advice', () => {
  it('should be returned if a deck has over 6 static cards', () => {
    const cards = getCards('4n382s195n131n702n232n625n194n345n32s34s13s14')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if a deck has under 7 static cards', () => {
    const cards = getCards('5n15n25w25n35n45n124w34w44w65n285w124w14')
    expect(advice(cards)).toEqual(null)
  })
})
