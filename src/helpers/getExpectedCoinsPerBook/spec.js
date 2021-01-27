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
    MYTHIC: 545.1939393939388,
    HEROIC: 269.65246212121116,
    CLASSIC: 131.37415225011313,
    NOBLE: 65.68707612505654,
    HUMBLE: 21.89569204168551,
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
