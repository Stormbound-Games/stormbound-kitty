// String.prototype.replaceAll is not available in Node 14-, which prevents Jest
// from running tests properly.
if (typeof String.prototype.replaceAll !== 'function') {
  String.prototype.replaceAll = function (from, to) {
    return this.replace(new RegExp(from, 'g'), to)
  }
}

jest.mock('~/api/misc/getAbbreviations', () =>
  jest.fn(() => global.__ABBREVIATIONS__)
)
jest.mock('~/api/books/getBooks', () => jest.fn(() => global.__BOOKS__))
jest.mock('~/api/brawls/getBrawls', () => jest.fn(() => global.__BRAWLS__))
jest.mock('~/api/cards/getCards', () => jest.fn(() => global.__CARDS__))
jest.mock('~/api/decks/getDecks', () => jest.fn(() => global.__DECKS__))
