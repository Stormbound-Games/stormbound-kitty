import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getPuzzles = async ({ isPreview } = {}) => {
  const puzzles = await getEntries({
    conditions: ['_type == "puzzle"'],
    fields: `..., "image": image { asset -> { url } }.asset.url`,
    options: { isPreview },
  })

  return puzzles.map(clean)
}

export default getPuzzles
