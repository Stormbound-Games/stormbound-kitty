import { getEntries } from '~/helpers/sanity'
import { FIELDS } from './utils'

const getPodcastsFromAuthor = async ({ author, isPreview } = {}) => {
  const podcasts = await getEntries({
    conditions: ['_type == "podcast"', 'count(hosts[lower(@) == $author]) > 0'],
    params: { author },
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return podcasts
}

export default getPodcastsFromAuthor
