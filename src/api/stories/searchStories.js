import { getEntries } from '#helpers/sanity'
import { FIELDS, MAPPER } from './utils.js'

const searchStories = async ({ term, isPreview } = {}) => {
  const stories = await getEntries({
    conditions: ['_type == "story"'],
    params: { term: `*${term}*` },
    fields: `_score, ${FIELDS}`,
    options: {
      score: 'boost(content match $term, 1), boost(title match $term, 5)',
      order: '_score desc, date desc',
      slice: '_score > 0',
      isPreview,
    },
  })

  return stories.map(MAPPER)
}

export default searchStories
