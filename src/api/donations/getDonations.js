import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getDonations = async ({ order = 'date desc', isPreview } = {}) => {
  const donations = await getEntries({
    conditions: ['_type == "donation"'],
    fields: FIELDS,
    options: { order, isPreview },
  })

  return donations.map(MAPPER)
}

export default getDonations
