import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialization.deck.deserialize(id), modifier).map(
    getResolvedCardData
  )

describe('The `FREEZE` advice', () => {
  it('should be returned if there are inefficient freeze combos', () => {
    const cards = getCards('1n51n621n631n141n151w41w281n411w171n701n501w19')
    expect(advice(cards)).not.toEqual(null)
  })
})
