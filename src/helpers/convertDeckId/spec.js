import { convertToSkId } from './'
import { base64Encode } from '~/helpers/base64'
import CARDS from '~/data/cards'

describe('The `convertToSkId` helper', () => {
  const cards = CARDS.filter(card => card.sid).slice(0, 12)
  const blob = '4' + cards.map(card => card.sid).join('')
  const hash = base64Encode(blob)
  const deckId =
    '1x' +
    cards
      .map(card => card.id)
      .join('')
      .toLowerCase()

  it('should properly convert a deck ID', () => {
    expect(convertToSkId(global.__CARDS_INDEX_BY_SID__, hash)).toEqual(deckId)
  })
})
