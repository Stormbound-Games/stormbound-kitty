import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getPuzzlesFromAuthor = async author => {
  const puzzles = await getEntries({
    conditions: ['_type == "puzzle"', 'author match $author'],
    params: { author },
  })

  return puzzles.map(clean)
}

export default getPuzzlesFromAuthor
