import cards from '../../../src/data/cards'
import getExpectedCoinsPerBook from '../../../src/helpers/getExpectedCoinsPerBook'

const LEVEL_5_COLLECTION = cards.map(card => ({
  id: card.id,
  level: 5,
  rarity: card.rarity,
}))

describe('The `getExpectedCoinsPerBook` helper', () => {
  const COINS = {
    MYTHIC: 544.1428571428569,
    HEROIC: 269.3248847926276,
    CLASSIC: 131.4678443420378,
    NOBLE: 65.73392217101892,
    HUMBLE: 21.911307390339648,
  }

  Object.keys(COINS).forEach(bookType => {
    it(`should return ${COINS[bookType]} coins for a ${bookType} book with a level 5 collection`, () => {
      expect(getExpectedCoinsPerBook(LEVEL_5_COLLECTION, bookType)).to.equal(
        COINS[bookType]
      )
    })
  })
})
