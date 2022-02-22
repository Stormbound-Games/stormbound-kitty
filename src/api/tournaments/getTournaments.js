import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getTournaments = async ({ isPreview } = {}) => {
  const tournaments = await getEntries({
    conditions: ['_type == "tournament"'],
    options: { order: 'date desc', isPreview },
  })

  return tournaments.map(clean)
}

export default getTournaments
