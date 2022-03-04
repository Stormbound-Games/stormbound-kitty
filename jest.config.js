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
  const cards = (
    await client.fetch(
      `*[ _type == 'card' ] { ..., image { asset -> { ... } } }`
    )
  )
    .map(cleanCard)
    .sort(sortCards)
  const books = await client.fetch(`*[ _type == 'book' ]`)
  const decks = await client.fetch(`*[ _type == 'deck' ]`)

  return {
    globals: {
      __BOOKS__: books,
      __BOOKS_INDEX__: indexArray(books),
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

function cleanCard(card) {
  card.image = card.image.asset.url
  card.movement = +card.movement
  card.ability = card.ability || null

  delete card._createdAt
  delete card._updatedAt
  delete card._id
  delete card._rev
  delete card._type

  return card
}

const FACTIONS_ORDER = ['neutral', 'winter', 'ironclad', 'shadowfen', 'swarm']

function sortCards(a, b) {
  const factionIndexA = FACTIONS_ORDER.indexOf(a.faction)
  const factionIndexB = FACTIONS_ORDER.indexOf(b.faction)

  if (factionIndexA > factionIndexB) return +1
  if (factionIndexA < factionIndexB) return -1

  if (a.token && !b.token) return +1
  if (!a.token && b.token) return -1

  if (+a.mana > +b.mana) return +1
  if (+a.mana < +b.mana) return -1

  return a.name > b.name ? +1 : -1
}
