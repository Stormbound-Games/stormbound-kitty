import cards from '../../data/cards'
import indexArray from '../indexArray'

const INDEXES = {
  id: indexArray(cards, 'id'),
  name: indexArray(cards, 'name'),
}

export default (needle, key = 'id') =>
  INDEXES[key] ? INDEXES[key][needle] || {} : {}
