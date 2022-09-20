import indexArray from '#helpers/indexArray'
import getAbbreviations from '#api/misc/getAbbreviations'
import getBrawls from '#api/brawls/getBrawls'
import getDecks from '#api/decks/getDecks'
import getDeckTags from '#api/decks/getDeckTags'
import getBooks from '#api/books/getBooks'
import getCards from '#api/cards/getCards'

module.exports = async function () {
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

  globalThis.__ABBREVIATIONS__ = abbreviations
  globalThis.__BOOKS__ = books
  globalThis.__BOOKS_INDEX__ = indexArray(books)
  globalThis.__BRAWLS__ = brawls
  globalThis.__CARDS__ = cards
  globalThis.__CARDS_INDEX__ = indexArray(cards)
  globalThis.__CARDS_INDEX_BY_SID__ = indexArray(cards, 'sid')
  globalThis.__DECKS__ = decks
  globalThis.__DECKS_INDEX__ = indexArray(decks)
  globalThis.__DECK_TAGS__ = deckTags
}
