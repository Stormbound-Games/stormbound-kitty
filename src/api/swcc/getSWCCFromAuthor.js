import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getSWCCFromAuthor = async ({ author, isPreview } = {}) => {
  const seasons = await getEntries({
    conditions: [
      '_type == "swcc"',
      'count(weeks[winner.author match $author]) > 0',
    ],
    fields: `weeks[winner.author match $author] { ${FIELDS} }`,
    params: { author },
    options: { order: 'number desc', isPreview },
  })

  return seasons.map(MAPPER)
}

export default getSWCCFromAuthor
