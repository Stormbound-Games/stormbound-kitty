import { getEntry } from '~/helpers/sanity'
import { FIELDS } from './utils'

const getUser = async ({ slug, isPreview, fields = FIELDS } = {}) => {
  const user = await getEntry({
    conditions: ['_type == "user"', 'slug.current match $slug'],
    fields,
    params: { slug },
    options: { isPreview },
  })

  return user
}

export default getUser
