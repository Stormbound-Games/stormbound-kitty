import advice, { POISON_CONSUMERS } from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import modifyDeck from '~/helpers/modifyDeck'
import toSentence from '~/helpers/toSentence'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(
    global.__CARDS_INDEX__,
    serialization.deck.deserialize(global.__CARDS_INDEX_BY_SID__, id),
    modifier
  ).map(card => getResolvedCardData(global.__CARDS_INDEX__, card))

describe('The `POISON` advice', () => {
  const names = toSentence(
    POISON_CONSUMERS.map(id => global.__CARDS_INDEX__[id]).map(
      card => card.name
    ),
    'or'
  )

  it(`should not be returned if it doesn’t contain ${names}`, () => {
    const cards = getCards('5n15f44f15f35n35n44n55n125n164f105f145n30')
    expect(advice(cards, null, global.__CARDS_INDEX__)).toEqual(null)
  })

  POISON_CONSUMERS.forEach(id => {
    const { name } = global.__CARDS_INDEX__[id]

    it(`should be returned if it has a lonely ${name}`, () => {
      const cards = getCards(`1n571f61n651n221n471n641n361f271n491n731n59${id}`)
      expect(advice(cards, null, global.__CARDS_INDEX__)).not.toEqual(null)
    })

    it(`should not be returned if it has ${name} and a poison provider`, () => {
      const cards = getCards(`1n571f41n651n221n471n641n361f271n491n731n59${id}`)
      expect(advice(cards, null, global.__CARDS_INDEX__)).toEqual(null)
    })
  })
})
