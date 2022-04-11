import { getEntry } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getPuzzle = async ({ slug, isPreview } = {}) => {
  const puzzle = await getEntry({
    conditions: ['_type == "puzzle"', 'slug.current == $slug'],
    fields: FIELDS,
    params: { slug },
    options: { isPreview },
  })

  return puzzle ? MAPPER(puzzle) : null
}

export default getPuzzle
