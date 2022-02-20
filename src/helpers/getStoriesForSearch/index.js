import Fuse from 'fuse.js'
import searchCards from '~/helpers/searchCards'
import getStories from '~/api/stories/getStories'

const getStoriesForSearch = async search => {
  if (search.length < 2) return []

  const registry = await getStories()
  const searcher = new Fuse(registry, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'author', weight: 0.3 },
    ],
  })
  const results = searcher.search(search).map(result => result.item)

  if (results.length > 0) return results

  const result = searchCards(search).map(card => card.id)[0]

  return STORIES.filter(story => result === story.cardId)
}

export default getStoriesForSearch
