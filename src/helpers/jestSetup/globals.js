import indexArray from '#helpers/indexArray'
import getAbbreviations from '#api/misc/getAbbreviations'
import getBrawls from '#api/brawls/getBrawls'
import getDecks from '#api/decks/getDecks'
import getDeckTags from '#api/decks/getDeckTags'
import getBooks from '#api/books/getBooks'
import getCards from '#api/cards/getCards'

const getGlobals = async ({ isPreview }) => {
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
  }
}

export default getGlobals
