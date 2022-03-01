import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getSWCCFromCard = async ({ id, isPreview } = {}) => {
  const seasons = await getEntries({
    conditions: ['_type == "swcc"', 'count(weeks[winner.id == $id]) > 0'],
    fields: `weeks[winner.id == $id] { ${FIELDS} }`,
    params: { id },
    options: { isPreview },
  })

  const season = seasons.map(MAPPER).pop()

  return season ? season.weeks.pop() : null
}

export default getSWCCFromCard
