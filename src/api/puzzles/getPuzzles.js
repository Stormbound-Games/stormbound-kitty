import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getPuzzles = async () => {
  const puzzles = await getEntries({
    conditions: ['_type == "puzzle"'],
    fields: `..., "image": image { asset -> { url } }.asset.url`,
  })

  return puzzles.map(clean)
}

export default getPuzzles
