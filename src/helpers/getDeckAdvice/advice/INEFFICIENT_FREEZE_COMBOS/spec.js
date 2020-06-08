import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `INEFFICIENT_FREEZE_COMBOS` advice', () => {
  it('should be returned if there are inefficient freeze combos', () => {
    const cards = getCards('1n51n621n631n141n151w41w281n411w171n701n501w19')
    expect(advice(cards)).to.not.equal(null)
  })
})
