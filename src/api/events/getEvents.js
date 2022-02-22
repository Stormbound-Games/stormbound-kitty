import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getEvents = async ({ isPreview } = {}) => {
  const events = await getEntries({
    conditions: ['_type == "event"'],
    options: { order: 'date desc', isPreview },
  })

  return events.map(clean)
}

export default getEvents
