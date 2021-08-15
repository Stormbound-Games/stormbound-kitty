import indexArray from '../indexArray'
import GUIDES from '../../data/guides'

const INDEXES = {
  id: indexArray(GUIDES, 'id'),
  name: indexArray(GUIDES, 'name'),
}

export default (needle, key = 'id') =>
  INDEXES[key] ? INDEXES[key][needle] : undefined
