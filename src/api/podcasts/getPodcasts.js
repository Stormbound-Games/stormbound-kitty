import { getEntries } from '~/helpers/sanity'
import { FIELDS } from './utils'

const getPodcasts = async ({ isPreview } = {}) => {
  const podcasts = await getEntries({
    conditions: ['_type == "podcast"'],
    fields: FIELDS,
    options: { order: ['date desc, _createdAt desc'], isPreview },
  })

  return podcasts
}

export default getPodcasts
