import getExpectedCoinsPerBook from './'

const LEVEL_5_COLLECTION = global.__CARDS__.map(card => ({
  id: card.id,
  level: 5,
  rarity: card.rarity,
}))

const LEVEL_1_COLLECTION = global.__CARDS__.map(card => ({
  id: card.id,
  level: 1,
  rarity: card.rarity,
}))

// This test gets outdated every month when a new card gets added.
describe.skip('The `getExpectedCoinsPerBook` helper', () => {
  const COINS = {
    MYTHIC: 545.5790513833992,
    HEROIC: 269.7480237154153,
    CLASSIC: 131.44505928853738,
    NOBLE: 65.72252964426876,
    HUMBLE: 21.90750988142292,
  }

  Object.keys(COINS).forEach(bookType => {
    it(`should return ${COINS[bookType]} coins for a ${bookType} book with a level 5 collection`, () => {
      expect(getExpectedCoinsPerBook(LEVEL_5_COLLECTION, bookType)).toEqual(
        COINS[bookType]
      )
    })
  })

  Object.keys(COINS).forEach(bookType => {
    it(`should return 0 coins for a ${bookType} book with a level 1 collection`, () => {
      expect(getExpectedCoinsPerBook(LEVEL_1_COLLECTION, bookType)).toEqual(0)
    })
  })
})
