import advice, { SPAWNS } from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import modifyDeck from '~/helpers/modifyDeck'

const SPAWNS_ARRAY = Object.keys(SPAWNS)
const BASE_DECKS = {
  dragon: '4n14n34n43n63n103f273n173n243n254n283n40',
  knight: '4n14n34n43n63n103f273n173n243n254n283n40',
  satyr: '4n14n34n43n63n103f273n173n243n254n283n40',
  construct: '4n14n34n43n63n103f273n173n243n254n283n40',
  raven: '4n14n34n43n63n103f273n173n243n254n283n40',
  toad: '4n14n34n43n63n103n243n254n283n404n523n53',
}

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(
    global.__CARDS_INDEX__,
    serialization.deck.deserialize(global.__CARDS_INDEX_BY_SID__, id),
    modifier
  ).map(card => getResolvedCardData(global.__CARDS_INDEX__, card))

describe('The `KINDREDS_GRACE` advice', () => {
  it('should be returned if too many races are represented', () => {
    const cards = getCards('1n11n21f31n31n41n51n621n631n81n111n131n40')
    expect(advice(cards)).not.toEqual(null)
  })

  SPAWNS_ARRAY.forEach(cardId => {
    const race = SPAWNS[cardId][0]
    const testDeck = BASE_DECKS[race] + '1' + cardId.toLowerCase()

    it(
      'should not be returned if the deck contains ' +
        global.__CARDS_INDEX__[cardId].name,
      () => {
        const cards = getCards(testDeck)
        expect(advice(cards)).toEqual(null)
      }
    )
  })

  it('should not be returned if the deck enough units of the same race are represented', () => {
    const cards = getCards('1n11i11n51n81n111i81i61n241i271i161i211n40')
    expect(advice(cards)).toEqual(null)
  })
})
