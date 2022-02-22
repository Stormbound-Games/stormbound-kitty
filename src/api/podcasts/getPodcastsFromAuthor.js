import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getPodcastsFromAuthor = async ({ author, isPreview } = {}) => {
  const podcasts = await getEntries({
    conditions: ['_type == "podcast"', 'count(hosts[lower(@) == $author]) > 0'],
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return podcasts.map(clean)
}

export default getPodcastsFromAuthor
