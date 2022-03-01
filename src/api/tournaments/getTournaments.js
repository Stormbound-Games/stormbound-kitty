import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getTournaments = async ({ isPreview } = {}) => {
  const tournaments = await getEntries({
    conditions: ['_type == "tournament"'],
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return tournaments.map(MAPPER)
}

export default getTournaments
