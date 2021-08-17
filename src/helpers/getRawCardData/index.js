import CARDS from '~/data/cards'
import indexArray from '~/helpers/indexArray'
import FUSION_STONES from './fs'

const INDEXES = {
  id: indexArray(CARDS, 'id'),
  name: indexArray(CARDS, 'name'),
}

FUSION_STONES.forEach(fs => {
  INDEXES.id[fs.id] = fs
  // Explicitly do not index resources cards by name as they could show up in
  // card searches.
})

export default (needle, key = 'id') => {
  // `getRawCardData` is sometimes used as a direct callback in
  // `Array.prototype.map`, for which the 2nd argument is a number (the loop
  // index). In that case, reset the `key` to the default value (`id`).
  if (typeof key === 'number') key = 'id'

  if (typeof INDEXES[key] === 'undefined') {
    return {}
  }

  return INDEXES[key][needle] || {}
}
