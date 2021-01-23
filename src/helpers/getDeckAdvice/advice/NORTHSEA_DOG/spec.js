import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id).deck, modifier).map(
    getResolvedCardData
  )

describe('The `NORTHSEA_DOG` advice', () => {
  it('should be returned the average mana is too high', () => {
    const cards = getCards('1n11n21i21n31n41n51n61n621n631n141n571n58')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if the average mana is deemed alright', () => {
    const cards = getCards('1n11n21i21n31n41n51n61n621n631i51n141i8')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if the deck includes Frozen Core', () => {
    const cards = getCards('1n11n21n31n41n51n61n621n631n141w91w211w23')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if the deck includes Gift of the Wise', () => {
    const cards = getCards('1n11n21n31n41n51n621n631n141w141w191w211w23')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if the deck includes First Mutineer', () => {
    const cards = getCards('1n11n21n31n41n51n621n631n121n141w141w211w23')
    expect(advice(cards)).to.equal(null)
  })
})
