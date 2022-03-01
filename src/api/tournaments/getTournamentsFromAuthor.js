import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getTournamentsFromAuthor = async ({ author, isPreview } = {}) => {
  const tournaments = await getEntries({
    conditions: [
      '_type == "tournament"',
      'count(hosts[lower(@) == $author]) > 0',
    ],
    fields: FIELDS,
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return tournaments.map(MAPPER)
}

export default getTournamentsFromAuthor
