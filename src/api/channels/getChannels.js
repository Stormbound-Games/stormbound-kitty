import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getChannels = async () => {
  const channels = await getEntries({
    conditions: ['_type == "channel"'],
    options: { order: 'author asc' },
  })

  return channels.map(clean)
}

export default getChannels
