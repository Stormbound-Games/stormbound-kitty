import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialisation from '~/helpers/serialisation'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `UPGRADE_POINT` advice', () => {
  it('should be returned if it contains Fort of Ebonrock and not Upgrade Point', () => {
    const cards = getCards('1i21n31n131n231n161n591n221n641n371n601n501n57')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if it is not an Ironclad deck', () => {
    const cards = getCards('1f21n31n131n231n161n591n221n641n371n601n501n57')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if it contains Upgrade Point', () => {
    const cards = getCards('1i21n31n131n231i101n161n591n221n641n371n601n57')
    expect(advice(cards)).to.equal(null)
  })
})
