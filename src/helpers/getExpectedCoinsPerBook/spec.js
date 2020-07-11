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
    MYTHIC: 544.7272727272723,
    HEROIC: 269.42228739002974,
    CLASSIC: 131.32480413183325,
    NOBLE: 65.66240206591672,
    HUMBLE: 21.887467355305585,
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
