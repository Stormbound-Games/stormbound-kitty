import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getStoriesFromAuthor = async ({ author, isPreview } = {}) => {
  const stories = await getEntries({
    conditions: ['_type == "story"', 'author match $author'],
    params: { author },
    options: { isPreview },
  })

  return stories.map(clean)
}

export default getStoriesFromAuthor
