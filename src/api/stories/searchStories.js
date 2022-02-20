import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const searchStories = async term => {
  const stories = await getEntries({
    conditions: [
      '_type == "story"',
      'title match $term || content match $term',
    ],
    params: { term },
  })

  return stories.map(clean)
}

export default searchStories
