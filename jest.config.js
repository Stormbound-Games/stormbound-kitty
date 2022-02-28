const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: '5hlpazgd',
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
})

const indexArray = (array, key = 'id') =>
  array.reduce((acc, entry) => ({ ...acc, [entry[key]]: entry }), {})

module.exports = async () => {
  const cards = require('./src/data/cards.json')
  const decks = await client.fetch(`*[_type=='deck']`)

  return {
    globals: {
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
