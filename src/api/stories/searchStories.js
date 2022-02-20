import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const searchStories = async term => {
  const matchesFromTitle = await getEntries({
    conditions: ['_type == "story"', 'title match $term'],
    params: { term },
  })
  const matchesFromContent = await getEntries({
    conditions: ['_type == "story"', 'content match $term'],
    params: { term },
  })

  return [...matchesFromTitle, ...matchesFromContent].map(clean)
}

export default searchStories
