import Fuse from 'fuse.js'
import searchCards from '../searchCards'
import stories from '../../../public/stories'

export const searcher = new Fuse(stories, {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'author', weight: 0.3 },
  ],
})

export default search => {
  if (search.length < 2) return []

  const results = searcher.search(search).map(result => result.item)

  if (results.length > 0) return results

  const result = searchCards(search).map(card => card.id)[0]

  return stories.filter(story => result === story.cardId)
}
