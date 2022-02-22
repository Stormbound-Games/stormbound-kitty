import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const searchStories = async ({ term, isPreview } = {}) => {
  const stories = await getEntries({
    conditions: [
      '_type == "story"',
      'title match $term || content match $term',
    ],
    params: { term },
    options: { order: 'date desc', isPreview },
  })

  return stories.map(clean)
}

export default searchStories
