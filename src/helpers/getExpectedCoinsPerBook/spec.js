import cards from '../../data/cards'
import getExpectedCoinsPerBook from './'

const LEVEL_5_COLLECTION = cards.map(card => ({
  id: card.id,
  level: 5,
  rarity: card.rarity,
}))

const LEVEL_1_COLLECTION = cards.map(card => ({
  id: card.id,
  level: 1,
  rarity: card.rarity,
}))

describe('The `getExpectedCoinsPerBook` helper', () => {
  const COINS = {
    MYTHIC: 544.1428571428569,
    HEROIC: 269.3248847926276,
    CLASSIC: 131.30532361235294,
    NOBLE: 65.65266180617647,
    HUMBLE: 21.88422060205883,
  }

  Object.keys(COINS).forEach(bookType => {
    it(`should return ${COINS[bookType]} coins for a ${bookType} book with a level 5 collection`, () => {
      expect(getExpectedCoinsPerBook(LEVEL_5_COLLECTION, bookType)).to.equal(
        COINS[bookType]
      )
    })
  })

  Object.keys(COINS).forEach(bookType => {
    it(`should return 0 coins for a ${bookType} book with a level 1 collection`, () => {
      expect(getExpectedCoinsPerBook(LEVEL_1_COLLECTION, bookType)).to.equal(0)
    })
  })
})
