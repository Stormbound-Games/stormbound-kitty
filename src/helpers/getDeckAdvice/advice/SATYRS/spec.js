import advice, { SATYR_CONSUMERS } from './'
import getResolvedCardData from '../../../getResolvedCardData'
import getRawCardData from '../../../getRawCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'
import toSentence from '../../../toSentence'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id).deck, modifier).map(
    getResolvedCardData
  )

describe('The `SATYRS` advice', () => {
  const names = toSentence(
    SATYR_CONSUMERS.map(getRawCardData).map(card => card.name),
    'or'
  )
  it(`should not be returned if it doesn’t contain ${names}`, () => {
    const cards = getCards('5n15n35s245n65n675s65s85n165s165s285s205s21')
    expect(advice(cards)).to.equal(null)
  })

  SATYR_CONSUMERS.forEach(id => {
    const { name } = getRawCardData(id)

    it(`should be returned if it has a lonely ${name}`, () => {
      const cards = getCards(`5n15n35s245n65n675s65s85n165s285s205s21${id}`)
      expect(advice(cards)).to.not.equal(null)
    })

    it(`should not be returned if it has ${name} and other satyrs`, () => {
      const cards = getCards(`5n11s15n35s241n41s25s65s85s285s205s21${id}`)
      expect(advice(cards)).to.equal(null)
    })
  })

  it('should be returned if there are inefficient satyr combos', () => {
    const cards = getCards('1s241n621n101n111n611s71n191n641n241n351n721n53')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should count Head Start as a satyr', () => {
    const cards = getCards('1s11s241s51n611s251s71n191n241n251n351n721n53')
    expect(advice(cards)).to.equal(null)
  })
})
