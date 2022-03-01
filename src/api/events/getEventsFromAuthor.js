import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getEventsFromAuthor = async ({ author, isPreview } = {}) => {
  const events = await getEntries({
    conditions: ['_type == "event"', 'count(authors[lower(@) == $author]) > 0'],
    fields: FIELDS,
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return events.map(MAPPER)
}

export default getEventsFromAuthor
