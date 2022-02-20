import searchCards from '~/helpers/searchCards'
import searchStories from '~/api/stories/searchStories'

const getStoriesForSearch = async search => {
  if (search.length < 2) return []

  const results = await searchStories(search)

  if (results.length > 0) return results

  const result = searchCards(search).map(card => card.id)[0]

  return STORIES.filter(story => result === story.cardId)
}

export default getStoriesForSearch
