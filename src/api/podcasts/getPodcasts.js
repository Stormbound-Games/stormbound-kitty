import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getPodcasts = async () => {
  const podcasts = await getEntries({
    conditions: ['_type == "podcast"'],
    options: { order: 'date asc' },
  })

  return podcasts.map(clean)
}

export default getPodcasts
