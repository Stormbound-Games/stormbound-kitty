import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialisation from '~/helpers/serialisation'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `MANA_CONSUMERS` advice', () => {
  it('should be returned if it contains Lady Rime and Visions of the Grove', () => {
    const cards = getCards('1n11w21n141n611n161n411n331n351n381w101n681w21')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should be returned if it contains Lady Rime', () => {
    const cards = getCards('1n11n21w21n141n611n161n411n331n351n381w101n68')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if it contains Gift of the Wise and Frozen Core', () => {
    const cards = getCards('1n11n21w21n31n141w91n331n351n381w101n681w19')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if it contains only Frozen Core', () => {
    const cards = getCards('1n11n21w21n31n621n141w91n331n351n381w101n68')
    expect(advice(cards)).not.toEqual(null)
  })
})
