import searchCards from '#helpers/searchCards'
import searchStories from '#api/stories/searchStories'
import getStories from '#api/stories/getStories'
import getAbbreviations from '#api/misc/getAbbreviations'

const getStoriesForSearch = async (cards, search) => {
  if (search.length < 2) return []

  const results = await searchStories({ term: search })
  const abbreviations = await getAbbreviations({ casing: 'LOWERCASE', cards })

  if (results.length > 0) return results

  const stories = await getStories()
  const result = searchCards(cards, abbreviations, search).map(
    card => card.id
  )[0]

  return stories.filter(story => result === story.cardId)
}

export default getStoriesForSearch
