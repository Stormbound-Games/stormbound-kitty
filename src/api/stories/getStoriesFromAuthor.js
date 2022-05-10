import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getStoriesFromAuthor = async ({ author, isPreview } = {}) => {
  const stories = await getEntries({
    conditions: ['_type == "story"', 'user -> slug.current match $author'],
    params: { author },
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return stories.map(MAPPER)
}

export default getStoriesFromAuthor
