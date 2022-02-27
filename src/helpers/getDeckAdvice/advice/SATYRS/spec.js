import advice, { SATYR_CONSUMERS } from './'
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

describe('The `SATYRS` advice', () => {
  const names = toSentence(
    SATYR_CONSUMERS.map(id => global.__CARDS_INDEX__[id]).map(
      card => card.name
    ),
    'or'
  )
  it(`should not be returned if it doesn’t contain ${names}`, () => {
    const cards = getCards('5n15n35s245n65n675s65s85n165s165s285s205s21')
    expect(advice(cards, null, global.__CARDS_INDEX__)).toEqual(null)
  })

  SATYR_CONSUMERS.forEach(id => {
    const { name } = global.__CARDS_INDEX__[id]

    it(`should be returned if it has a lonely ${name}`, () => {
      const cards = getCards(`5n15n35s245n65n675s65s85n165s285s205s21${id}`)
      expect(advice(cards, null, global.__CARDS_INDEX__)).not.toEqual(null)
    })

    it(`should not be returned if it has ${name} and other satyrs`, () => {
      const cards = getCards(`5n11s15n35s241n41s25s65s85s285s205s21${id}`)
      expect(advice(cards, null, global.__CARDS_INDEX__)).toEqual(null)
    })
  })

  it('should be returned if there are inefficient satyr combos', () => {
    const cards = getCards('1s241n621n101n111n611s71n191n641n241n351n721n53')
    expect(advice(cards, null, global.__CARDS_INDEX__)).not.toEqual(null)
  })

  it('should count Head Start as a satyr', () => {
    const cards = getCards('1s11s241s51n611s251s71n191n241n251n351n721n53')
    expect(advice(cards, null, global.__CARDS_INDEX__)).toEqual(null)
  })
})
