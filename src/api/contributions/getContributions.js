import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getContributions = async ({ order = 'date desc', isPreview } = {}) => {
  const contributions = await getEntries({
    conditions: ['_type == "contribution"'],
    options: { order, isPreview },
  })

  return contributions.map(clean)
}

export default getContributions
