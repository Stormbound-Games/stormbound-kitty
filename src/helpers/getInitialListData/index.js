import serialisation from '~/helpers/serialisation'
import { DEFAULT_LIST } from '~/constants/list'

const getInitialListData = list => {
  if (!list) {
    return DEFAULT_LIST
  }

  const decodedData = decodeURIComponent(list)

  return serialisation.list.deserialise(decodedData)
}

export default getInitialListData
