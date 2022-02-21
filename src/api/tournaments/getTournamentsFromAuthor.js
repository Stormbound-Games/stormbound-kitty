import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getTournamentsFromAuthor = async author => {
  const tournaments = await getEntries({
    conditions: [
      '_type == "tournament"',
      'count(hosts[lower(@) == $author]) > 0',
    ],
    params: { author },
    options: { order: 'date asc' },
  })

  return tournaments.map(clean)
}

export default getTournamentsFromAuthor
