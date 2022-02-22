import { getEntry } from '~/helpers/sanity'
import clean from './clean'

const getChannel = async ({ author, isPreview } = {}) => {
  const channel = await getEntry({
    conditions: ['_type == "channel"', 'author match $author'],
    params: { author },
    options: { isPreview },
  })

  return channel ? clean(channel) : null
}

export default getChannel
