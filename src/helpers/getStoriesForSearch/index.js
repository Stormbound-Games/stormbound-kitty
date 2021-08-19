import Fuse from 'fuse.js'
import searchCards from '~/helpers/searchCards'
import STORIES from '~/data/stories'

export const searcher = new Fuse(STORIES, {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'author', weight: 0.3 },
  ],
})

const getStoriesForSearch = search => {
  if (search.length < 2) return []

  const results = searcher.search(search).map(result => result.item)

  if (results.length > 0) return results

  const result = searchCards(search).map(card => card.id)[0]

  return STORIES.filter(story => result === story.cardId)
}

export default getStoriesForSearch
