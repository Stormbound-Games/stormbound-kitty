import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getChannels = async ({ isPreview } = {}) => {
  const channels = await getEntries({
    conditions: ['_type == "channel"'],
    options: { order: 'author asc', isPreview },
  })

  return channels.map(clean)
}

export default getChannels
