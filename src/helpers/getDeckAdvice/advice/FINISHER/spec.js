import advice, {
  DEBATABLE_FINISHERS,
  STABLE_FINISHERS,
  LOW_LEVEL_FINISHERS,
  HIGH_LEVEL_FINISHERS,
} from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(
    global.__CARDS_INDEX__,
    serialization.deck.deserialize(global.__CARDS_INDEX_BY_SID__, id),
    modifier
  ).map(card => getResolvedCardData(global.__CARDS_INDEX__, card))

describe('The `FINISHER` advice', () => {
  STABLE_FINISHERS.forEach(id => {
    it(`should consider ${global.__CARDS_INDEX__[id].name} a finisher`, () => {
      const cards = getCards(`1n11n21n31n41n51n61n621n71n81n101n111${id}`)
      expect(advice(cards)).toEqual(null)
    })
  })

  LOW_LEVEL_FINISHERS.forEach(id => {
    const { name } = global.__CARDS_INDEX__[id]

    it(`should consider ${name} a finisher at low level`, () => {
      const cards = getCards(`1n11n21n31n41n51n61n621n71n81n101n111${id}`)
      expect(advice(cards)).toEqual(null)
    })

    it(`should not consider ${name} a finisher at high level`, () => {
      const cards = getCards(`1n11n21n31n41n51n61n621n71n81n101n115${id}`)
      expect(advice(cards)).not.toEqual(null)
    })
  })

  HIGH_LEVEL_FINISHERS.forEach(id => {
    const { name } = global.__CARDS_INDEX__[id]

    it(`should consider ${name} a finisher at high level`, () => {
      const cards = getCards(`1n11n21n31n41n51n61n621n71n81n101n115${id}`)
      expect(advice(cards)).toEqual(null)
    })

    it(`should not consider ${name} a finisher at low level`, () => {
      const cards = getCards(`1n11n21n31n41n51n61n621n71n81n101n111${id}`)
      expect(advice(cards)).not.toEqual(null)
    })
  })

  DEBATABLE_FINISHERS.forEach(id => {
    const { name } = global.__CARDS_INDEX__[id]

    it(`should consider ${name} a debatable finisher`, () => {
      const cards = getCards(`1n11n21n31n41n51n61n621n71n81n101n111${id}`)
      expect(advice(cards).description).toContain('potential')
    })
  })
})
