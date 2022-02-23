import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getAvatars = async ({ isPreview } = {}) => {
  const avatars = await getEntries({
    conditions: ['_type == "avatar"'],
    fields: `..., image { asset -> { ... } }`,
    options: { order: 'name asc', isPreview },
  })

  return avatars.map(clean)
}

export default getAvatars
