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

describe('The `MANA_CONSUMERS` advice', () => {
  it('should be returned if it contains Lady Rime and Visions of the Grove', () => {
    const cards = getCards('1n11w21n141n611n161n411n331n351n381w101n681w21')
    expect(advice(cards, null, global.__CARDS_INDEX__)).not.toEqual(null)
  })

  it('should be returned if it contains Lady Rime', () => {
    const cards = getCards('1n11n21w21n141n611n161n411n331n351n381w101n68')
    expect(advice(cards, null, global.__CARDS_INDEX__)).not.toEqual(null)
  })

  it('should not be returned if it contains Gift of the Wise and Frozen Core', () => {
    const cards = getCards('1n11n21w21n31n141w91n331n351n381w101n681w19')
    expect(advice(cards, null, global.__CARDS_INDEX__)).toEqual(null)
  })

  it('should be returned if it contains only Frozen Core', () => {
    const cards = getCards('1n11n21w21n31n621n141w91n331n351n381w101n68')
    expect(advice(cards, null, global.__CARDS_INDEX__)).not.toEqual(null)
  })
})
