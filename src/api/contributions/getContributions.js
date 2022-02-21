import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getContributions = async (order = 'date desc') => {
  const contributions = await getEntries({
    conditions: ['_type == "contribution"'],
    options: { order },
  })

  return contributions.map(clean)
}

export default getContributions
