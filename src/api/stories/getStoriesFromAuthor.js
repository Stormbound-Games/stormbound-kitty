import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getStoriesFromAuthor = async author => {
  const stories = await getEntries({
    conditions: ['_type == "story"', 'author == $author'],
    params: { author },
  })

  return stories.map(clean)
}

export default getStoriesFromAuthor
