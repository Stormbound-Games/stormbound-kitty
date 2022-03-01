import { getEntry } from '~/helpers/sanity'
import { FIELDS } from './utils'

const getUser = async ({ slug, isPreview } = {}) => {
  const user = await getEntry({
    conditions: ['_type == "user"', 'slug.current == $slug'],
    fields: FIELDS,
    params: { slug },
    options: { isPreview },
  })

  return user
}

export default getUser
