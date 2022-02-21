import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getEventsFromAuthor = async author => {
  const events = await getEntries({
    conditions: ['_type == "event"', 'count(authors[lower(@) == $author]) > 0'],
    params: { author },
    options: { order: 'date desc' },
  })

  return events.map(clean)
}

export default getEventsFromAuthor
