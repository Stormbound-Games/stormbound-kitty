require('module-alias/register')

const indexArray = require('~/helpers/indexArray').default
const getAbbreviations = require('~/api/misc/getAbbreviations').default
const getBrawls = require('~/api/brawls/getBrawls').default
const getDecks = require('~/api/decks/getDecks').default
const getDeckTags = require('~/api/decks/getDeckTags').default
const getBooks = require('~/api/books/getBooks').default
const getCards = require('~/api/cards/getCards').default

module.exports = async () => {
  const isPreview = Boolean(process.env.SANITY_PREVIEW_TOKEN)
  const cards = await getCards({ isPreview })
  const abbreviations = await getAbbreviations({
    isPreview,
    cards,
    casing: 'LOWERCASE',
  })
  const books = await getBooks({ isPreview })
  const brawls = await getBrawls({ isPreview })
  const decks = await getDecks({ isPreview })
  const deckTags = await getDeckTags({ isPreview })

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
      __DECK_TAGS__: deckTags,
    },
    testEnvironment: 'node',
    moduleNameMapper: {
      '^~/(.*)$': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: [
      '<rootDir>/.next/',
      '<rootDir>/bin/',
      '<rootDir>/cms/',
      '<rootDir>/cypress/',
      '<rootDir>/docs/',
      '<rootDir>/node_modules/',
      '<rootDir>/public/',
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    transformIgnorePatterns: ['/node_modules/'],
    testTimeout: 10000,
    setupFilesAfterEnv: ['<rootDir>/src/helpers/jestSetup/index.js'],
  }
}
