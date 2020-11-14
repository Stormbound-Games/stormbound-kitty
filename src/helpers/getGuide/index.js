import indexArray from '../indexArray'
import guides from '../../data/guides'

const INDEXES = {
  id: indexArray(guides, 'id'),
  name: indexArray(guides, 'name'),
}

export default (needle, key = 'id') =>
  INDEXES[key] ? INDEXES[key][needle] : undefined
