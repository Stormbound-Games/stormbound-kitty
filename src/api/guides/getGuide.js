import { getEntry } from '~/helpers/sanity'
import clean from './clean'

const getGuide = async ({ id = null, slug = null, name = null }) => {
  const guide = await getEntry({
    conditions: [
      '_type == "guide"',
      '(id == $id || slug.current == $slug || name == $name)',
    ],
    fields: `..., background { asset -> { ... } }`,
    params: { id, slug, name },
  })

  return guide ? clean(guide) : null
}

export default getGuide
