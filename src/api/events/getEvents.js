import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getEvents = async ({ isPreview } = {}) => {
  const events = await getEntries({
    conditions: ['_type == "event"'],
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return events.map(MAPPER)
}

export default getEvents
