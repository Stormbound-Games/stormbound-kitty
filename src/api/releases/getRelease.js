import { getEntry } from '~/helpers/sanity'
import clean from './clean'

const getRelease = async ({
  id = null,
  slug = null,
  date = null,
  isPreview,
} = {}) => {
  const release = await getEntry({
    conditions: [
      '_type == "release"',
      '(id == $id || slug.current == $slug || date == $date)',
    ],
    fields: `..., background { ratio, asset -> { url } }, card -> { id }`,
    params: { id, slug, date },
    options: { isPreview },
  })

  return release ? clean(release) : null
}

export default getRelease
