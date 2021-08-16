import advice, {
  DEBATABLE_FINISHERS,
  STABLE_FINISHERS,
  LOW_LEVEL_FINISHERS,
  HIGH_LEVEL_FINISHERS,
} from './'
import getResolvedCardData from '~/getResolvedCardData'
import serialisation from '~/serialisation'
import modifyDeck from '~/modifyDeck'
import getRawCardData from '~/getRawCardData'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `FINISHER` advice', () => {
  STABLE_FINISHERS.forEach(id => {
    it(`should consider ${getRawCardData(id).name} a finisher`, () => {
      const cards = getCards(`1n11n21n31n41n51n61n621n71n81n101n111${id}`)
      expect(advice(cards)).to.equal(null)
    })
  })

  LOW_LEVEL_FINISHERS.forEach(id => {
    const { name } = getRawCardData(id)

    it(`should consider ${name} a finisher at low level`, () => {
      const cards = getCards(`1n11n21n31n41n51n61n621n71n81n101n111${id}`)
      expect(advice(cards)).to.equal(null)
    })

    it(`should not consider ${name} a finisher at high level`, () => {
      const cards = getCards(`1n11n21n31n41n51n61n621n71n81n101n115${id}`)
      expect(advice(cards)).to.not.equal(null)
    })
  })

  HIGH_LEVEL_FINISHERS.forEach(id => {
    const { name } = getRawCardData(id)

    it(`should consider ${name} a finisher at high level`, () => {
      const cards = getCards(`1n11n21n31n41n51n61n621n71n81n101n115${id}`)
      expect(advice(cards)).to.equal(null)
    })

    it(`should not consider ${name} a finisher at low level`, () => {
      const cards = getCards(`1n11n21n31n41n51n61n621n71n81n101n111${id}`)
      expect(advice(cards)).to.not.equal(null)
    })
  })

  DEBATABLE_FINISHERS.forEach(id => {
    const { name } = getRawCardData(id)

    it(`should consider ${name} a debatable finisher`, () => {
      const cards = getCards(`1n11n21n31n41n51n61n621n71n81n101n111${id}`)
      expect(advice(cards).description).to.contain('potential')
    })
  })
})
