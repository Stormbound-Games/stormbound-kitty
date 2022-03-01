import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getTournamentsWithAuthor = async ({ author, isPreview } = {}) => {
  const tournaments = await getEntries({
    conditions: [
      '_type == "tournament"',
      'count(podium[].players[lower(@) == $author]) > 0',
    ],
    fields: FIELDS,
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return tournaments.map(MAPPER)
}

export default getTournamentsWithAuthor
