import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getContributionsFromAuthor = async ({ author, isPreview } = {}) => {
  const contributions = await getEntries({
    conditions: ['_type == "contribution"', 'author match $author'],
    fields: FIELDS,
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return contributions.map(MAPPER)
}

export default getContributionsFromAuthor
