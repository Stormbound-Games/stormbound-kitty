import { getEntries } from '~/helpers/sanity'
import { FIELDS } from './utils'

const getUsers = async ({ isPreview } = {}) => {
  const users = await getEntries({
    conditions: ['_type == "user"'],
    fields: `${FIELDS}, "contributions": count( *[ references(^._id) ] )`,
    options: { order: 'name asc', isPreview },
  })

  return users
}

export default getUsers
