import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getSWCCFromAuthor = async author => {
  const seasons = await getEntries({
    conditions: ['_type == "swcc"'],
    fields: `number, weeks[lower(winner.author) == $author] { ... }`,
    params: { author },
    options: { order: 'number desc' },
  })

  return seasons.map(clean).flat()
}

export default getSWCCFromAuthor
