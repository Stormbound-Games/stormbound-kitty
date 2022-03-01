import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getContributions = async ({ order = 'date desc', isPreview } = {}) => {
  const contributions = await getEntries({
    conditions: ['_type == "contribution"'],
    fields: FIELDS,
    options: { order, isPreview },
  })

  return contributions.map(MAPPER)
}

export default getContributions
