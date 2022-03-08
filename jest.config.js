require('module-alias/register')

const indexArray = require('~/helpers/indexArray').default
const getAbbreviations = require('~/api/misc/getAbbreviations').default
const getBrawls = require('~/api/brawls/getBrawls').default
const getDecks = require('~/api/decks/getDecks').default
const getBooks = require('~/api/books/getBooks').default
const getCards = require('~/api/cards/getCards').default

module.exports = async () => {
  const abbreviations = await getAbbreviations({ casing: 'LOWERCASE' })
  const books = await getBooks()
  const brawls = await getBrawls()
  const cards = await getCards()
  const decks = await getDecks()

  return {
    globals: {
      __ABBREVIATIONS__: abbreviations,
      __BOOKS__: books,
      __BOOKS_INDEX__: indexArray(books),
      __BRAWLS__: brawls,
      __CARDS__: cards,
      __CARDS_INDEX__: indexArray(cards),
      __CARDS_INDEX_BY_SID__: indexArray(cards, 'sid'),
      __DECKS__: decks,
      __DECKS_INDEX__: indexArray(decks),
    },
    testEnvironment: 'node',
    moduleNameMapper: {
      '^~/(.*)$': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/.next/',
      // Cannot run due to node-fetch@3.0.0 upgrade.
      // See: https://github.com/node-fetch/node-fetch/issues/1289
      'bot/commands/trivia/spec.js',
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    transformIgnorePatterns: ['/node_modules/'],
  }
}
