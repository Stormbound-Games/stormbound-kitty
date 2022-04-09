import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getSWCCSeason = async ({ number, isPreview } = {}) => {
  const weeks = await getEntries({
    conditions: ['_type == "SWCC"', 'season == $number'],
    fields: FIELDS,
    params: { number: Number(number) },
    options: { order: 'date desc', isPreview },
  })

  return weeks.map(MAPPER)
}

export default getSWCCSeason
