import { convertToSkId } from './'
import CARDS from '~/data/cards'

describe('The `convertToSkId` helper', () => {
  const cards = CARDS.filter(card => card.sid).slice(0, 12)
  const blob = '4' + cards.map(card => card.sid).join('')
  console.log(blob)
  const deckId =
    '1x' +
    cards
      .map(card => card.id)
      .join('')
      .toLowerCase()

  it('should properly convert a deck ID', () => {
    expect(convertToSkId(blob)).toEqual(deckId)
  })
})
