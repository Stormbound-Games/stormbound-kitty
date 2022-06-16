import { getEntries } from '~/helpers/sanity'

const FIELDS = `
"id": _id,
name,
"image": image.asset -> url,
"dimensions": image.asset -> {
  "width": metadata.dimensions.width,
  "height": metadata.dimensions.height,
}
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
