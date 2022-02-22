import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getPuzzlesFromAuthor = async ({ author, isPreview }) => {
  const puzzles = await getEntries({
    conditions: ['_type == "puzzle"', 'author match $author'],
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return puzzles.map(clean)
}

export default getPuzzlesFromAuthor
