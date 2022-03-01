import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getStories = async ({ isPreview } = {}) => {
  const stories = await getEntries({
    conditions: ['_type == "story"'],
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return stories.map(MAPPER)
}

export default getStories
