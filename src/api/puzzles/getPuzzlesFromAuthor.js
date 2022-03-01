import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getPuzzlesFromAuthor = async ({ author, isPreview }) => {
  const puzzles = await getEntries({
    conditions: ['_type == "puzzle"', 'author match $author'],
    fields: FIELDS,
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return puzzles.map(MAPPER)
}

export default getPuzzlesFromAuthor
