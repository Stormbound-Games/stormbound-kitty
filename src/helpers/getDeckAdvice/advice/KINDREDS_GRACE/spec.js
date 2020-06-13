import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import getRawCardData from '../../../getRawCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'
import { SPAWNS } from './index'

const SPAWNS_ARRAY = Object.entries(SPAWNS)
const BASE_DECKS = {
  dragon: '4n14n34n43n63n103f273n173n243n254n283n40',
  knight: '4n14n34n43n63n103f273n173n243n254n283n40',
  satyr: '4n14n34n43n63n103f273n173n243n254n283n40',
  construct: '4n14n34n43n63n103f273n173n243n254n283n40',
  raven: '4n14n34n43n63n103f273n173n243n254n283n40',
  toad: '4n14n34n43n63n103n243n254n283n404n523n53',
}

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `KINDREDS_GRACE` advice', () => {
  it('should be returned if too many races are represented', () => {
    const cards = getCards('1n11n21f31n31n41n51n621n631n81n111n131n40')
    expect(advice(cards)).to.not.equal(null)
  })

  SPAWNS_ARRAY.forEach(spawnCard => {
    const cardId = spawnCard[0]
    const race = spawnCard[1][0]
    const testDeck = BASE_DECKS[race] + '1' + cardId.toLowerCase()

    it(
      'should not be returned if the deck contains ' +
        getRawCardData(cardId).name,
      () => {
        const cards = getCards(testDeck)
        expect(advice(cards)).to.equal(null)
      }
    )
  })

  it('should not be returned if the deck enough units of the same race are represented', () => {
    const cards = getCards('1n11i11n51n81n111i81i61n241i271i161i211n40')
    expect(advice(cards)).to.equal(null)
  })
})
