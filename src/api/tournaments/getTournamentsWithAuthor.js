import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getTournamentsWithAuthor = async ({ author, isPreview } = {}) => {
  const tournaments = await getEntries({
    conditions: [
      '_type == "tournament"',
      'count(podium[].players[lower(@) == $author]) > 0',
    ],
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return tournaments.map(clean)
}

export default getTournamentsWithAuthor
