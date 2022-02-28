import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(
    global.__CARDS_INDEX__,
    serialization.deck.deserialize(global.__CARDS_INDEX_BY_SID__, id),
    modifier
  ).map(card => getResolvedCardData(global.__CARDS_INDEX__, card))

describe('The `FREEZE` advice', () => {
  it('should be returned if there are inefficient freeze combos', () => {
    const cards = getCards('1n51n621n631n141n151w41w281n411w171n701n501w19')
    expect(advice(cards)).not.toEqual(null)
  })
})
