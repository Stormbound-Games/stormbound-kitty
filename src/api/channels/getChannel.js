import { getEntry } from '~/helpers/sanity'
import { FIELDS } from './utils'

const getChannel = async ({ author, isPreview } = {}) => {
  const channel = await getEntry({
    conditions: ['_type == "channel"', 'author match $author'],
    fields: FIELDS,
    params: { author },
    options: { isPreview },
  })

  return channel || null
}

export default getChannel
