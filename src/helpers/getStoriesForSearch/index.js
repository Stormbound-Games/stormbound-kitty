import FuzzySearch from 'fuzzy-search'
import getCardsForSearch from '../getCardsForSearch'
import stories from '../../../public/stories'

const SEARCH_OPTIONS = { caseSensitive: false, sort: true }
export const searcher = new FuzzySearch(
  stories,
  ['title', 'author'],
  SEARCH_OPTIONS
)

export default search => {
  if (search.length < 2) return []

  const results = searcher.search(search)

  if (results.length > 0) return results

  const result = getCardsForSearch(search).map(card => card.id)[0]

  return stories.filter(story => result === story.cardId)
}
