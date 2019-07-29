import { deserialiseList } from './deserialise'
import { DEFAULT_LIST } from '../constants/list'

export default list => {
  if (!list) {
    return DEFAULT_LIST
  }

  const decodedData = decodeURIComponent(list)

  return deserialiseList(decodedData)
}
