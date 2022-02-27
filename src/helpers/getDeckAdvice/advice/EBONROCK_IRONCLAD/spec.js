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

describe('The `UPGRADE_POINT` advice', () => {
  it('should be returned if it contains Fort of Ebonrock and not Upgrade Point', () => {
    const cards = getCards('1i21n31n131n231n161n591n221n641n371n601n501n57')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if it is not an Ironclad deck', () => {
    const cards = getCards('1f21n31n131n231n161n591n221n641n371n601n501n57')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it contains Upgrade Point', () => {
    const cards = getCards('1i21n31n131n231i101n161n591n221n641n371n601n57')
    expect(advice(cards)).toEqual(null)
  })
})
