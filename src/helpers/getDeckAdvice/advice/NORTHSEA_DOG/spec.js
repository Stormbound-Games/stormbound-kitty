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

describe('The `NORTHSEA_DOG` advice', () => {
  it('should be returned the average mana is too high', () => {
    const cards = getCards('1n11n21i21n31n41n51n61n621n631n141n571n58')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if the average mana is deemed alright', () => {
    const cards = getCards('1n11n21i21n31n41n51n61n621n631i51n141i8')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if the deck includes Frozen Core', () => {
    const cards = getCards('1n11n21n31n41n51n61n621n631n141w91w211w23')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if the deck includes Gift of the Wise', () => {
    const cards = getCards('1n11n21n31n41n51n621n631n141w141w191w211w23')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if the deck includes First Mutineer', () => {
    const cards = getCards('1n11n21n31n41n51n621n631n121n141w141w211w23')
    expect(advice(cards)).toEqual(null)
  })
})
