import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialization.deck.deserialize(id), modifier).map(
    getResolvedCardData
  )

describe('The `STRUCTURE` advice', () => {
  it('should be returned if it contains more than 3 structures', () => {
    const cards = getCards('1n31i51n131n231i101n161n591n221n641n601n451n57')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned for structure brawls', () => {
    const cards = getCards('1n31i51n131n231i101n161n591n221n641n601n451n57')
    expect(advice(cards, 'STRUCTURE_MANA')).toEqual(null)
  })

  it('should not be returned if it has 3 structures', () => {
    const cards = getCards('1n11n31i51n131n231n161n591n221n641n601n451n57')
    expect(advice(cards)).toEqual(null)
  })
})
