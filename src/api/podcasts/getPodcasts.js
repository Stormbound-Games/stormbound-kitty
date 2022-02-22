import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getPodcasts = async ({ isPreview } = {}) => {
  const podcasts = await getEntries({
    conditions: ['_type == "podcast"'],
    options: { order: 'date desc', isPreview },
  })

  return podcasts.map(clean)
}

export default getPodcasts
