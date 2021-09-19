import serialization from '~/helpers/serialization'
import { DEFAULT_LIST } from '~/constants/list'

const getInitialListData = list => {
  if (!list) {
    return DEFAULT_LIST
  }

  const decodedData = decodeURIComponent(list)

  return serialization.list.deserialize(decodedData)
}

export default getInitialListData
