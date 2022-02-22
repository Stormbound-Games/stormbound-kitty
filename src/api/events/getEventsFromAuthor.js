import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getEventsFromAuthor = async ({ author, isPreview } = {}) => {
  const events = await getEntries({
    conditions: ['_type == "event"', 'count(authors[lower(@) == $author]) > 0'],
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return events.map(clean)
}

export default getEventsFromAuthor
