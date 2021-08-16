import advice from './'
import getResolvedCardData from '~/getResolvedCardData'
import serialisation from '~/serialisation'
import modifyDeck from '~/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `ARCHDRUID_EARYN` advice', () => {
  it('should not be returned if it doesn’t have Earyn', () => {
    const cards = getCards('5n11n25n35n44n51n61n621n631n671n665n125n16')
    expect(advice(cards)).to.equal(null)
  })

  it('should be returned if there are less than 3 spells for Earyn level 3', () => {
    const cards = getCards('5n11n25n35n44n51n61n621n631n671n665n123n48')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if there are 3 or more spells for Earyn level 3', () => {
    const cards = getCards('5n11n25n35n44n51n61n621n631n675n121n231n48')
    expect(advice(cards)).to.equal(null)
  })

  it('should be returned if there are less than 4 spells for Earyn level 4', () => {
    const cards = getCards('5n11n25n35n44n51n61n621n631n671n665n124n48')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if there are 4 or more spells for Earyn level 4', () => {
    const cards = getCards('5n11n25n35n44n51n61n621n631n671n234n154n48')
    expect(advice(cards)).to.equal(null)
  })
})
