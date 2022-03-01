import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getDonationsFromAuthor = async ({ author, isPreview } = {}) => {
  const donations = await getEntries({
    conditions: ['_type == "donation"', 'author match $author'],
    fields: FIELDS,
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return donations.map(MAPPER)
}

export default getDonationsFromAuthor
