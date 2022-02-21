import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getEvents = async () => {
  const events = await getEntries({
    conditions: ['_type == "event"'],
    options: { order: 'date desc' },
  })

  return events.map(clean)
}

export default getEvents
