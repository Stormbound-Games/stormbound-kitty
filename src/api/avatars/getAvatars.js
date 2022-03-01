import { getEntries } from '~/helpers/sanity'

const FIELDS = `
_id,
name,
"image": image { "url": asset -> url }.url,
"dimensions": (image {
  "asset": (asset -> {
    "metadata": (metadata {
      "dimensions": (dimensions { width, height })
    }).dimensions
  }).metadata
}).asset
`

const getAvatars = async ({ isPreview } = {}) => {
  const avatars = await getEntries({
    conditions: ['_type == "avatar"'],
    fields: FIELDS,
    options: { order: 'name asc', isPreview },
  })

  return avatars
}

export default getAvatars
