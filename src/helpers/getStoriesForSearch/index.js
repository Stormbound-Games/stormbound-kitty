import searchCards from '~/helpers/searchCards'
import searchStories from '~/api/stories/searchStories'

const getStoriesForSearch = async (cards, search) => {
  if (search.length < 2) return []

  const results = await searchStories({ term: search })

  if (results.length > 0) return results

  const result = searchCards(cards, search).map(card => card.id)[0]

  return STORIES.filter(story => result === story.cardId)
}

export default getStoriesForSearch
