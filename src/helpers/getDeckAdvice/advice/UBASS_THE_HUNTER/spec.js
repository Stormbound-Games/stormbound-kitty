import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialisation from '~/helpers/serialisation'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `UBASS_THE_HUNTER` advice', () => {
  it('should not be returned if it doesn’t have Ubass', () => {
    const cards = getCards('1n11n21n31n41n51n61n621n71n81n101n111n12')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has at least 5 triggers', () => {
    const cards = getCards('1n11n21n31n41n51n61n621n71n81n101n111n35')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if it has at less than 5 triggers', () => {
    const cards = getCards('1n21n31n71n121n141n161n221n641n241n271n281n35')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should count another hero as a trigger', () => {
    const cards = getCards('1n21n31n71n81n121n141n221n641n241n271n281n35')
    expect(advice(cards)).toEqual(null)
  })

  it('should count an elder as a trigger', () => {
    const cards = getCards('1n21n31n71n121n141n731n221n641n241n271n281n35')
    expect(advice(cards)).toEqual(null)
  })
})
