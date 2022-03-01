import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const searchStories = async ({ term, isPreview } = {}) => {
  const stories = await getEntries({
    conditions: [
      '_type == "story"',
      'title match $term || content match $term',
    ],
    params: { term },
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return stories.map(MAPPER)
}

export default searchStories
