import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getTournaments = async () => {
  const tournaments = await getEntries({
    conditions: ['_type == "tournament"'],
    options: { order: 'date asc' },
  })

  return tournaments.map(clean)
}

export default getTournaments
