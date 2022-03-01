import { getEntries } from '~/helpers/sanity'
import { FIELDS } from './utils'

const getChannels = async ({ isPreview } = {}) => {
  const channels = await getEntries({
    conditions: ['_type == "channel"'],
    fields: FIELDS,
    options: { order: 'author asc', isPreview },
  })

  return channels
}

export default getChannels
