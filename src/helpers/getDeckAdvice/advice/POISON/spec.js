import advice, { POISON_CONSUMERS } from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import getRawCardData from '~/helpers/getRawCardData'
import serialisation from '~/helpers/serialisation'
import modifyDeck from '~/helpers/modifyDeck'
import toSentence from '~/helpers/toSentence'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `POISON` advice', () => {
  const names = toSentence(
    POISON_CONSUMERS.map(getRawCardData).map(card => card.name),
    'or'
  )

  it(`should not be returned if it doesn’t contain ${names}`, () => {
    const cards = getCards('5n15f44f15f35n35n44n55n125n164f105f145n30')
    expect(advice(cards)).to.equal(null)
  })

  POISON_CONSUMERS.forEach(id => {
    const { name } = getRawCardData(id)

    it(`should be returned if it has a lonely ${name}`, () => {
      const cards = getCards(`1n571f61n651n221n471n641n361f271n491n731n59${id}`)
      expect(advice(cards)).to.not.equal(null)
    })

    it(`should not be returned if it has ${name} and a poison provider`, () => {
      const cards = getCards(`1n571f41n651n221n471n641n361f271n491n731n59${id}`)
      expect(advice(cards)).to.equal(null)
    })
  })
})
