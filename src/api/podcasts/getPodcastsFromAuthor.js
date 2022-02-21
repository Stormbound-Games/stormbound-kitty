import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getPodcastsFromAuthor = async author => {
  const podcasts = await getEntries({
    conditions: ['_type == "podcast"', 'count(hosts[lower(@) == $author]) > 0'],
    params: { author },
    options: { order: 'date asc' },
  })

  return podcasts.map(clean)
}

export default getPodcastsFromAuthor
