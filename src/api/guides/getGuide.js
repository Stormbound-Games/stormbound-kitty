import { getEntry } from '~/helpers/sanity'
import clean from './clean'

const getGuide = async ({
  id = null,
  slug = null,
  name = null,
  isPreview,
} = {}) => {
  const guide = await getEntry({
    conditions: [
      '_type == "guide"',
      '(id == $id || slug.current == $slug || name == $name)',
    ],
    fields: `
      ...,
      background { ratio, asset -> { url } },
      card -> { id }
    `,
    params: { id, slug, name },
    options: { isPreview },
  })

  return guide ? clean(guide) : null
}

export default getGuide
