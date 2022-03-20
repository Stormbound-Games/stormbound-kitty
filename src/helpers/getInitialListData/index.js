import serialization from '~/helpers/serialization'
import { DEFAULT_LIST } from '~/constants/list'

const getInitialListData = list =>
  list ? serialization.list.deserialize(decodeURIComponent(list)) : DEFAULT_LIST

export default getInitialListData
